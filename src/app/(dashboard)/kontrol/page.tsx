"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Droplets, Lightbulb, RefreshCcw, ShieldAlert, Play, Square, ArrowUp, ArrowDown, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/components/ToastProvider"

type ModuleStatus = "on" | "off" | "loading"

interface Module {
  id: string
  name: string
  description: string
  iconColor: string
  bgColor: string
  status: ModuleStatus
  lastAction: string
}

const initialModules: Module[] = [
  { id: "pump-main", name: "Pompa Air Utama", description: "Sirkulasi Air Nutrisi", iconColor: "text-primary", bgColor: "bg-primary/10", status: "on", lastAction: "Hari ini, 08:00 AM" },
  { id: "nutrisi-a", name: "Pompa Nutrisi A", description: "Dosing System (Makro)", iconColor: "text-indigo-500", bgColor: "bg-indigo-100", status: "off", lastAction: "Kemarin, 14:30" },
  { id: "nutrisi-b", name: "Pompa Nutrisi B", description: "Dosing System (Mikro)", iconColor: "text-violet-500", bgColor: "bg-violet-100", status: "off", lastAction: "Kemarin, 14:30" },
  { id: "ph-up", name: "Pompa pH Up", description: "Basa (Naikkan pH)", iconColor: "text-blue-600", bgColor: "bg-blue-100", status: "off", lastAction: "Tidak ada rekam jejak" },
  { id: "ph-down", name: "Pompa pH Down", description: "Asam (Turunkan pH)", iconColor: "text-rose-600", bgColor: "bg-rose-100", status: "off", lastAction: "Kemarin, 08:00 PM" },
  { id: "grow-light", name: "Grow Light LED", description: "Pencahayaan Utama", iconColor: "text-amber-600", bgColor: "bg-amber-100", status: "on", lastAction: "Otomatis dinyalakan jam 06:00" },
]

const icons: Record<string, React.ReactNode> = {
  "pump-main": <RefreshCcw className="h-6 w-6" />,
  "nutrisi-a": <Droplets className="h-6 w-6" />,
  "nutrisi-b": <Droplets className="h-6 w-6" />,
  "ph-up": <ArrowUp className="h-6 w-6" />,
  "ph-down": <ArrowDown className="h-6 w-6" />,
  "grow-light": <Lightbulb className="h-6 w-6" />,
}

