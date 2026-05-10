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

  // Mock plant data - in real app would fetch by ID
  const plant = {
    id: "1",
    name: "Selada Keriting",
    type: "Hydroponic Lettuce",
    plantedDate: "12 April 2024",
    status: data.ph < 5.6 || data.tds < 600 ? "Kritis" : "Sehat",
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

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/tanaman">
          <Button variant="outline" size="icon" className="rounded-full">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">{plant.name}</h1>
            <Badge variant={plant.status === "Sehat" ? "success" : "destructive"}>
              {plant.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Ditanam pada {plant.plantedDate} • ID: {id}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
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
              <Card className="overflow-hidden border-2 border-border/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-muted/30">
                  <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
                  <metric.icon className={cn("h-4 w-4", metric.color)} />
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Saat Ini</p>
                      <p className="text-3xl font-bold">{metric.current} <span className="text-sm font-normal text-muted-foreground">{metric.unit}</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Normal</p>
                      <p className="text-lg font-semibold">{metric.target} {metric.unit}</p>
                    </div>
                  </div>

                  <div className={cn(
                    "p-3 rounded-lg flex items-center justify-between",
                    isOptimal ? "bg-success/10 text-success" : 
                    isHigher ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"
                  )}>
                    <div className="flex items-center gap-2">
                      {isOptimal ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                      <span className="text-sm font-bold">
                        {isOptimal ? "Kondisi Optimal" : isHigher ? "Terlalu Tinggi" : "Terlalu Rendah"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 font-mono text-sm">
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
        <CardHeader>
          <CardTitle>Analisis Kondisi & Rekomendasi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted/50 rounded-xl border border-border/50">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <Info className="h-4 w-4 text-primary" />
              Status Terkini
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Berdasarkan data sensor pukul <strong>{lastUpdate}</strong>, tanaman {plant.name} sedang berada dalam status 
              <span className={cn("font-bold mx-1", plant.status === "Sehat" ? "text-success" : "text-destructive")}>
                {plant.status}
              </span>. 
              {plant.status === "Kritis" ? 
                " Dibutuhkan tindakan segera pada sistem pengairan untuk menyeimbangkan kadar nutrisi dan pH air." : 
                " Pertumbuhan berjalan dengan baik, pertahankan kondisi lingkungan saat ini."}
            </p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 border rounded-xl">
              <h4 className="text-sm font-bold mb-2">Tindakan Disarankan</h4>
              <ul className="text-xs space-y-2 text-muted-foreground list-disc pl-4">
                <li>Periksa filter pompa air</li>
                <li>Tambahkan larutan nutrisi A&B jika TDS di bawah 600</li>
                <li>Gunakan pH Down jika pH di atas 7.2</li>
              </ul>
            </div>
            <div className="p-4 border rounded-xl flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold mb-2">Estimasi Panen</h4>
                <p className="text-2xl font-bold text-primary">14 Hari Lagi</p>
              </div>
              <Link href="/kontrol">
                <Button className="w-full mt-4 gap-2">
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
