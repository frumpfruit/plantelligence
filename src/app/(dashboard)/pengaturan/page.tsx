"use client"

import { useState, useTransition } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Save, Bell, Shield, Globe, Database, Smartphone, Key, Download, Cpu, Loader2, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ToastProvider"

// A reusable fake-save button
function SaveButton({ label = "Simpan Perubahan", section = "" }: { label?: string; section?: string }) {
  const [isPending, startTransition] = useTransition()
  const { showToast } = useToast()

  const handleSave = () => {
    startTransition(async () => {
      await new Promise(r => setTimeout(r, 1500))
      showToast(`${section ? section + ": " : ""}Perubahan berhasil disimpan!`, "success")
    })
  }

  return (
    <Button onClick={handleSave} disabled={isPending} className="w-full sm:w-auto">
      {isPending ? (
        <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Menyimpan...</>
      ) : (
        <><Save className="mr-2 h-4 w-4" />{label}</>
      )}
    </Button>
  )
}

// A stateful switch row
function SwitchRow({ label, description, defaultChecked = false, onToggle }: {
  label: string, description: string, defaultChecked?: boolean, onToggle?: (v: boolean) => void
}) {
  const [checked, setChecked] = useState(defaultChecked)
  const { showToast } = useToast()

  const handleChange = (val: boolean) => {
    setChecked(val)
    showToast(`${label} ${val ? "diaktifkan" : "dinonaktifkan"}.`, val ? "success" : "info")
    onToggle?.(val)
  }

  return (
    <div className="flex items-center justify-between space-x-2">
      <div className="flex flex-col space-y-1">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-xs text-muted-foreground">{description}</span>
      </div>
      <Switch checked={checked} onCheckedChange={handleChange} />
    </div>
  )
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("otomasi")
  const { showToast } = useToast()

  const tabs = [
    { id: "otomasi", label: "Aturan Otomasi", icon: Cpu },
    { id: "umum", label: "Umum", icon: Globe },
    { id: "notifikasi", label: "Notifikasi", icon: Bell },
    { id: "keamanan", label: "Keamanan", icon: Shield },
    { id: "penyimpanan", label: "Penyimpanan Data", icon: Database },
    { id: "integrasi", label: "Integrasi Perangkat", icon: Smartphone },
  ]

  const handleExport = (type: string) => {
    showToast(`Memulai ekspor data ke format ${type}...`, "info")
    setTimeout(() => showToast(`Data berhasil diekspor ke ${type}!`, "success"), 2000)
  }

  const handleRegenApiKey = () => {
    showToast("API Key baru sedang digenerate...", "info")
    setTimeout(() => showToast("API Key baru berhasil dibuat. Simpan sekarang!", "warning"), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Pengaturan Sistem</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Konfigurasi preferensi sistem, notifikasi, dan parameter otomasi perangkat.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigasi Pengaturan */}
        <div className="lg:col-span-1 space-y-1">
          {tabs.map(tab => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              className={cn("w-full justify-start font-medium", activeTab !== tab.id && "text-muted-foreground")}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className={cn("mr-2 h-4 w-4", activeTab === tab.id ? "" : "text-primary")} />
              <span className={activeTab === tab.id ? "font-bold" : ""}>{tab.label}</span>
            </Button>
          ))}
        </div>

        {/* Konten Pengaturan */}
        <div className="lg:col-span-3 space-y-6">

          {/* TAB OTOMASI */}
          {activeTab === "otomasi" && (
            <div className="space-y-6">
              <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg flex items-start gap-3">
                <Cpu className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold text-primary">Parameter Otomasi AI</h3>
                  <p className="text-sm text-primary/80 mt-1">
                    Aturan di bawah ini menentukan kapan alat menyala secara otomatis. Mode ini hanya aktif jika "Mode Otomatis Global" diaktifkan pada halaman Kontrol.
                  </p>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">1. Sirkulasi Pompa Air Utama</CardTitle>
                  <CardDescription>Menentukan siklus aliran air nutrisi ke tanaman.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Mode Sirkulasi</label>
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        <option value="timer">Berdasarkan Timer (Interval)</option>
                        <option value="sensor">Berdasarkan Sensor Kelembapan</option>
                        <option value="continuous">Menyala Terus Menerus (24/7)</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-2">
                    <div className="space-y-3">
                      <label className="text-[10px] sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider block">Durasi Menyala (Min)</label>
                      <Input type="number" defaultValue="15" className="w-full h-11" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider block">Durasi Mati (Min)</label>
                      <Input type="number" defaultValue="45" className="w-full h-11" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground italic">Contoh: Pompa akan menyala 15 menit, lalu mati 45 menit. Berlaku berulang.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">2. Injeksi Nutrisi (A & B)</CardTitle>
                  <CardDescription>Menjaga kepekatan nutrisi (TDS/EC) di dalam tandon.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-amber-600 uppercase tracking-wider">Batas Bawah TDS (Pemicu Nyala)</label>
                      <div className="flex items-center gap-2">
                        <Input type="number" defaultValue="800" className="h-11" />
                        <span className="text-sm text-muted-foreground w-12">PPM</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Jika TDS turun di bawah angka ini, pompa Nutrisi A & B akan memompa cairan baru.</p>
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">Target TDS (Pemicu Mati)</label>
                      <div className="flex items-center gap-2">
                        <Input type="number" defaultValue="1200" className="h-11" />
                        <span className="text-sm text-muted-foreground w-12">PPM</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Pompa akan berhenti ketika kepekatan air sudah mencapai target ini.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">3. Kestabilan pH Air</CardTitle>
                  <CardDescription>Menjaga agar akar dapat menyerap nutrisi secara optimal.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-rose-600 uppercase tracking-wider">Batas Maksimal pH (Terlalu Basa)</label>
                      <Input type="number" step="0.1" defaultValue="6.5" className="h-11" />
                      <p className="text-xs text-muted-foreground">Jika sensor pH &gt; 6.5, pompa <strong>pH Down</strong> akan menyala.</p>
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Batas Minimal pH (Terlalu Asam)</label>
                      <Input type="number" step="0.1" defaultValue="5.5" className="h-11" />
                      <p className="text-xs text-muted-foreground">Jika sensor pH &lt; 5.5, pompa <strong>pH Up</strong> akan menyala.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">4. Jadwal Pencahayaan (Grow Light)</CardTitle>
                  <CardDescription>Mengatur siklus siang/malam buatan untuk fotosintesis.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-3">
                      <label className="text-[10px] sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider block">Jam Menyala (Pagi)</label>
                      <Input type="time" defaultValue="06:00" className="w-full h-11 px-3" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider block">Jam Mati (Malam)</label>
                      <Input type="time" defaultValue="18:00" className="w-full h-11 px-3" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <SwitchRow
                      label="Auto-Redup Berdasarkan Sinar Matahari"
                      description="Jika farm memiliki atap tembus pandang, lampu akan mati jika cahaya matahari sudah cukup terang."
                      defaultChecked
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row justify-center sm:justify-end border-t p-6 gap-3">
                  <SaveButton label="Simpan Seluruh Parameter Otomasi" section="Otomasi" />
                </CardFooter>
              </Card>
            </div>
          )}

          {/* TAB UMUM */}
          {activeTab === "umum" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pengaturan Umum</CardTitle>
                  <CardDescription>Konfigurasi dasar untuk aplikasi Plantelligence Anda.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nama Pertanian / Proyek</label>
                    <Input defaultValue="Kebun Sayur Lembang" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Zona Waktu</label>
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                        <option value="asia/jakarta">Asia/Jakarta (WIB)</option>
                        <option value="asia/makassar">Asia/Makassar (WITA)</option>
                        <option value="asia/jayapura">Asia/Jayapura (WIT)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Format Tanggal</label>
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                        <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                        <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                        <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Bahasa Antarmuka</label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      <option value="id">Bahasa Indonesia</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t p-6">
                  <SaveButton section="Pengaturan Umum" />
                </CardFooter>
              </Card>
            </div>
          )}

          {/* TAB NOTIFIKASI */}
          {activeTab === "notifikasi" && (
            <Card>
              <CardHeader>
                <CardTitle>Preferensi Notifikasi</CardTitle>
                <CardDescription>Pilih peringatan apa yang ingin Anda terima dan bagaimana caranya.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <SwitchRow label="Peringatan Suhu Ekstrem" description="Kirimkan notifikasi jika suhu di luar batas normal." defaultChecked />
                <div className="border-t pt-4">
                  <SwitchRow label="Status Kelembapan Tanah" description="Peringatan otomatis saat tanah perlu disiram." defaultChecked />
                </div>
                <div className="border-t pt-4">
                  <SwitchRow label="Laporan Mingguan" description="Kirimkan ringkasan performa kebun setiap minggu via Email." defaultChecked />
                </div>
                <div className="border-t pt-4">
                  <SwitchRow label="Notifikasi SMS" description="Kirimkan peringatan kritis via SMS ke nomor yang terdaftar." />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t p-6">
                <SaveButton section="Notifikasi" />
              </CardFooter>
            </Card>
          )}

          {/* TAB KEAMANAN */}
          {activeTab === "keamanan" && (
            <Card>
              <CardHeader>
                <CardTitle>Keamanan Sistem</CardTitle>
                <CardDescription>Kelola pengaturan keamanan tingkat lanjut dan sesi aktif.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <SwitchRow label="Autentikasi Dua Faktor (2FA)" description="Tingkatkan keamanan akun Anda dengan verifikasi dua langkah." />
                <div className="border-t pt-4">
                  <SwitchRow label="Paksa Logout Setelah Inaktif" description="Otomatis mengeluarkan pengguna setelah 30 menit tidak aktif." defaultChecked />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t p-6">
                <SaveButton section="Keamanan" />
              </CardFooter>
            </Card>
          )}

          {/* TAB PENYIMPANAN */}
          {activeTab === "penyimpanan" && (
            <Card>
              <CardHeader>
                <CardTitle>Penyimpanan Data & Retensi</CardTitle>
                <CardDescription>Kelola bagaimana data sensor disimpan dan diekspor.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Periode Retensi Data Sensor</label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <option value="30">30 Hari (Default)</option>
                    <option value="90">90 Hari</option>
                    <option value="365">1 Tahun</option>
                  </select>
                  <p className="text-xs text-muted-foreground">Data lebih lama dari periode ini akan diarsipkan secara otomatis.</p>
                </div>
                <div className="pt-4 border-t space-y-4">
                  <h4 className="text-sm font-medium">Export Data Log</h4>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => handleExport("CSV")}>
                      <Download className="mr-2 h-4 w-4" /> Export CSV
                    </Button>
                    <Button variant="outline" onClick={() => handleExport("PDF")}>
                      <Download className="mr-2 h-4 w-4" /> Export PDF
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t p-6">
                <SaveButton section="Penyimpanan" />
              </CardFooter>
            </Card>
          )}

          {/* TAB INTEGRASI */}
          {activeTab === "integrasi" && (
            <Card>
              <CardHeader>
                <CardTitle>Integrasi & API</CardTitle>
                <CardDescription>Hubungkan sensor IoT eksternal atau aplikasi pihak ketiga.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status Gateway IoT</label>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                    <span className="text-sm font-medium">Terhubung (Ping: 24ms)</span>
                  </div>
                </div>
                <div className="pt-4 border-t space-y-2">
                  <label className="text-sm font-medium">API Key (Read/Write)</label>
                  <div className="flex gap-2">
                    <Input type="password" defaultValue="pk_live_51HXXXXXXXXXXXXX" readOnly />
                    <Button variant="secondary" onClick={handleRegenApiKey}>
                      <RefreshCw className="mr-2 h-4 w-4" /> Regenerate
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Gunakan kunci ini untuk mengirim data dari custom microcontroller (Arduino/ESP32).</p>
                </div>
                <div className="pt-4 border-t space-y-2">
                  <label className="text-sm font-medium">Webhook URL Event Alert</label>
                  <Input defaultValue="https://my-domain.com/webhook/plantelligence" />
                  <p className="text-xs text-muted-foreground">Sistem akan melakukan HTTP POST ke URL ini saat ada alert kritis.</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t p-6">
                <SaveButton label="Simpan Konfigurasi Integrasi" section="Integrasi" />
              </CardFooter>
            </Card>
          )}

        </div>
      </div>
    </div>
  )
}