export default function ControlPage() {
  const [isAutoMode, setIsAutoMode] = useState(true)
  const [modules, setModules] = useState<Module[]>(initialModules)
  const [lightIntensity, setLightIntensity] = useState(100)
  
  const [dosageAmounts, setDosageAmounts] = useState<Record<string, number>>({
    "nutrisi-a": 50,
    "nutrisi-b": 50,
    "ph-up": 20,
    "ph-down": 20,
  })

  const { showToast } = useToast()

  const handleToggle = (moduleId: string, turnOn: boolean) => {
    if (isAutoMode) return
    setModules(prev => prev.map(m => m.id === moduleId ? { ...m, status: "loading" } : m))
    setTimeout(() => {
      const now = new Date()
      const timeStr = now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
      setModules(prev => prev.map(m =>
        m.id === moduleId ? { ...m, status: turnOn ? "on" : "off", lastAction: `Hari ini, ${timeStr}` } : m
      ))
      const moduleName = modules.find(m => m.id === moduleId)?.name
      showToast(`${moduleName} berhasil di${turnOn ? "nyalakan" : "matikan"}.`, turnOn ? "success" : "info")
    }, 1500)
  }

  const handleDosing = (moduleId: string) => {
    if (isAutoMode) return
    const dose = dosageAmounts[moduleId] || 0
    setModules(prev => prev.map(m => m.id === moduleId ? { ...m, status: "loading" } : m))
    
    setTimeout(() => {
      const now = new Date()
      const timeStr = now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
      const mod = modules.find(m => m.id === moduleId)
      setModules(prev => prev.map(m =>
        m.id === moduleId ? { ...m, status: "off", lastAction: `Dosing ${dose}ml selesai jam ${timeStr}` } : m
      ))
      showToast(`Dosing ${dose}ml pada ${mod?.name} berhasil!`, "success")
    }, 2000)
  }

  const handleEmergencyStop = () => {
    setModules(prev => prev.map(m => ({ ...m, status: "loading" })))
    setTimeout(() => {
      setModules(prev => prev.map(m => ({ ...m, status: "off" })))
      setIsAutoMode(false)
      showToast("⚠ Emergency Stop! Semua modul dimatikan.", "error")
    }, 1000)
  }

  const handleAutoToggle = (val: boolean) => {
    setIsAutoMode(val)
    showToast(val ? "Mode Otomatis diaktifkan." : "Mode Manual Override aktif. Berhati-hati!", val ? "success" : "warning")
  }

  const updateDosage = (id: string, val: string) => {
    const num = parseInt(val) || 0
    setDosageAmounts(prev => ({ ...prev, [id]: num }))
  }

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
          <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition-colors ${isAutoMode ? 'border-primary bg-primary/5' : 'border-amber-400 bg-amber-50'}`}>
            <div className="flex flex-col">
              <span className="text-sm font-bold">Mode Otomatis Global</span>
              <span className="text-xs text-muted-foreground">
                {isAutoMode ? "Sistem dikendalikan oleh AI & Jadwal" : "Manual Override Aktif"}
              </span>
            </div>
            <Switch
              checked={isAutoMode}
              onCheckedChange={handleAutoToggle}
              className="ml-2 scale-125 data-[state=checked]:bg-primary"
            />
          </div>
          <Button onClick={handleEmergencyStop} variant="destructive" className="gap-2 h-12">
            <ShieldAlert className="h-4 w-4" />
            <span className="hidden sm:inline">Emergency Stop</span>
          </Button>
        </div>
      </div>

      {!isAutoMode && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg flex items-start gap-3"
        >
          <ShieldAlert className="w-5 h-5 mt-0.5 text-amber-600 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-sm">Mode Manual Aktif</h4>
            <p className="text-sm mt-1 text-amber-700">
              Perangkat tidak akan mengikuti jadwal otomatis. Pastikan Anda mengembalikan ke Mode Otomatis setelah selesai.
            </p>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => {
          const isOn = module.status === "on"
          const isLoading = module.status === "loading"
          const isDosingModule = ["nutrisi-a", "nutrisi-b", "ph-up", "ph-down"].includes(module.id)

          return (
            <motion.div
              key={module.id}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
            >
              <Card className={`transition-all h-full ${!isAutoMode ? 'border-primary/50 ring-1 ring-primary/20' : ''}`}>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 ${module.bgColor} rounded-xl relative`}>
                      <span className={module.iconColor}>{icons[module.id]}</span>
                      {isOn && (
                        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{module.name}</CardTitle>
                      <CardDescription>{module.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Status Panel */}
                  <motion.div
                    animate={{ backgroundColor: isOn ? "#f0fdf4" : "#f8fafc" }}
                    className="p-4 rounded-lg mb-4 border flex justify-between items-center transition-colors"
                  >
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider mb-1">Status Alat</p>
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin text-primary" />
                          <span className="text-base font-bold text-primary">Memproses...</span>
                        </div>
                      ) : (
                        <p className={`text-lg font-bold ${isOn ? 'text-green-600' : 'text-slate-400'}`}>
                          {isOn ? "MENYALA" : "SIAGA (OFF)"}
                        </p>
                      )}
                    </div>
                    <Badge variant={isAutoMode ? "default" : "outline"}>
                      {isAutoMode ? "Auto" : "Manual"}
                    </Badge>
                  </motion.div>

                  {/* Controls */}
                  <div className="space-y-4 mt-4">
                    <p className="text-sm font-medium text-slate-700 border-b pb-2">Kontrol Manual</p>
                    
                    {isDosingModule ? (
                      <div className="space-y-3">
                        <div className="grid gap-2">
                          <label className="text-xs font-bold text-muted-foreground uppercase tracking-tight">Takaran Dosis (ml)</label>
                          <div className="flex gap-2">
                            <Input 
                              type="number" 
                              value={dosageAmounts[module.id]} 
                              onChange={(e) => updateDosage(module.id, e.target.value)}
                              className="h-10 font-bold"
                              disabled={isAutoMode || isLoading}
                            />
                            <Button
                              variant="secondary"
                              className="flex-1 gap-2 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20"
                              disabled={isAutoMode || isLoading}
                              onClick={() => handleDosing(module.id)}
                            >
                              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                              Jalankan
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : module.id === "grow-light" ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            variant="default"
                            className="bg-green-600 hover:bg-green-700 gap-2"
                            disabled={isAutoMode || isOn || isLoading}
                            onClick={() => handleToggle(module.id, true)}
                          >
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                            Nyalakan
                          </Button>
                          <Button
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50 gap-2"
                            disabled={isAutoMode || !isOn || isLoading}
                            onClick={() => handleToggle(module.id, false)}
                          >
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Square className="w-4 h-4" />}
                            Matikan
                          </Button>
                        </div>
                        <div className="pt-2">
                          <p className="text-xs text-muted-foreground mb-2 flex justify-between">
                            <span>Intensitas Lampu</span>
                            <span>{lightIntensity}%</span>
                          </p>
                          <input
                            type="range" min="0" max="100"
                            value={lightIntensity}
                            onChange={e => setLightIntensity(Number(e.target.value))}
                            className="w-full accent-amber-500"
                            disabled={isAutoMode || isLoading}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="default"
                          className="bg-green-600 hover:bg-green-700 gap-2"
                          disabled={isAutoMode || isOn || isLoading}
                          onClick={() => handleToggle(module.id, true)}
                        >
                          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                          Nyalakan
                        </Button>
                        <Button
                          variant="outline"
                          className="text-red-600 border-red-200 hover:bg-red-50 gap-2"
                          disabled={isAutoMode || !isOn || isLoading}
                          onClick={() => handleToggle(module.id, false)}
                        >
                          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Square className="w-4 h-4" />}
                          Matikan
                        </Button>
                      </div>
                    )}
                    
                    <p className="text-[10px] text-center text-muted-foreground pt-1 italic">
                      Log: {module.lastAction}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
