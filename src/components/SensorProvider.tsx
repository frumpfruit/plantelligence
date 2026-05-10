"use client"

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react"

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
}

const SensorContext = createContext<SensorContextType | undefined>(undefined)

export function SensorProvider({ children }: { children: ReactNode }) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdate, setLastUpdate] = useState("Just now")
  const [data, setData] = useState<SensorData>({
    ph: 5.8,
    tds: 650,
    tempWater: 24.6,
    humidity: 68,
    tempAir: 28.2,
    lux: "12.5k"
  })

  const generateNewData = useCallback(() => {
    const newData = {
      ph: Number((5.8 + Math.random() * 0.5).toFixed(1)), // 5.8 - 6.3
      tds: Math.floor(750 + Math.random() * 100),       // 750 - 850
      tempWater: Number((23.8 + Math.random() * 0.5).toFixed(1)), // 23.8 - 24.3 (Near 24)
      humidity: Math.floor(65 + Math.random() * 10),
      tempAir: Number((28.0 + Math.random() * 3.0).toFixed(1)),
      lux: (12 + Math.random() * 2).toFixed(1) + "k"
    }
    setData(newData)
    setLastUpdate("Just now")
  }, [])

  const refreshData = useCallback((quiet = false) => {
    if (!quiet) setIsRefreshing(true)
    
    // Simulate delay
    setTimeout(() => {
      generateNewData()
      if (!quiet) setIsRefreshing(false)
    }, quiet ? 0 : 1200)
  }, [generateNewData])

  // Initial randomization and auto-refresh
  useEffect(() => {
    generateNewData()
    const interval = setInterval(() => {
      refreshData(true)
    }, 10000)
    return () => clearInterval(interval)
  }, [generateNewData, refreshData])

  return (
    <SensorContext.Provider value={{ data, isRefreshing, refreshData, lastUpdate }}>
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
