"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertCircle, AlertTriangle, Info, CheckCircle2, Trash2, Check, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/components/ToastProvider"

const initialNotifications = [
  {
    id: 1,
    type: "critical",
    title: "pH air terlalu rendah (4.9), segera lakukan penyesuaian",
    time: "10 menit yang lalu",
    icon: AlertCircle,
    color: "text-destructive",
    bg: "bg-destructive/10",
    read: false
  },
  {
    id: 2,
    type: "warning",
    title: "Nutrisi mendekati batas minimum",
    time: "2 jam yang lalu",
    icon: AlertTriangle,
    color: "text-warning",
    bg: "bg-warning/10",
    read: false
  },
  {
    id: 3,
    type: "success",
    title: "Tanaman 'Selada A' berhasil ditambahkan",
    time: "4 jam yang lalu",
    icon: CheckCircle2,
    color: "text-success",
    bg: "bg-success/10",
    read: true
  },
  {
    id: 4,
    type: "info",
    title: "Data sensor berhasil diperbarui",
    time: "5 jam yang lalu",
    icon: Info,
    color: "text-info",
    bg: "bg-info/10",
    read: true
  },
]

export default function NotificationPage() {
  const [notifs, setNotifs] = useState(initialNotifications)
  const [filter, setFilter] = useState("all")
  const [isClearing, setIsClearing] = useState(false)
  const { showToast } = useToast()

  const filteredNotifs = notifs.filter(n => {
    if (filter === "all") return true
    return n.type === filter
  })

  const markAsRead = (id: number) => {
    setNotifs(notifs.map(n => n.id === id ? { ...n, read: true } : n))
    showToast("Notifikasi ditandai sebagai dibaca.", "info")
  }

  const deleteNotif = (id: number) => {
    setNotifs(notifs.filter(n => n.id !== id))
    showToast("Notifikasi dihapus.", "success")
  }

  const clearAll = () => {
    setIsClearing(true)
    setTimeout(() => {
      setNotifs([])
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
            onClick={clearAll}
            disabled={notifs.length === 0 || isClearing}
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
              {filteredNotifs.length > 0 ? filteredNotifs.map((notif) => (
                <motion.div 
                  key={notif.id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`p-4 flex gap-4 group transition-colors ${notif.read ? 'opacity-70 bg-background' : 'bg-primary/5'}`}
                >
                  <div className={`mt-0.5 h-10 w-10 shrink-0 rounded-full ${notif.bg} flex items-center justify-center ${notif.color}`}>
                    <notif.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <p className={`text-sm font-medium leading-none ${notif.read ? 'text-muted-foreground' : 'text-foreground font-semibold'}`}>
                        {notif.title}
                      </p>
                      <div className="flex opacity-0 group-hover:opacity-100 transition-opacity gap-1 ml-4">
                        {!notif.read && (
                          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full text-primary hover:bg-primary/10" onClick={() => markAsRead(notif.id)}>
                            <Check className="h-3.5 w-3.5" />
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full text-destructive hover:bg-destructive/10" onClick={() => deleteNotif(notif.id)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{notif.time}</p>
                  </div>
                </motion.div>
              )) : (
                <div className="p-12 text-center text-muted-foreground italic">
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
