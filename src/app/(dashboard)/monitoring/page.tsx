"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Droplets, Thermometer, Activity, FlaskConical, Wind, Zap } from "lucide-react"

export default function MonitoringPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Monitoring Sensor</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Pantau data real-time dari semua sensor di fasilitas hidroponik.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* pH Sensor */}
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sensor pH Air</CardTitle>
            <FlaskConical className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-bold">5.8</span>
              <span className="text-sm text-muted-foreground mb-1">pH</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="success">Normal</Badge>
              <span className="text-xs text-muted-foreground">Updated 5s ago</span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: "58%" }}></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0</span>
              <span>Target: 6.0</span>
              <span>14</span>
            </div>
          </CardContent>
        </Card>

        {/* Nutrisi Sensor */}
        <Card className="border-l-4 border-l-warning">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sensor Nutrisi (TDS)</CardTitle>
            <Activity className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-bold">650</span>
              <span className="text-sm text-muted-foreground mb-1">ppm</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="warning">Warning</Badge>
              <span className="text-xs text-muted-foreground">Updated 5s ago</span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-warning" style={{ width: "65%" }}></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0</span>
              <span>Target: 800</span>
              <span>1000</span>
            </div>
          </CardContent>
        </Card>

        {/* Suhu Air Sensor */}
        <Card className="border-l-4 border-l-info">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suhu Air</CardTitle>
            <Thermometer className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-bold">24.6</span>
              <span className="text-sm text-muted-foreground mb-1">°C</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="info">Optimal</Badge>
              <span className="text-xs text-muted-foreground">Updated 5s ago</span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-info" style={{ width: "61%" }}></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0</span>
              <span>Target: 24.0</span>
              <span>40</span>
            </div>
          </CardContent>
        </Card>

        {/* Kelembaban Ruangan */}
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kelembaban Udara</CardTitle>
            <Droplets className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-bold">68</span>
              <span className="text-sm text-muted-foreground mb-1">%</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="success">Normal</Badge>
              <span className="text-xs text-muted-foreground">Updated 1m ago</span>
            </div>
          </CardContent>
        </Card>

        {/* Suhu Ruangan */}
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suhu Ruangan</CardTitle>
            <Wind className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-bold">28.2</span>
              <span className="text-sm text-muted-foreground mb-1">°C</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="success">Normal</Badge>
              <span className="text-xs text-muted-foreground">Updated 1m ago</span>
            </div>
          </CardContent>
        </Card>

        {/* Intensitas Cahaya */}
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Intensitas Cahaya</CardTitle>
            <Zap className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-bold">12.5k</span>
              <span className="text-sm text-muted-foreground mb-1">Lux</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="success">Normal</Badge>
              <span className="text-xs text-muted-foreground">Updated 1m ago</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
