"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Thermometer, FlaskConical, Activity, TrendingDown, TrendingUp, CheckCircle2, AlertCircle, Info, Settings2 } from "lucide-react"
import { useSensors } from "@/components/SensorProvider"
import Link from "next/link"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function PlantDetailPage() {
  const { id } = useParams()
  const { data, lastUpdate } = useSensors()

  // Determine if any parameter is out of bounds
  const isCritical = data.ph < 5.8 || data.ph > 7.2 || data.tds < 700 || data.tempWater > 25.5

  // Mock plant data - in real app would fetch by ID
  const plant = {
    id: "1",
    name: "Selada Keriting",
    type: "Hydroponic Lettuce",
    plantedDate: "12 April 2024",
    status: isCritical ? "Kritis" : "Sehat",
    targets: {
      ph: 6.0,
      tds: 800,
      temp: 24.0
    }
  }

  const metrics = [
    { 
      label: "Kadar pH", 
      current: data.ph, 
      target: plant.targets.ph, 
      unit: "pH", 
      icon: FlaskConical,
      color: data.ph < 5.6 ? "text-destructive" : "text-primary"
    },
    { 
      label: "Nutrisi (TDS)", 
      current: data.tds, 
      target: plant.targets.tds, 
      unit: "ppm", 
      icon: Activity,
      color: data.tds < 600 ? "text-warning" : "text-warning"
    },
    { 
      label: "Suhu Air", 
      current: data.tempWater, 
      target: plant.targets.temp, 
      unit: "°C", 
      icon: Thermometer,
      color: "text-info"
    },
  ]

  // Dynamic Recommendations based on sensors
  const getRecommendations = () => {
    const recs = []
    if (data.ph < 5.8) recs.push("Tambahkan larutan pH Up (10ml) untuk menaikkan pH ke angka 6.0.")
    if (data.ph > 7.2) recs.push("Tambahkan larutan pH Down (5ml) untuk menurunkan keasaman air.")
    if (data.tds < 700) recs.push("Segera tambahkan Nutrisi AB Mix (50ml) - Kadar PPM kritis.")
    if (data.tempWater > 25.5) recs.push("Nyalakan Water Chiller atau tambahkan air dingin ke tandon.")
    
    if (recs.length === 0) return ["Kondisi air sangat ideal. Pertahankan volume air tandon.", "Pastikan sirkulasi air tetap lancar."]
    return recs
  }

  const recommendations = getRecommendations()

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4 sm:px-0">
      <div className="flex items-start sm:items-center gap-4">
        <Link href="/tanaman">
          <Button variant="outline" size="icon" className="rounded-full shrink-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">{plant.name}</h1>
            <Badge variant={plant.status === "Sehat" ? "success" : "destructive"}>
              {plant.status}
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Ditanam pada {plant.plantedDate} • ID: {id}
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-3">
        {metrics.map((metric, idx) => {
          const diff = Number((metric.current - metric.target).toFixed(1))
          const isHigher = diff > 0
          const isOptimal = Math.abs(diff) <= 0.2
          
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="overflow-hidden border-2 border-border/50 h-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-muted/30">
                  <CardTitle className="text-xs sm:text-sm font-medium">{metric.label}</CardTitle>
                  <metric.icon className={cn("h-4 w-4", metric.color)} />
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Saat Ini</p>
                      <p className="text-2xl sm:text-3xl font-bold">{metric.current} <span className="text-xs sm:text-sm font-normal text-muted-foreground">{metric.unit}</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Normal</p>
                      <p className="text-base sm:text-lg font-semibold">{metric.target} {metric.unit}</p>
                    </div>
                  </div>

                  <div className={cn(
                    "p-2 sm:p-3 rounded-lg flex items-center justify-between",
                    isOptimal ? "bg-success/10 text-success" : 
                    isHigher ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"
                  )}>
                    <div className="flex items-center gap-1.5">
                      {isOptimal ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertCircle className="h-3.5 w-3.5" />}
                      <span className="text-[10px] sm:text-xs font-bold">
                        {isOptimal ? "Optimal" : isHigher ? "Tinggi" : "Rendah"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 font-mono text-[10px] sm:text-xs">
                      {isHigher ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {Math.abs(diff)} {metric.unit}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg sm:text-xl">Analisis & Rekomendasi Sistem</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted/50 rounded-xl border border-border/50">
            <h3 className="font-bold text-sm mb-2 flex items-center gap-2">
              <Info className="h-4 w-4 text-primary" />
              Kondisi Terkini (AI Analysis)
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Berdasarkan data sensor pukul <strong>{lastUpdate}</strong>, sistem mendeteksi bahwa tanaman sedang dalam status{" "}
              <span className={cn("font-bold mx-1", plant.status === "Sehat" ? "text-success" : "text-destructive")}>
                {plant.status}
              </span>. 
              {plant.status === "Kritis" ? 
                " Dibutuhkan tindakan manual pada modul kontrol untuk menyeimbangkan parameter air." : 
                " Semua parameter dalam batas toleransi pertumbuhan ideal."}
            </p>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 border rounded-xl bg-card">
              <h4 className="text-xs sm:text-sm font-bold mb-3 flex items-center gap-2">
                <Activity className="h-4 w-4 text-warning" />
                Tindakan Disarankan
              </h4>
              <ul className="text-xs space-y-2.5 text-muted-foreground list-none">
                {recommendations.map((rec, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 border rounded-xl flex flex-col justify-between bg-card">
              <div className="mb-4">
                <h4 className="text-xs sm:text-sm font-bold mb-2">Estimasi Panen</h4>
                <div className="flex items-baseline gap-1">
                  <p className="text-3xl font-bold text-primary">14</p>
                  <p className="text-sm font-medium text-muted-foreground">Hari Lagi</p>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full mt-2">
                  <div className="h-full bg-primary w-1/2 rounded-full" />
                </div>
              </div>
              <Link href="/kontrol">
                <Button className="w-full gap-2 shadow-sm">
                  <Settings2 className="h-4 w-4" />
                  Buka Kontrol Sistem
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
