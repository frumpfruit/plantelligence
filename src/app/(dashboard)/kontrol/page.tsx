"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Droplets, Lightbulb, RefreshCcw, ShieldAlert, Play, Square, Timer, ArrowUp, ArrowDown } from "lucide-react"

export default function ControlPage() {
  const [isAutoMode, setIsAutoMode] = useState(true)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Kontrol Sistem</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Kendalikan perangkat IoT secara manual atau serahkan pada otomatisasi AI.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition-colors ${isAutoMode ? 'border-primary bg-primary/5' : 'border-muted bg-muted'}`}>
            <div className="flex flex-col">
              <span className="text-sm font-bold">Mode Otomatis Global</span>
              <span className="text-xs text-muted-foreground">
                {isAutoMode ? "Sistem dikendalikan oleh AI & Jadwal" : "Manual Override Aktif"}
              </span>
            </div>
            <Switch 
              checked={isAutoMode} 
              onCheckedChange={setIsAutoMode} 
              className="ml-2 scale-125 data-[state=checked]:bg-primary"
            />
          </div>
          <Button variant="destructive" className="gap-2 h-12">
            <ShieldAlert className="h-4 w-4" />
            <span className="hidden sm:inline">Emergency Stop</span>
          </Button>
        </div>
      </div>

      {!isAutoMode && (
        <div className="p-4 mb-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 mt-0.5 text-amber-600 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-sm">Mode Manual Aktif</h4>
            <p className="text-sm mt-1 text-amber-700">
              Perangkat tidak akan mengikuti jadwal otomatis atau parameter AI. Pastikan Anda mengembalikan ke Mode Otomatis setelah selesai melakukan perbaikan atau intervensi.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Water Pump */}
        <Card className={`transition-all ${!isAutoMode ? 'border-primary/50 ring-1 ring-primary/20' : ''}`}>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-xl relative">
                  <RefreshCcw className="h-6 w-6 text-primary" />
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                </div>
                <div>
                  <CardTitle className="text-lg">Pompa Air Utama</CardTitle>
                  <CardDescription>Sirkulasi Air Nutrisi</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-50 p-4 rounded-lg mb-4 border flex justify-between items-center">
               <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider mb-1">Status Saat Ini</p>
                  <p className="text-lg font-bold text-green-600 flex items-center gap-2">
                    MENYALA <span className="text-sm font-normal text-slate-500">(2j 15m)</span>
                  </p>
               </div>
               <Badge variant={isAutoMode ? "default" : "outline"}>
                 {isAutoMode ? "Auto" : "Manual"}
               </Badge>
            </div>
            
            <div className="space-y-3 mt-6">
              <p className="text-sm font-medium text-slate-700 border-b pb-2">Kontrol Manual</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Button variant="default" className="bg-green-600 hover:bg-green-700 gap-2" disabled={isAutoMode}>
                  <Play className="w-4 h-4" /> Nyalakan
                </Button>
                <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 gap-2" disabled={isAutoMode}>
                  <Square className="w-4 h-4" /> Matikan
                </Button>
              </div>
              <Button variant="secondary" className="w-full gap-2" disabled={isAutoMode}>
                <Timer className="w-4 h-4" /> Jalankan Timer (5 Menit)
              </Button>
              <p className="text-xs text-center text-muted-foreground pt-1">Terakhir intervensi: Hari ini, 08:00 AM</p>
            </div>
          </CardContent>
        </Card>

        {/* Nutrisi A */}
        <Card className={`transition-all ${!isAutoMode ? 'border-primary/50 ring-1 ring-primary/20' : ''}`}>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-100 rounded-xl relative">
                  <Droplets className="h-6 w-6 text-indigo-500" />
                </div>
                <div>
                  <CardTitle className="text-lg">Pompa Nutrisi A</CardTitle>
                  <CardDescription>Dosing System (Makro)</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-50 p-4 rounded-lg mb-4 border flex justify-between items-center">
               <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider mb-1">Status Saat Ini</p>
                  <p className="text-lg font-bold text-slate-500 flex items-center gap-2">
                    MATI
                  </p>
               </div>
               <Badge variant={isAutoMode ? "default" : "outline"}>
                 {isAutoMode ? "Auto" : "Manual"}
               </Badge>
            </div>
            
            <div className="space-y-3 mt-6">
              <p className="text-sm font-medium text-slate-700 border-b pb-2">Kontrol Manual</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Button variant="default" className="bg-green-600 hover:bg-green-700 gap-2" disabled={isAutoMode}>
                  <Play className="w-4 h-4" /> Nyalakan
                </Button>
                <Button variant="outline" className="text-red-600 border-red-200 bg-red-50 gap-2 opacity-50 cursor-not-allowed" disabled>
                  <Square className="w-4 h-4" /> Matikan
                </Button>
              </div>
              <Button variant="secondary" className="w-full gap-2" disabled={isAutoMode}>
                <Timer className="w-4 h-4" /> Dosing (50ml)
              </Button>
              <p className="text-xs text-center text-muted-foreground pt-1">Terakhir intervensi: Kemarin, 14:30</p>
            </div>
          </CardContent>
        </Card>

        {/* Nutrisi B */}
        <Card className={`transition-all ${!isAutoMode ? 'border-primary/50 ring-1 ring-primary/20' : ''}`}>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-violet-100 rounded-xl relative">
                  <Droplets className="h-6 w-6 text-violet-500" />
                </div>
                <div>
                  <CardTitle className="text-lg">Pompa Nutrisi B</CardTitle>
                  <CardDescription>Dosing System (Mikro)</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-50 p-4 rounded-lg mb-4 border flex justify-between items-center">
               <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider mb-1">Status Saat Ini</p>
                  <p className="text-lg font-bold text-slate-500 flex items-center gap-2">
                    MATI
                  </p>
               </div>
               <Badge variant={isAutoMode ? "default" : "outline"}>
                 {isAutoMode ? "Auto" : "Manual"}
               </Badge>
            </div>
            
            <div className="space-y-3 mt-6">
              <p className="text-sm font-medium text-slate-700 border-b pb-2">Kontrol Manual</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Button variant="default" className="bg-green-600 hover:bg-green-700 gap-2" disabled={isAutoMode}>
                  <Play className="w-4 h-4" /> Nyalakan
                </Button>
                <Button variant="outline" className="text-red-600 border-red-200 bg-red-50 gap-2 opacity-50 cursor-not-allowed" disabled>
                  <Square className="w-4 h-4" /> Matikan
                </Button>
              </div>
              <Button variant="secondary" className="w-full gap-2" disabled={isAutoMode}>
                <Timer className="w-4 h-4" /> Dosing (50ml)
              </Button>
              <p className="text-xs text-center text-muted-foreground pt-1">Terakhir intervensi: Kemarin, 14:30</p>
            </div>
          </CardContent>
        </Card>

        {/* pH Up */}
        <Card className={`transition-all ${!isAutoMode ? 'border-primary/50 ring-1 ring-primary/20' : ''}`}>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-xl relative">
                  <ArrowUp className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Pompa pH Up</CardTitle>
                  <CardDescription>Basa (Naikkan pH)</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-50 p-4 rounded-lg mb-4 border flex justify-between items-center">
               <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider mb-1">Status Saat Ini</p>
                  <p className="text-lg font-bold text-slate-500 flex items-center gap-2">
                    MATI
                  </p>
               </div>
               <Badge variant={isAutoMode ? "default" : "outline"}>
                 {isAutoMode ? "Auto" : "Manual"}
               </Badge>
            </div>
            
            <div className="space-y-3 mt-6">
              <p className="text-sm font-medium text-slate-700 border-b pb-2">Kontrol Manual</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Button variant="default" className="bg-green-600 hover:bg-green-700 gap-2" disabled={isAutoMode}>
                  <Play className="w-4 h-4" /> Nyalakan
                </Button>
                <Button variant="outline" className="text-red-600 border-red-200 bg-red-50 gap-2 opacity-50 cursor-not-allowed" disabled>
                  <Square className="w-4 h-4" /> Matikan
                </Button>
              </div>
              <Button variant="secondary" className="w-full gap-2" disabled={isAutoMode}>
                <Timer className="w-4 h-4" /> Dosing (20ml)
              </Button>
              <p className="text-xs text-center text-muted-foreground pt-1">Terakhir intervensi: Tidak ada rekam jejak</p>
            </div>
          </CardContent>
        </Card>

        {/* pH Down */}
        <Card className={`transition-all ${!isAutoMode ? 'border-primary/50 ring-1 ring-primary/20' : ''}`}>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-rose-100 rounded-xl relative">
                  <ArrowDown className="h-6 w-6 text-rose-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Pompa pH Down</CardTitle>
                  <CardDescription>Asam (Turunkan pH)</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-50 p-4 rounded-lg mb-4 border flex justify-between items-center">
               <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider mb-1">Status Saat Ini</p>
                  <p className="text-lg font-bold text-slate-500 flex items-center gap-2">
                    MATI
                  </p>
               </div>
               <Badge variant={isAutoMode ? "default" : "outline"}>
                 {isAutoMode ? "Auto" : "Manual"}
               </Badge>
            </div>
            
            <div className="space-y-3 mt-6">
              <p className="text-sm font-medium text-slate-700 border-b pb-2">Kontrol Manual</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Button variant="default" className="bg-green-600 hover:bg-green-700 gap-2" disabled={isAutoMode}>
                  <Play className="w-4 h-4" /> Nyalakan
                </Button>
                <Button variant="outline" className="text-red-600 border-red-200 bg-red-50 gap-2 opacity-50 cursor-not-allowed" disabled>
                  <Square className="w-4 h-4" /> Matikan
                </Button>
              </div>
              <Button variant="secondary" className="w-full gap-2" disabled={isAutoMode}>
                <Timer className="w-4 h-4" /> Dosing (20ml)
              </Button>
              <p className="text-xs text-center text-muted-foreground pt-1">Terakhir intervensi: Kemarin, 08:00 PM</p>
            </div>
          </CardContent>
        </Card>

        {/* Grow Light */}
        <Card className={`transition-all ${!isAutoMode ? 'border-primary/50 ring-1 ring-primary/20' : ''}`}>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-100 rounded-xl relative shadow-[0_0_15px_rgba(251,191,36,0.5)]">
                  <Lightbulb className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Grow Light LED</CardTitle>
                  <CardDescription>Pencahayaan Utama</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-amber-50 p-4 rounded-lg mb-4 border border-amber-100 flex justify-between items-center">
               <div>
                  <p className="text-xs text-amber-700/70 uppercase font-semibold tracking-wider mb-1">Status Saat Ini</p>
                  <p className="text-lg font-bold text-amber-600 flex items-center gap-2">
                    MENYALA <span className="text-sm font-normal text-amber-600/70">(100% Intensitas)</span>
                  </p>
               </div>
               <Badge className="bg-amber-500 hover:bg-amber-600">
                 {isAutoMode ? "Auto" : "Manual"}
               </Badge>
            </div>
            
            <div className="space-y-3 mt-6">
              <p className="text-sm font-medium text-slate-700 border-b pb-2">Kontrol Manual</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Button variant="default" className="bg-green-600 opacity-50 cursor-not-allowed gap-2" disabled>
                  <Play className="w-4 h-4" /> Nyalakan
                </Button>
                <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 gap-2" disabled={isAutoMode}>
                  <Square className="w-4 h-4" /> Matikan
                </Button>
              </div>
              <div className="pt-2">
                <p className="text-xs text-muted-foreground mb-2 flex justify-between">
                  <span>Intensitas Lampu</span>
                  <span>100%</span>
                </p>
                <input type="range" min="0" max="100" defaultValue="100" className="w-full accent-amber-500" disabled={isAutoMode} />
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
