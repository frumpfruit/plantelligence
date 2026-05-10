"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, AlertTriangle, Info, CheckCircle2, Trash2, Check, Loader2, ExternalLink } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/components/ToastProvider"
import { useSensors } from "@/components/SensorProvider"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function NotificationPage() {
  const { notifications, deleteNotification, toggleHandled } = useSensors()
  const [filter, setFilter] = useState("all")
  const [isClearing, setIsClearing] = useState(false)
  const { showToast } = useToast()

  const filteredNotifs = useMemo(() => {
    return notifications.filter(n => {
      if (filter === "all") return true
      if (filter === "pending") return !n.handled
      return n.type === filter
    })
  }, [notifications, filter])

  const getIcon = (type: string) => {
    switch (type) {
      case "critical": return AlertCircle
      case "warning": return AlertTriangle
      case "success": return CheckCircle2
      default: return Info
    }
  }

  const getColorClass = (type: string) => {
    switch (type) {
      case "critical": return "text-destructive bg-destructive/10"
      case "warning": return "text-warning bg-warning/10"
      case "success": return "text-success bg-success/10"
      default: return "text-info bg-info/10"
    }
  }

  const handleClearAll = () => {
    setIsClearing(true)
    setTimeout(() => {
      notifications.forEach(n => deleteNotification(n.id))
      setIsClearing(false)
      showToast("Semua notifikasi dibersihkan.", "success")
    }, 1000)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifikasi</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Riwayat peringatan dan log aktivitas sistem hidroponik.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-muted p-1 rounded-lg">
            <Button 
              variant={filter === "all" ? "secondary" : "ghost"} 
              size="sm" 
              onClick={() => setFilter("all")}
              className="h-8 text-xs px-3"
            >
              Semua
            </Button>
            <Button 
              variant={filter === "pending" ? "secondary" : "ghost"} 
              size="sm" 
              onClick={() => setFilter("pending")}
              className="h-8 text-xs px-3 text-warning"
            >
              Pending
            </Button>
            <Button 
              variant={filter === "critical" ? "secondary" : "ghost"} 
              size="sm" 
              onClick={() => setFilter("critical")}
              className="h-8 text-xs px-3 text-destructive"
            >
              Kritis
            </Button>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 text-xs" 
            onClick={handleClearAll}
            disabled={notifications.length === 0 || isClearing}
          >
            {isClearing ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <Trash2 className="h-3 w-3 mr-1" />}
            Hapus Semua
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            <AnimatePresence mode="popLayout">
              {filteredNotifs.length > 0 ? filteredNotifs.map((notif) => {
                const Icon = getIcon(notif.type)
                const colorClass = getColorClass(notif.type)
                
                return (
                  <motion.div 
                    key={notif.id}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className={cn(
                      "p-4 flex gap-4 group transition-colors",
                      notif.handled ? "opacity-60 bg-muted/20" : notif.read ? "bg-background" : "bg-primary/5"
                    )}
                  >
                    <div className={cn(
                      "mt-0.5 h-10 w-10 shrink-0 rounded-full flex items-center justify-center",
                      colorClass
                    )}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <p className={cn(
                              "text-sm font-medium leading-none",
                              notif.handled ? "text-muted-foreground line-through" : "text-foreground font-semibold"
                            )}>
                              {notif.title}
                            </p>
                            <Badge variant={notif.handled ? "success" : "secondary"} className="h-4 text-[9px] px-1.5 uppercase tracking-wider">
                              {notif.handled ? "Selesai" : "Pending"}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{notif.message}</p>
                        </div>
                        <div className="flex opacity-0 group-hover:opacity-100 transition-opacity gap-1 ml-4">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className={cn(
                              "h-7 w-7 rounded-full",
                              notif.handled ? "text-muted-foreground hover:bg-muted" : "text-success hover:bg-success/10"
                            )} 
                            onClick={() => toggleHandled(notif.id)}
                            title={notif.handled ? "Batalkan Selesai" : "Tandai Selesai"}
                          >
                            <Check className={cn("h-3.5 w-3.5", notif.handled && "opacity-50")} />
                          </Button>
                          {notif.plantId && (
                            <Link href={`/tanaman/${notif.plantId}`}>
                              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full text-primary hover:bg-primary/10">
                                <ExternalLink className="h-3.5 w-3.5" />
                              </Button>
                            </Link>
                          )}
                          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full text-destructive hover:bg-destructive/10" onClick={() => deleteNotification(notif.id)}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{notif.time}</p>
                    </div>
                  </motion.div>
                )
              }) : (
                <div key="empty" className="p-12 text-center text-muted-foreground italic">
                  Tidak ada notifikasi baru.
                </div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
