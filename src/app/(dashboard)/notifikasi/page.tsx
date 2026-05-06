import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, AlertTriangle, Info, CheckCircle2 } from "lucide-react"

const notifications = [
  {
    id: 1,
    type: "critical",
    title: "pH air terlalu rendah (4.9), segera lakukan penyesuaian",
    time: "10 menit yang lalu",
    icon: AlertCircle,
    color: "text-destructive",
    bg: "bg-destructive/10"
  },
  {
    id: 2,
    type: "warning",
    title: "Nutrisi mendekati batas minimum",
    time: "2 jam yang lalu",
    icon: AlertTriangle,
    color: "text-warning",
    bg: "bg-warning/10"
  },
  {
    id: 3,
    type: "success",
    title: "Tanaman 'Selada A' berhasil ditambahkan",
    time: "4 jam yang lalu",
    icon: CheckCircle2,
    color: "text-success",
    bg: "bg-success/10"
  },
  {
    id: 4,
    type: "info",
    title: "Data sensor berhasil diperbarui",
    time: "5 jam yang lalu",
    icon: Info,
    color: "text-info",
    bg: "bg-info/10"
  },
  {
    id: 5,
    type: "critical",
    title: "Pompa air utama mati secara tak terduga",
    time: "1 hari yang lalu",
    icon: AlertCircle,
    color: "text-destructive",
    bg: "bg-destructive/10"
  },
  {
    id: 6,
    type: "warning",
    title: "Suhu ruangan mulai naik melewati 28°C",
    time: "1 hari yang lalu",
    icon: AlertTriangle,
    color: "text-warning",
    bg: "bg-warning/10"
  },
]

export default function NotificationPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifikasi</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Riwayat peringatan dan log aktivitas sistem hidroponik.
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="cursor-pointer hover:bg-muted">Semua</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-destructive/10 text-destructive border-transparent">Critical</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-warning/10 text-warning border-transparent">Warning</Badge>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {notifications.map((notif) => (
              <div key={notif.id} className="p-4 flex gap-4 hover:bg-muted/50 transition-colors">
                <div className={`mt-0.5 h-10 w-10 shrink-0 rounded-full ${notif.bg} flex items-center justify-center ${notif.color}`}>
                  <notif.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{notif.title}</p>
                  <p className="text-xs text-muted-foreground">{notif.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
