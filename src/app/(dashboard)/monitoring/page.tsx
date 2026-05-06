"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Droplets, Thermometer, Activity, FlaskConical, Wind, Zap, RefreshCw, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/components/ToastProvider"

export default function MonitoringPage() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { showToast } = useToast()
  const [lastUpdate, setLastUpdate] = useState("Just now")
  
  // Fake sensor data that can "change"
  const [data, setData] = useState({
    ph: 5.8,
    tds: 650,
    tempWater: 24.6,
    humidity: 68,
    tempAir: 28.2,
    lux: "12.5k"
  })

  const refreshData = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      // Randomly tweak data slightly to look "live"
      setData({
        ph: Number((5.5 + Math.random() * 0.5).toFixed(1)),
        tds: Math.floor(640 + Math.random() * 40),
        tempWater: Number((24.0 + Math.random() * 1.0).toFixed(1)),
        humidity: Math.floor(65 + Math.random() * 5),
        tempAir: Number((27.5 + Math.random() * 1.5).toFixed(1)),
        lux: (12 + Math.random()).toFixed(1) + "k"
      })
      setIsRefreshing(false)
      setLastUpdate("1s ago")
      showToast("Data sensor diperbarui.", "success")
    }, 1200)
  }

  const sensors = [
    { title: "Sensor pH Air", val: data.ph, unit: "pH", icon: FlaskConical, color: "primary", target: 6.0, max: 14, status: "Normal" },
    { title: "Sensor Nutrisi (TDS)", val: data.tds, unit: "ppm", icon: Activity, color: "warning", target: 800, max: 1000, status: "Warning" },
    { title: "Suhu Air", val: data.tempWater, unit: "°C", icon: Thermometer, color: "info", target: 24.0, max: 40, status: "Optimal" },
    { title: "Kelembaban Udara", val: data.humidity, unit: "%", icon: Droplets, color: "primary", status: "Normal" },
    { title: "Suhu Ruangan", val: data.tempAir, unit: "°C", icon: Wind, color: "primary", status: "Normal" },
    { title: "Intensitas Cahaya", val: data.lux, unit: "Lux", icon: Zap, color: "primary", status: "Normal" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Monitoring Sensor</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Pantau data real-time dari semua sensor di fasilitas hidroponik.
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={refreshData} 
          disabled={isRefreshing}
          className="gap-2"
        >
          {isRefreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          Refresh Data
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {sensors.map((sensor, i) => (
            <motion.div
              key={sensor.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className={`border-l-4 border-l-${sensor.color} overflow-hidden h-full`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{sensor.title}</CardTitle>
                  <sensor.icon className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-4xl font-bold tracking-tighter">
                      {isRefreshing ? "..." : sensor.val}
                    </span>
                    <span className="text-sm text-muted-foreground mb-1">{sensor.unit}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant={sensor.status.toLowerCase() as any}>{sensor.status}</Badge>
                    <span className="text-xs text-muted-foreground italic">Updated {lastUpdate}</span>
                  </div>
                  
                  {sensor.target && (
                    <>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <motion.div 
                          className={`h-full bg-${sensor.color}`} 
                          initial={{ width: 0 }}
                          animate={{ width: `${(Number(sensor.val) / sensor.max) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-muted-foreground mt-1 font-medium">
                        <span>0</span>
                        <span>Target: {sensor.target}</span>
                        <span>{sensor.max}</span>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
