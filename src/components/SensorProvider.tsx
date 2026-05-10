"use client"

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react"
import { AlertCircle, AlertTriangle, Info } from "lucide-react"

export interface Notification {
  id: string
  type: "critical" | "warning" | "info" | "success"
  title: string
  message: string
  time: string
  read: boolean
  handled: boolean
  plantId?: string
}

interface SensorData {
  ph: number
  tds: number
  tempWater: number
  humidity: number
  tempAir: number
  lux: string
}

interface SensorContextType {
  data: SensorData
  isRefreshing: boolean
  refreshData: (quiet?: boolean) => void
  lastUpdate: string
  notifications: Notification[]
  addNotification: (notif: Omit<Notification, "id" | "time" | "read" | "handled">) => void
  markAllAsRead: () => void
  deleteNotification: (id: string) => void
  toggleHandled: (id: string) => void
  applyManualAction: (type: "ph-up" | "ph-down" | "tds", amount: number) => void
}

const SensorContext = createContext<SensorContextType | undefined>(undefined)

export function SensorProvider({ children }: { children: ReactNode }) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdate, setLastUpdate] = useState("Just now")
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "critical",
      title: "pH air terlalu rendah (4.9)",
      message: "Segera lakukan penyesuaian pH untuk mencegah akar tanaman rusak.",
      time: "10 menit yang lalu",
      read: false,
      handled: false,
      plantId: "1"
    }
  ])
  const [data, setData] = useState<SensorData>({
    ph: 5.8,
    tds: 650,
    tempWater: 24.6,
    humidity: 68,
    tempAir: 28.2,
    lux: "12.5k"
  })

  const addNotification = useCallback((notif: Omit<Notification, "id" | "time" | "read" | "handled">) => {
    const newNotif: Notification = {
      ...notif,
      id: Math.random().toString(36).substr(2, 9),
      time: "Baru saja",
      read: false,
      handled: false
    }
    setNotifications(prev => [newNotif, ...prev])
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }, [])

  const deleteNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  const toggleHandled = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, handled: !n.handled } : n))
  }, [])

  const applyManualAction = useCallback((type: "ph-up" | "ph-down" | "tds", amount: number) => {
    setData(prev => {
      const next = { ...prev }
      if (type === "ph-up") next.ph = Number((next.ph + 0.4).toFixed(1))
      if (type === "ph-down") next.ph = Number((next.ph - 0.4).toFixed(1))
      if (type === "tds") next.tds = next.tds + 120
      return next
    })

    // Auto-handle related notifications
    setNotifications(prev => prev.map(n => {
      const isRelated = 
        (type.includes("ph") && n.title.toLowerCase().includes("ph")) ||
        (type === "tds" && n.title.toLowerCase().includes("nutrisi"))
      
      if (isRelated && !n.handled) {
        return { ...n, handled: true }
      }
      return n
    }))

    setLastUpdate("Just now (Manual Action)")
  }, [])

  const generateNewData = useCallback(() => {
    // ...
    const newData = {
      ph: Number((5.5 + Math.random() * 1.5).toFixed(1)), // 5.5 - 7.0
      tds: Math.floor(500 + Math.random() * 500),       // 500 - 1000
      tempWater: Number((22.0 + Math.random() * 4.0).toFixed(1)), // 22 - 26
      humidity: Math.floor(40 + Math.random() * 40),
      tempAir: Number((25.0 + Math.random() * 10.0).toFixed(1)),
      lux: (Math.floor(2 + Math.random() * 15)).toFixed(1) + "k"
    }
    
    // Check for critical values to trigger auto-notifications
    if (newData.ph < 5.8) {
      addNotification({
        type: "critical",
        title: "Kadar pH di bawah batas!",
        message: `Tanaman Selada terdeteksi pH ${newData.ph}, segera naikkan kadar pH.`,
        plantId: "1"
      })
    }
    
    if (newData.tds < 700) {
      addNotification({
        type: "warning",
        title: "Nutrisi (TDS) Turun",
        message: `Kadar nutrisi tanaman Selada turun di bawah batas minimum (${newData.tds} ppm)!`,
        plantId: "1"
      })
    }

    setData(newData)
    setLastUpdate("Just now")
  }, [addNotification])

  const refreshData = useCallback((quiet = false) => {
    if (!quiet) setIsRefreshing(true)
    
    setTimeout(() => {
      generateNewData()
      if (!quiet) setIsRefreshing(false)
    }, quiet ? 0 : 800)
  }, [generateNewData])

  useEffect(() => {
    const interval = setInterval(() => {
      refreshData(true)
    }, 5000) // Auto refresh every 5s
    return () => clearInterval(interval)
  }, [refreshData])

  return (
    <SensorContext.Provider value={{ 
      data, 
      isRefreshing, 
      refreshData, 
      lastUpdate, 
      notifications, 
      addNotification, 
      markAllAsRead, 
      deleteNotification,
      toggleHandled,
      applyManualAction
    }}>
      {children}
    </SensorContext.Provider>
  )
}

export function useSensors() {
  const context = useContext(SensorContext)
  if (context === undefined) {
    throw new Error("useSensors must be used within a SensorProvider")
  }
  return context
}
