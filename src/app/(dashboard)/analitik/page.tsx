"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Activity, Droplets, Leaf, Sprout } from "lucide-react"

// Dummy Data
const productionData = [
  { month: "Jan", actual: 400, target: 450 },
  { month: "Feb", actual: 300, target: 450 },
  { month: "Mar", actual: 550, target: 500 },
  { month: "Apr", actual: 450, target: 500 },
  { month: "Mei", actual: 600, target: 550 },
  { month: "Jun", actual: 700, target: 600 },
]

const resourceData = [
  { week: "Minggu 1", water: 120, nutrient: 40 },
  { week: "Minggu 2", water: 130, nutrient: 45 },
  { week: "Minggu 3", water: 110, nutrient: 35 },
  { week: "Minggu 4", water: 140, nutrient: 50 },
]

const plantDistributionData = [
  { name: "Selada", value: 45, color: "#22c55e" },
  { name: "Pakcoy", value: 30, color: "#3b82f6" },
  { name: "Kangkung", value: 15, color: "#f59e0b" },
  { name: "Bayam", value: 10, color: "#8b5cf6" },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analitik</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Analisis mendalam performa farm dan penggunaan sumber daya Anda.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Produksi (Bulan ini)</CardTitle>
            <Sprout className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">700 kg</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-500 font-medium">+16.6%</span> dari bulan lalu
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efisiensi Penggunaan Air</CardTitle>
            <Droplets className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-500 font-medium">+2.4%</span> di atas standar industri
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estimasi Panen Berikutnya</CardTitle>
            <Leaf className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 Hari</div>
            <p className="text-xs text-muted-foreground mt-1">
              Untuk blok Selada (Blok A)
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skor Kesehatan Tanaman</CardTitle>
            <Activity className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9.4/10</div>
            <p className="text-xs text-muted-foreground mt-1">
              Berdasarkan analisis visual AI terbaru
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6">
        {/* Main Chart */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-4">
          <CardHeader>
            <CardTitle>Tren Produksi (Aktual vs Target)</CardTitle>
            <CardDescription>Perbandingan hasil panen dalam kilogram per bulan.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={productionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}kg`} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`${value} kg`]}
                />
                <Area type="monotone" dataKey="target" name="Target" stroke="#94a3b8" strokeDasharray="5 5" fillOpacity={1} fill="url(#colorTarget)" />
                <Area type="monotone" dataKey="actual" name="Aktual" stroke="#22c55e" strokeWidth={2} fillOpacity={1} fill="url(#colorActual)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Resource Usage Chart */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Penggunaan Sumber Daya</CardTitle>
            <CardDescription>Konsumsi air dan nutrisi per minggu (Bulan ini).</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={resourceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="week" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="water" name="Air (L)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="nutrient" name="Nutrisi (mL/L)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Distribusi Jenis Tanaman</CardTitle>
            <CardDescription>Persentase komoditas yang sedang ditanam di sistem.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={plantDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({name, percent}) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {plantDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} formatter={(value) => [`${value}%`]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Insight Sistem (AI)</CardTitle>
            <CardDescription>Rekomendasi optimasi berdasarkan data 30 hari terakhir.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border border-emerald-200 bg-emerald-50 rounded-lg">
                <h4 className="font-semibold text-emerald-800 text-sm flex items-center gap-2">
                  <Leaf className="w-4 h-4" /> Optimasi Nutrisi B Berhasil
                </h4>
                <p className="text-sm text-emerald-700 mt-1">Pengurangan 5% rasio Nutrisi B minggu lalu menunjukkan tidak ada penurunan laju pertumbuhan. Estimasi penghematan: Rp 450.000/bulan.</p>
              </div>
              <div className="p-4 border border-amber-200 bg-amber-50 rounded-lg">
                <h4 className="font-semibold text-amber-800 text-sm flex items-center gap-2">
                  <Activity className="w-4 h-4" /> Peringatan Efisiensi Lampu
                </h4>
                <p className="text-sm text-amber-700 mt-1">Lampu Grow Light di Blok C (Kangkung) menyala 2 jam lebih lama dari siklus ideal karena kesalahan sensor cahaya. Disarankan untuk kalibrasi sensor.</p>
              </div>
              <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 text-sm flex items-center gap-2">
                  <Droplets className="w-4 h-4" /> Pola Penyiraman Optimal
                </h4>
                <p className="text-sm text-blue-700 mt-1">Siklus penyiraman setiap 45 menit (durasi 5 menit) memberikan retensi kelembapan terbaik untuk cuaca saat ini.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}
