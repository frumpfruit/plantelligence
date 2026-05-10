"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Droplets, Thermometer, Activity, FlaskConical, Wind, Zap, RefreshCw, Loader2, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/components/ToastProvider"
import { useSensors } from "@/components/SensorProvider"
import { cn } from "@/lib/utils"

export default function MonitoringPage() {
  const { data, isRefreshing, refreshData, lastUpdate } = useSensors()
  const { showToast } = useToast()

  const handleManualRefresh = () => {
    refreshData(false)
    showToast("Memperbarui data sensor...", "info")
  }

  const sensors = [
    { title: "Sensor pH Air", val: data.ph, unit: "pH", icon: FlaskConical, color: "primary", target: 6.0, max: 14, status: data.ph < 5.5 ? "Critical" : data.ph < 6.0 ? "Warning" : "Normal" },
    { title: "Sensor Nutrisi (TDS)", val: data.tds, unit: "ppm", icon: Activity, color: "warning", target: 800, max: 1000, status: data.tds < 600 ? "Critical" : data.tds < 800 ? "Warning" : "Normal" },
    { title: "Suhu Air", val: data.tempWater, unit: "°C", icon: Thermometer, color: "info", target: 24.0, max: 40, status: (data.tempWater < 23.5 || data.tempWater > 24.5) ? "Warning" : "Optimal" },
    { title: "Kelembaban Udara", val: data.humidity, unit: "%", icon: Droplets, color: "primary", status: data.humidity < 40 ? "Warning" : "Normal" },
    { title: "Suhu Ruangan", val: data.tempAir, unit: "°C", icon: Wind, color: "primary", status: data.tempAir > 32 ? "Critical" : data.tempAir > 30 ? "Warning" : "Normal" },
    { title: "Intensitas Cahaya", val: data.lux, unit: "Lux", icon: Zap, color: "primary", status: "Normal" },
  ]

  const getStatusColorClass = (status: string) => {
    switch (status) {
      case "Critical": return "border-destructive bg-destructive/5 shadow-destructive/10"
      case "Warning": return "border-warning bg-warning/5 shadow-warning/10"
      case "Optimal": return "border-info bg-info/5 shadow-info/10"
      default: return "border-border"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Monitoring Sensor</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Indikator warna kartu berubah otomatis sesuai status sensor.
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={handleManualRefresh} 
          disabled={isRefreshing}
          className="gap-2"
        >
          {isRefreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          Refresh Data
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sensors.map((sensor, i) => (
          <motion.div
            key={sensor.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className={cn(
              "overflow-hidden h-full shadow-sm hover:shadow-md transition-all duration-500 border-2",
              getStatusColorClass(sensor.status)
            )}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{sensor.title}</CardTitle>
                <sensor.icon className={cn(
                  "h-5 w-5 transition-colors",
                  sensor.status === "Critical" ? "text-destructive animate-bounce" : 
                  sensor.status === "Warning" ? "text-warning animate-pulse" : "text-muted-foreground"
                )} />
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2 mb-2">
                  <AnimatePresence mode="wait">
                    <motion.span 
                      key={sensor.val}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="text-4xl font-bold tracking-tighter"
                    >
                      {isRefreshing ? "..." : sensor.val}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-sm text-muted-foreground mb-1">{sensor.unit}</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant={sensor.status.toLowerCase() as any} className="gap-1">
                    {sensor.status === "Critical" && <AlertCircle className="h-3 w-3" />}
                    {sensor.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground italic">Updated {lastUpdate}</span>
                </div>
                
                {sensor.target && sensor.max && (
                  <div className="mt-4">
                    <div className="relative h-2 w-full bg-muted rounded-full overflow-hidden mb-1">
                      {/* Target Marker Line */}
                      <div 
                        className="absolute top-0 bottom-0 w-0.5 bg-foreground/30 z-10"
                        style={{ left: `${(sensor.target / sensor.max) * 100}%` }}
                      />
                      
                      {/* Current Value Bar */}
                      <motion.div 
                        className={cn(
                          "h-full transition-all duration-1000",
                          sensor.status === "Critical" ? "bg-destructive" : 
                          sensor.status === "Warning" ? "bg-warning" : "bg-primary"
                        )} 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((parseFloat(String(sensor.val)) / sensor.max) * 100, 100)}%` }}
                      />
                    </div>
                    
                    <div className="relative h-4 text-[10px] text-muted-foreground font-medium">
                      <span className="absolute left-0">0</span>
                      <span 
                        className="absolute -translate-x-1/2 whitespace-nowrap text-foreground"
                        style={{ left: `${(sensor.target / sensor.max) * 100}%` }}
                      >
                        Target: {sensor.target}
                      </span>
                      <span className="absolute right-0">{sensor.max}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
