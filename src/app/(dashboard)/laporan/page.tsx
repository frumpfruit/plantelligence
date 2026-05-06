"use client"

import { useState, useTransition } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Download, Filter, Search, Loader2, FileSpreadsheet, FileText } from "lucide-react"
import { useToast } from "@/components/ToastProvider"

// Dummy Data
const initialReportData = [
  { id: "REP-001", date: "04 Mei 2026 10:30", type: "Penyiraman", detail: "Pompa Air Utama aktif selama 5 menit", status: "Sukses", user: "Sistem Otomatis" },
  { id: "REP-002", date: "04 Mei 2026 09:15", type: "Nutrisi", detail: "Dosing Nutrisi A (50ml) dan B (50ml)", status: "Sukses", user: "Sistem Otomatis" },
  { id: "REP-003", date: "03 Mei 2026 22:00", type: "Peringatan", detail: "Suhu ruang melewati batas atas (32°C)", status: "Warning", user: "Sensor Suhu" },
  { id: "REP-004", date: "03 Mei 2026 18:45", type: "Manual Override", detail: "Pompa pH Down diaktifkan manual", status: "Sukses", user: "Ahmad Reza" },
  { id: "REP-005", date: "03 Mei 2026 14:20", type: "Sistem", detail: "Kalibrasi sensor kelembapan tanah", status: "Sukses", user: "Sistem Otomatis" },
  { id: "REP-006", date: "02 Mei 2026 08:00", type: "Panen", detail: "Panen Selada Blok A (120kg)", status: "Sukses", user: "Ahmad Reza" },
  { id: "REP-007", date: "01 Mei 2026 11:10", type: "Error", detail: "Koneksi ke Gateway IoT terputus", status: "Gagal", user: "Sistem" },
]

export default function ReportPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isExportingCSV, startExportCSV] = useTransition()
  const [isExportingPDF, startExportPDF] = useTransition()
  const { showToast } = useToast()

  const filteredData = initialReportData.filter(item => 
    item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.detail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.user.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleExport = (type: 'CSV' | 'PDF') => {
    const start = type === 'CSV' ? startExportCSV : startExportPDF
    start(async () => {
      showToast(`Menyiapkan file ${type}...`, "info")
      await new Promise(r => setTimeout(r, 2000))
      showToast(`Laporan berhasil di-export ke ${type}!`, "success")
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Laporan Sistem</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Lihat riwayat aktivitas, peringatan, dan eksport data untuk analisis.
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button 
            variant="outline" 
            className="flex-1 sm:flex-none" 
            onClick={() => handleExport('CSV')}
            disabled={isExportingCSV}
          >
            {isExportingCSV ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileSpreadsheet className="mr-2 h-4 w-4" />}
            Export CSV
          </Button>
          <Button 
            className="flex-1 sm:flex-none" 
            onClick={() => handleExport('PDF')}
            disabled={isExportingPDF}
          >
            {isExportingPDF ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileText className="mr-2 h-4 w-4" />}
            Export PDF
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>Riwayat Aktivitas & Log</CardTitle>
              <CardDescription>Semua event yang terjadi pada sistem dalam 30 hari terakhir.</CardDescription>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Cari laporan..." 
                  className="pl-8" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[100px]">ID Laporan</TableHead>
                  <TableHead>Waktu</TableHead>
                  <TableHead>Jenis Event</TableHead>
                  <TableHead className="w-[300px]">Detail Aktivitas</TableHead>
                  <TableHead>Inisiator</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? filteredData.map((report) => (
                  <TableRow key={report.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-mono text-xs">{report.id}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{report.date}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-normal">{report.type}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{report.detail}</TableCell>
                    <TableCell className="text-sm">{report.user}</TableCell>
                    <TableCell className="text-right">
                      <Badge 
                        variant={
                          report.status === "Sukses" ? "success" : 
                          report.status === "Warning" ? "warning" : 
                          "destructive"
                        }
                      >
                        {report.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground italic">
                      Tidak ada laporan yang sesuai dengan pencarian.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="text-sm text-muted-foreground">
              Menampilkan <strong>{filteredData.length}</strong> dari <strong>142</strong> laporan
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" disabled>
                Sebelumnya
              </Button>
              <Button variant="outline" size="sm">
                Selanjutnya
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
