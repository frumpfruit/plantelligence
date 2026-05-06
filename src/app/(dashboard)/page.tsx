"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Droplets, 
  Thermometer, 
  Activity, 
  FlaskConical, 
  CheckCircle2, 
  Wifi, 
  Sprout,
  Lightbulb
} from "lucide-react"
import { 
  AreaChart, 
  Area, 
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts"

const chartData = [
  { name: 'Sen', ph: 5.5, suhu: 24.2, nutrisi: 600, cahaya: 8.5 },
  { name: 'Sel', ph: 5.7, suhu: 24.5, nutrisi: 620, cahaya: 9.0 },
  { name: 'Rab', ph: 5.8, suhu: 24.6, nutrisi: 640, cahaya: 7.5 },
  { name: 'Kam', ph: 6.0, suhu: 24.8, nutrisi: 650, cahaya: 10.2 },
  { name: 'Jum', ph: 5.9, suhu: 24.7, nutrisi: 650, cahaya: 9.8 },
  { name: 'Sab', ph: 5.8, suhu: 24.6, nutrisi: 645, cahaya: 8.9 },
  { name: 'Min', ph: 5.8, suhu: 24.6, nutrisi: 650, cahaya: 9.5 },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Ringkasan sistem hidroponik dan performa tanaman real-time.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success" className="gap-1.5 py-1 px-3">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Sistem Normal
          </Badge>
          <Badge variant="outline" className="gap-1.5 py-1 px-3 border-success text-success">
            <Wifi className="h-3.5 w-3.5" />
            Online
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">pH Air</CardTitle>
            <FlaskConical className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.8</div>
            <p className="text-xs text-muted-foreground mt-1">
              Ideal (5.5 - 6.5)
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nutrisi (TDS)</CardTitle>
            <Activity className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">650 <span className="text-sm font-normal text-muted-foreground">ppm</span></div>
            <p className="text-xs text-muted-foreground mt-1 text-emerald-500 flex items-center gap-1">
              Stabil
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suhu Air</CardTitle>
            <Thermometer className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.6 <span className="text-sm font-normal text-muted-foreground">°C</span></div>
            <p className="text-xs text-muted-foreground mt-1">
              Normal
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Intensitas Cahaya</CardTitle>
            <Lightbulb className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9.5 <span className="text-sm font-normal text-muted-foreground">kLux</span></div>
            <p className="text-xs text-muted-foreground mt-1">
              Cukup untuk fotosintesis
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
        
        {/* Kolom Grafik Kiri */}
        <div className="col-span-1 md:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Trend Nutrisi (PPM) & pH</CardTitle>
              <CardDescription>Fluktuasi konsentrasi nutrisi dan pH dalam 7 hari terakhir.</CardDescription>
            </CardHeader>
            <CardContent className="pl-0">
              <div className="h-[250px] w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorNutrisi" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                    <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} domain={['auto', 'auto']} />
                    <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={10} domain={[4, 8]} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend verticalAlign="top" height={36}/>
                    <Area yAxisId="left" type="monotone" dataKey="nutrisi" name="Nutrisi (PPM)" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorNutrisi)" />
                    <Line yAxisId="right" type="monotone" dataKey="ph" name="pH Air" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Suhu Air (°C)</CardTitle>
              </CardHeader>
              <CardContent className="pl-0">
                <div className="h-[180px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={5} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} domain={['auto', 'auto']} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 4px rgb(0 0 0 / 0.1)' }} />
                      <Line type="monotone" dataKey="suhu" name="Suhu Air" stroke="#f43f5e" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Intensitas Cahaya (kLux)</CardTitle>
              </CardHeader>
              <CardContent className="pl-0">
                <div className="h-[180px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={5} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                      <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 4px rgb(0 0 0 / 0.1)' }} />
                      <Bar dataKey="cahaya" name="Cahaya" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Kolom Info Kanan */}
        <Card className="col-span-1 md:col-span-3">
          <CardHeader>
            <CardTitle>Ringkasan Tanaman</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center mr-4 border border-emerald-200">
                  <Sprout className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Total Aktif</p>
                  <p className="text-xs text-muted-foreground">Selada, Pakcoy, Bayam</p>
                </div>
                <div className="font-medium text-lg">1,240</div>
              </div>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 border border-blue-200">
                  <CheckCircle2 className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Status Sehat</p>
                  <p className="text-xs text-muted-foreground">Optimal growth rate</p>
                </div>
                <div className="font-medium text-lg text-blue-600">1,180</div>
              </div>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center mr-4 border border-amber-200">
                  <Activity className="h-5 w-5 text-amber-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Perlu Perhatian</p>
                  <p className="text-xs text-muted-foreground">Gejala kekurangan nutrisi</p>
                </div>
                <div className="font-medium text-lg text-amber-600">60</div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t">
              <h4 className="text-sm font-medium mb-4">Aktivitas & Log Sistem Terbaru</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 mt-1.5 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  <div>
                    <p className="text-sm font-medium">Pompa Nutrisi A menyala (Dosing 50ml)</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Baru saja</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-2 w-2 rounded-full bg-amber-500 mt-1.5" />
                  <div>
                    <p className="text-sm font-medium">Intensitas cahaya ditingkatkan (Auto-Dim)</p>
                    <p className="text-xs text-muted-foreground mt-0.5">2 jam yang lalu</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-2 w-2 rounded-full bg-blue-500 mt-1.5" />
                  <div>
                    <p className="text-sm font-medium">Sistem sirkulasi berjalan normal</p>
                    <p className="text-xs text-muted-foreground mt-0.5">5 jam yang lalu</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
