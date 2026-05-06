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
      ph: Number((5.5 + Math.random() * 1.0).toFixed(1)),
      tds: Math.floor(600 + Math.random() * 150),
      tempWater: Number((23.0 + Math.random() * 3.0).toFixed(1)),
      humidity: Math.floor(60 + Math.random() * 15),
      tempAir: Number((26.0 + Math.random() * 5.0).toFixed(1)),
      lux: (10 + Math.random() * 5).toFixed(1) + "k"
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
