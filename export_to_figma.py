
import os

# Configuration
PAGES = [
    "dashboard", "kontrol", "analitik", "monitoring", 
    "laporan", "notifikasi", "tanaman", "tambah_tanaman", 
    "pengaturan", "profil"
]

BASE_DIR = r"c:\Users\anonns\.gemini\antigravity\scratch\plantelligence\figma_export"
os.makedirs(BASE_DIR, exist_ok=True)

# Shared HTML Header
HEADER = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} - Plantelligence</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: { DEFAULT: '#2E7D32', foreground: '#ffffff' },
                        secondary: { DEFAULT: '#66BB6A', foreground: '#ffffff' },
                        muted: { DEFAULT: '#f4f4f5', foreground: '#71717a' },
                        card: { DEFAULT: '#ffffff', foreground: '#09090b' },
                        border: '#e4e4e7',
                        background: '#f4f4f5',
                        foreground: '#09090b',
                        success: '#43A047',
                        warning: '#FB8C00',
                        info: '#1E88E5',
                        destructive: '#E53935',
                        light: '#E8F5E9',
                    },
                    borderRadius: { lg: '0.5rem', md: 'calc(0.5rem - 2px)', sm: 'calc(0.5rem - 4px)' }
                }
            }
        }
    </script>
    <style>
        body { 
            font-family: 'Inter', sans-serif; 
            width: 1440px; 
            min-height: 900px; 
            margin: 0 auto;
            background-color: #f4f4f5;
            position: relative;
            overflow-x: hidden;
        }
        .sidebar-active { color: #2E7D32; font-weight: 600; background-color: #f4f4f5; border-right: 4px solid #2E7D32; }
    </style>
</head>
<body class="bg-background text-foreground">
    <!-- Sidebar -->
    <aside class="fixed left-[calc(50%-720px)] top-0 z-50 h-screen w-[240px] border-r bg-card">
        <div class="flex h-[80px] items-center border-b px-6">
            <div class="flex items-center gap-2">
                <div class="bg-primary p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Z"/><path d="m9 12 2 2 4-4"/></svg>
                </div>
                <span class="text-xl font-bold text-primary tracking-tight">Plantelligence</span>
            </div>
        </div>
        <nav class="p-4 space-y-2">
            <a href="dashboard.html" class="{dashboard_active} flex items-center gap-3 px-3 py-2 rounded-lg transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/></svg>
                <span>Dashboard</span>
            </a>
            <a href="monitoring.html" class="{monitoring_active} flex items-center gap-3 px-3 py-2 rounded-lg transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                <span>Monitoring</span>
            </a>
            <a href="kontrol.html" class="{kontrol_active} flex items-center gap-3 px-3 py-2 rounded-lg transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
                <span>Kontrol</span>
            </a>
            <a href="analitik.html" class="{analitik_active} flex items-center gap-3 px-3 py-2 rounded-lg transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                <span>Analitik</span>
            </a>
            <a href="tanaman.html" class="{tanaman_active} flex items-center gap-3 px-3 py-2 rounded-lg transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.09c.35 0 .68.14.94.39l7.42 7.42c.25.26.39.59.39.94v10.16c0 .55-.45 1-1 1H4.25c-.55 0-1-.45-1-1V10.84c0-.35.14-.68.39-.94l7.42-7.42c.26-.25.59-.39.94-.39Z"/></svg>
                <span>Tanaman</span>
            </a>
            <a href="laporan.html" class="{laporan_active} flex items-center gap-3 px-3 py-2 rounded-lg transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                <span>Laporan</span>
            </a>
            <div class="pt-4 mt-4 border-t px-3">
                <p class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Personal</p>
                <a href="notifikasi.html" class="{notifikasi_active} flex items-center gap-3 px-3 py-2 rounded-lg transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
                    <span>Notifikasi</span>
                </a>
                <a href="pengaturan.html" class="{pengaturan_active} flex items-center gap-3 px-3 py-2 rounded-lg transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                    <span>Pengaturan</span>
                </a>
            </div>
        </nav>
    </aside>

    <!-- Topbar -->
    <header class="fixed left-[calc(50%-720px+240px)] top-0 z-30 flex h-[80px] w-[1200px] items-center justify-between border-b bg-card/80 px-8 backdrop-blur-md">
        <h2 class="text-xl font-bold tracking-tight">{title}</h2>
        <div class="flex items-center gap-6">
            <div class="flex items-center gap-2 bg-success/10 text-success px-4 py-1.5 rounded-full text-xs font-bold border border-success/20">
                <div class="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                SISTEM ONLINE
            </div>
            <div class="flex items-center gap-3">
                <div class="text-right hidden md:block">
                    <p class="text-sm font-bold">Admin Farm</p>
                    <p class="text-xs text-muted-foreground">Premium Plan</p>
                </div>
                <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">A</div>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="ml-[240px] pt-[80px] min-h-screen">
        <div class="p-8 max-w-7xl mx-auto">
"""

FOOTER = """
        </div>
    </main>
</body>
</html>
"""

def generate_page(name, title, content):
    filename = os.path.join(BASE_DIR, f"{name}.html")
    
    html = HEADER
    for p in PAGES:
        placeholder = f"{{{p}_active}}"
        value = "sidebar-active" if p == name else "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
        # Special handling for tambah_tanaman which should highlight tanaman
        if name == "tambah_tanaman" and p == "tanaman":
            value = "sidebar-active"
        html = html.replace(placeholder, value)
        
    html = html.replace("{title}", title)
    
    with open(filename, "w", encoding="utf-8") as f:
        f.write(html)
        f.write(content)
        f.write(FOOTER)

# Page Contents (Simplified for Figma)
DASHBOARD_CONTENT = """
<div class="space-y-8">
    <div class="grid grid-cols-4 gap-6">
        <div class="bg-card border rounded-2xl p-6 shadow-sm"><p class="text-sm font-medium text-muted-foreground mb-2">Suhu</p><h3 class="text-3xl font-bold">28.4°C</h3><p class="text-xs text-success mt-2">↑ 0.2° Normal</p></div>
        <div class="bg-card border rounded-2xl p-6 shadow-sm"><p class="text-sm font-medium text-muted-foreground mb-2">Humidity</p><h3 class="text-3xl font-bold">65%</h3><p class="text-xs text-success mt-2">Optimal</p></div>
        <div class="bg-card border rounded-2xl p-6 shadow-sm"><p class="text-sm font-medium text-muted-foreground mb-2">Nutrisi</p><h3 class="text-3xl font-bold">1120 <span class="text-sm">PPM</span></h3><p class="text-xs text-warning mt-2">Perlu Injeksi</p></div>
        <div class="bg-card border rounded-2xl p-6 shadow-sm"><p class="text-sm font-medium text-muted-foreground mb-2">pH Level</p><h3 class="text-3xl font-bold">6.2</h3><p class="text-xs text-success mt-2">Stabil</p></div>
    </div>
    <div class="grid grid-cols-3 gap-6">
        <div class="col-span-2 bg-card border rounded-2xl p-8 h-[400px] flex items-center justify-center bg-muted/10">
            <p class="text-muted-foreground font-medium text-lg text-center">Trend Grafik Pertumbuhan & Nutrisi<br><span class="text-xs">Placeholder Visualisasi Data</span></p>
        </div>
        <div class="bg-card border rounded-2xl p-6">
            <h4 class="font-bold mb-6">Status Tanaman</h4>
            <div class="space-y-6">
                <div class="flex gap-4 items-center">
                    <div class="w-12 h-12 bg-primary/10 rounded-xl"></div>
                    <div class="flex-1"><p class="font-bold text-sm">Selada Hidroponik</p><div class="w-full h-1.5 bg-muted rounded-full mt-2"><div class="w-[75%] h-full bg-primary rounded-full"></div></div></div>
                </div>
                <div class="flex gap-4 items-center">
                    <div class="w-12 h-12 bg-primary/10 rounded-xl"></div>
                    <div class="flex-1"><p class="font-bold text-sm">Pakcoy Hijau</p><div class="w-full h-1.5 bg-muted rounded-full mt-2"><div class="w-[40%] h-full bg-warning rounded-full"></div></div></div>
                </div>
            </div>
        </div>
    </div>
</div>
"""

KONTROL_CONTENT = """
<div class="space-y-6">
    <div class="p-6 bg-primary/5 border-2 border-primary/20 rounded-2xl flex justify-between items-center">
        <div class="flex gap-4">
            <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg></div>
            <div><h3 class="font-bold text-lg">Smart Automation Aktif</h3><p class="text-sm text-muted-foreground">Sistem dikelola oleh AI secara real-time.</p></div>
        </div>
        <button class="bg-card border px-6 py-2 rounded-xl font-bold shadow-sm">Matikan Auto</button>
    </div>
    <div class="grid grid-cols-3 gap-8">
        <div class="bg-card border rounded-2xl overflow-hidden">
            <div class="p-6 border-b flex justify-between items-center"><h4 class="font-bold">Water Pump</h4><div class="w-12 h-6 bg-primary rounded-full relative"><div class="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div></div>
            <div class="p-6 space-y-6"><div class="flex justify-between items-center"><span class="text-sm">Status</span><span class="text-sm font-bold text-success">MENYALA</span></div><button class="w-full py-3 bg-muted text-muted-foreground rounded-xl font-bold cursor-not-allowed">Kontrol Terkunci</button></div>
        </div>
        <div class="bg-card border rounded-2xl overflow-hidden">
            <div class="p-6 border-b flex justify-between items-center"><h4 class="font-bold">Grow Light</h4><div class="w-12 h-6 bg-muted rounded-full relative"><div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div></div></div>
            <div class="p-6 space-y-6"><div class="flex justify-between items-center"><span class="text-sm">Status</span><span class="text-sm font-bold text-muted-foreground">MATI</span></div><button class="w-full py-3 bg-muted text-muted-foreground rounded-xl font-bold cursor-not-allowed">Kontrol Terkunci</button></div>
        </div>
        <div class="bg-card border rounded-2xl overflow-hidden">
            <div class="p-6 border-b flex justify-between items-center"><h4 class="font-bold">Nutrisi A & B</h4><div class="w-12 h-6 bg-muted rounded-full relative"><div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div></div></div>
            <div class="p-6 space-y-6"><div class="flex justify-between items-center"><span class="text-sm">Status</span><span class="text-sm font-bold text-muted-foreground">READY</span></div><button class="w-full py-3 bg-muted text-muted-foreground rounded-xl font-bold cursor-not-allowed">Kontrol Terkunci</button></div>
        </div>
    </div>
</div>
"""

ANALITIK_CONTENT = """
<div class="space-y-8">
    <div class="grid grid-cols-4 gap-6">
        <div class="bg-card border rounded-2xl p-6 shadow-sm"><p class="text-sm font-medium text-muted-foreground mb-1">Total Panen (Kg)</p><h3 class="text-3xl font-bold">1,420</h3></div>
        <div class="bg-card border rounded-2xl p-6 shadow-sm"><p class="text-sm font-medium text-muted-foreground mb-1">Efisiensi Air</p><h3 class="text-3xl font-bold">94%</h3></div>
        <div class="bg-card border rounded-2xl p-6 shadow-sm"><p class="text-sm font-medium text-muted-foreground mb-1">Kesehatan Rata-rata</p><h3 class="text-3xl font-bold">9.2/10</h3></div>
        <div class="bg-card border rounded-2xl p-6 shadow-sm"><p class="text-sm font-medium text-muted-foreground mb-1">Penghematan Biaya</p><h3 class="text-3xl font-bold">24%</h3></div>
    </div>
    <div class="bg-card border rounded-2xl p-8 h-[500px] flex items-center justify-center bg-muted/10">
        <p class="text-muted-foreground font-bold text-xl">Grafik Analitik Lanjutan (Produksi vs Biaya)<br><span class="text-sm font-normal">Visualisasi data interaktif</span></p>
    </div>
</div>
"""

MONITORING_CONTENT = """
<div class="space-y-6">
    <div class="grid grid-cols-2 gap-8">
        <div class="bg-card border rounded-2xl overflow-hidden h-[400px]">
            <div class="p-4 border-b font-bold flex justify-between items-center"><span>Kamera 01 - Rak A</span><span class="text-red-500 flex items-center gap-2"><div class="w-2 h-2 bg-red-500 rounded-full"></div> LIVE</span></div>
            <div class="flex-1 bg-black flex items-center justify-center h-full text-white/50 italic">Feed Kamera CCTV Real-time</div>
        </div>
        <div class="bg-card border rounded-2xl overflow-hidden h-[400px]">
            <div class="p-4 border-b font-bold flex justify-between items-center"><span>Kamera 02 - Tandon</span><span class="text-red-500 flex items-center gap-2"><div class="w-2 h-2 bg-red-500 rounded-full"></div> LIVE</span></div>
            <div class="flex-1 bg-black flex items-center justify-center h-full text-white/50 italic">Feed Kamera CCTV Real-time</div>
        </div>
    </div>
    <div class="bg-card border rounded-2xl p-6">
        <h4 class="font-bold mb-4">Log Sensor Terkini</h4>
        <div class="space-y-4">
            <div class="flex justify-between items-center border-b pb-4"><span class="text-sm">Sensor Suhu Air</span><span class="font-mono text-sm">24.5°C</span><span class="text-xs text-success bg-success/10 px-2 py-1 rounded">Normal</span></div>
            <div class="flex justify-between items-center border-b pb-4"><span class="text-sm">Sensor EC/Nutrisi</span><span class="font-mono text-sm">1.8 mS/cm</span><span class="text-xs text-success bg-success/10 px-2 py-1 rounded">Normal</span></div>
            <div class="flex justify-between items-center border-b pb-4"><span class="text-sm">Sensor Ultrasonic (Air)</span><span class="font-mono text-sm">85% Full</span><span class="text-xs text-success bg-success/10 px-2 py-1 rounded">Normal</span></div>
        </div>
    </div>
</div>
"""

LAPORAN_CONTENT = """
<div class="space-y-6">
    <div class="bg-card border rounded-2xl p-6">
        <div class="flex justify-between items-center mb-8">
            <h3 class="font-bold text-lg">Log Aktivitas Sistem</h3>
            <div class="flex gap-3">
                <button class="px-4 py-2 border rounded-xl text-sm font-bold">Filter Tanggal</button>
                <button class="px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold">Export PDF</button>
            </div>
        </div>
        <table class="w-full text-left">
            <thead><tr class="border-b text-muted-foreground text-sm uppercase tracking-widest"><th class="pb-4 font-bold">ID</th><th class="pb-4 font-bold">Waktu</th><th class="pb-4 font-bold">Aktivitas</th><th class="pb-4 font-bold">Status</th></tr></thead>
            <tbody class="text-sm">
                <tr class="border-b"><td class="py-4">LOG-991</td><td class="py-4">04/05/2026 10:20</td><td class="py-4">Auto-Dosing Nutrisi A</td><td class="py-4"><span class="px-2 py-1 bg-success/10 text-success rounded text-[10px] font-bold">SUCCESS</span></td></tr>
                <tr class="border-b"><td class="py-4">LOG-990</td><td class="py-4">04/05/2026 09:45</td><td class="py-4">Manual Pump Start (Admin)</td><td class="py-4"><span class="px-2 py-1 bg-success/10 text-success rounded text-[10px] font-bold">SUCCESS</span></td></tr>
                <tr class="border-b"><td class="py-4">LOG-989</td><td class="py-4">04/05/2026 08:00</td><td class="py-4">Low Water Warning</td><td class="py-4"><span class="px-2 py-1 bg-warning/10 text-warning rounded text-[10px] font-bold">WARNING</span></td></tr>
            </tbody>
        </table>
    </div>
</div>
"""

TANAMAN_CONTENT = """
<div class="space-y-6">
    <div class="flex justify-between items-center">
        <div class="relative w-[400px]"><input type="text" placeholder="Cari tanaman..." class="w-full h-11 border rounded-xl px-10"><div class="absolute left-4 top-3 text-muted-foreground">🔍</div></div>
        <a href="tambah_tanaman.html" class="px-6 py-2.5 bg-primary text-white rounded-xl font-bold shadow-sm">+ Tambah Tanaman</a>
    </div>
    <div class="grid grid-cols-4 gap-6">
        <div class="bg-card border rounded-2xl overflow-hidden group">
            <div class="h-[200px] bg-muted group-hover:opacity-90 transition-opacity"></div>
            <div class="p-6">
                <h4 class="font-bold">Selada Keriting</h4>
                <p class="text-xs text-muted-foreground mb-4">Blok A-1 | 24 Tanaman</p>
                <div class="flex justify-between items-center"><span class="text-xs font-bold text-success bg-success/10 px-2 py-1 rounded">21 Hari</span><button class="text-xs font-bold text-primary">Detail →</button></div>
            </div>
        </div>
        <div class="bg-card border rounded-2xl overflow-hidden group">
            <div class="h-[200px] bg-muted group-hover:opacity-90 transition-opacity"></div>
            <div class="p-6">
                <h4 class="font-bold">Pakcoy Putih</h4>
                <p class="text-xs text-muted-foreground mb-4">Blok B-3 | 32 Tanaman</p>
                <div class="flex justify-between items-center"><span class="text-xs font-bold text-warning bg-warning/10 px-2 py-1 rounded">12 Hari</span><button class="text-xs font-bold text-primary">Detail →</button></div>
            </div>
        </div>
    </div>
</div>
"""

# ... other contents following similar pattern ...

def run():
    generate_page("dashboard", "Dashboard", DASHBOARD_CONTENT)
    generate_page("kontrol", "Kontrol Sistem", KONTROL_CONTENT)
    generate_page("analitik", "Analitik & Performa", ANALITIK_CONTENT)
    generate_page("monitoring", "Monitoring Kamera", MONITORING_CONTENT)
    generate_page("laporan", "Laporan & Log", LAPORAN_CONTENT)
    generate_page("tanaman", "Daftar Tanaman", TANAMAN_CONTENT)
    
    # Notifikasi
    NOTIFIKASI_CONTENT = """
    <div class="space-y-4 max-w-4xl">
        <div class="bg-card border rounded-2xl p-6 flex gap-4 border-l-4 border-l-destructive">
            <div class="w-10 h-10 bg-destructive/10 text-destructive rounded-full flex items-center justify-center shrink-0">⚠️</div>
            <div class="flex-1"><h4 class="font-bold">Suhu Ruangan Tinggi!</h4><p class="text-sm text-muted-foreground">Suhu mencapai 32.5°C di Blok A. Disarankan mengecek sirkulasi udara.</p><p class="text-[10px] text-muted-foreground mt-2">15 Menit yang lalu</p></div>
            <button class="text-xs font-bold text-muted-foreground">Tandai Dibaca</button>
        </div>
        <div class="bg-card border rounded-2xl p-6 flex gap-4 border-l-4 border-l-primary">
            <div class="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">✅</div>
            <div class="flex-1"><h4 class="font-bold">Injeksi Nutrisi Selesai</h4><p class="text-sm text-muted-foreground">Target TDS 1200 PPM telah tercapai di Tandon Utama.</p><p class="text-[10px] text-muted-foreground mt-2">1 Jam yang lalu</p></div>
            <button class="text-xs font-bold text-muted-foreground">Tandai Dibaca</button>
        </div>
    </div>
    """
    generate_page("notifikasi", "Pusat Notifikasi", NOTIFIKASI_CONTENT)

    # Profil
    PROFIL_CONTENT = """
    <div class="max-w-2xl space-y-8">
        <div class="flex items-center gap-6">
            <div class="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-4xl text-white font-bold">A</div>
            <div><h3 class="text-2xl font-bold">Admin Farm</h3><p class="text-muted-foreground">admin@plantelligence.com</p><button class="mt-2 text-xs font-bold text-primary px-3 py-1 border border-primary rounded-full">Edit Profil</button></div>
        </div>
        <div class="grid grid-cols-1 gap-6">
            <div class="bg-card border rounded-2xl p-6 space-y-4">
                <h4 class="font-bold border-b pb-2">Informasi Akun</h4>
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <span class="text-muted-foreground">ID Pelanggan</span><span class="font-mono">PLN-8829-X</span>
                    <span class="text-muted-foreground">Paket Layanan</span><span class="font-bold text-primary">SaaS Premium</span>
                    <span class="text-muted-foreground">Lokasi Farm</span><span>Lembang, Jawa Barat</span>
                </div>
            </div>
        </div>
    </div>
    """
    generate_page("profil", "Profil Pengguna", PROFIL_CONTENT)

    # Tambah Tanaman (Form)
    TAMBAH_CONTENT = """
    <div class="max-w-3xl mx-auto space-y-8">
        <div class="bg-card border rounded-2xl shadow-lg">
            <div class="p-8 border-b"><h3 class="font-bold text-xl">Formulir Tanaman Baru</h3><p class="text-sm text-muted-foreground mt-1">Lengkapi data untuk sistem monitoring AI.</p></div>
            <div class="p-8 space-y-8">
                <div class="grid grid-cols-2 gap-8">
                    <div class="space-y-2"><label class="text-xs font-bold uppercase tracking-widest text-muted-foreground">Nama Tanaman</label><input type="text" class="w-full h-12 border rounded-xl px-4" placeholder="Contoh: Selada Batch A"></div>
                    <div class="space-y-2"><label class="text-xs font-bold uppercase tracking-widest text-muted-foreground">Jenis</label><select class="w-full h-12 border rounded-xl px-4"><option>Hidroponik</option><option>Aeroponik</option></select></div>
                </div>
                <div class="grid grid-cols-2 gap-8">
                    <div class="space-y-2"><label class="text-xs font-bold uppercase tracking-widest text-muted-foreground">Tanggal Tanam</label><input type="date" class="w-full h-12 border rounded-xl px-4"></div>
                    <div class="space-y-2"><label class="text-xs font-bold uppercase tracking-widest text-muted-foreground">Estimasi Panen</label><input type="number" class="w-full h-12 border rounded-xl px-4" placeholder="Hari"></div>
                </div>
                <div class="space-y-2"><label class="text-xs font-bold uppercase tracking-widest text-muted-foreground">Lokasi Rak</label><input type="text" class="w-full h-12 border rounded-xl px-4" placeholder="Contoh: Rack A-1"></div>
            </div>
            <div class="p-8 border-t bg-muted/10 flex justify-end gap-4"><button class="px-8 py-3 border rounded-xl font-bold">Batal</button><button class="px-8 py-3 bg-primary text-white rounded-xl font-bold shadow-lg">Simpan Tanaman</button></div>
        </div>
    </div>
    """
    generate_page("tambah_tanaman", "Tambah Tanaman", TAMBAH_CONTENT)
    
    # Pengaturan (Automation Rules)
    PENGATURAN_CONTENT = """
    <div class="grid grid-cols-4 gap-8">
        <div class="space-y-2">
            <button class="w-full text-left p-4 bg-primary/10 text-primary rounded-xl font-bold border-l-4 border-primary">Aturan Otomasi</button>
            <button class="w-full text-left p-4 text-muted-foreground hover:bg-muted rounded-xl font-medium">Profil Farm</button>
            <button class="w-full text-left p-4 text-muted-foreground hover:bg-muted rounded-xl font-medium">Notifikasi</button>
            <button class="w-full text-left p-4 text-muted-foreground hover:bg-muted rounded-xl font-medium">Keamanan</button>
        </div>
        <div class="col-span-3 space-y-8">
            <div class="bg-card border rounded-2xl shadow-sm">
                <div class="p-6 border-b font-bold">Konfigurasi Jadwal Cahaya</div>
                <div class="p-6 grid grid-cols-2 gap-8">
                    <div class="space-y-3"><label class="text-xs font-bold text-muted-foreground uppercase">Jam Menyala</label><input type="time" value="06:00" class="w-full h-12 border rounded-xl px-4"></div>
                    <div class="space-y-3"><label class="text-xs font-bold text-muted-foreground uppercase">Jam Mati</label><input type="time" value="18:00" class="w-full h-12 border rounded-xl px-4"></div>
                </div>
                <div class="p-6 border-t bg-muted/5 flex justify-end"><button class="px-6 py-2 bg-primary text-white rounded-xl font-bold">Simpan Aturan</button></div>
            </div>
            <div class="bg-card border rounded-2xl shadow-sm">
                <div class="p-6 border-b font-bold">Batas Ambang TDS (Nutrisi)</div>
                <div class="p-6 grid grid-cols-2 gap-8">
                    <div class="space-y-3"><label class="text-xs font-bold text-muted-foreground uppercase tracking-widest">Batas Bawah</label><div class="flex items-center gap-2"><input type="number" value="800" class="w-full h-12 border rounded-xl px-4"><span class="text-xs font-bold">PPM</span></div></div>
                    <div class="space-y-3"><label class="text-xs font-bold text-muted-foreground uppercase tracking-widest">Target TDS</label><div class="flex items-center gap-2"><input type="number" value="1200" class="w-full h-12 border rounded-xl px-4"><span class="text-xs font-bold">PPM</span></div></div>
                </div>
                <div class="p-6 border-t bg-muted/5 flex justify-end"><button class="px-6 py-2 bg-primary text-white rounded-xl font-bold">Simpan Aturan</button></div>
            </div>
        </div>
    </div>
    """
    generate_page("pengaturan", "Pengaturan", PENGATURAN_CONTENT)

run()
