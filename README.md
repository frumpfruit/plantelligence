# Plantelligence - Smart Hydroponic Management System

Plantelligence adalah platform SaaS pertanian modern yang dirancang untuk membantu pengelolaan sistem hidroponik secara cerdas. Dilengkapi dengan dashboard analitik, monitoring real-time, dan sistem kontrol nutrisi/pencahayaan yang intuitif.

## 🚀 Panduan Memulai (Untuk Team)

Ikuti langkah-langkah di bawah ini untuk menjalankan project ini di komputer lokal Anda.

### 1. Prasyarat
Pastikan Anda sudah menginstal:
- [Node.js](https://nodejs.org/) (Versi 18.x atau terbaru)
- [Git](https://git-scm.com/)

### 2. Kloning Repository
Buka terminal/command prompt dan jalankan perintah berikut:
```bash
git clone https://github.com/frumpfruit/plantelligence.git
```

### 3. Masuk ke Direktori Project
```bash
cd plantelligence
```

### 4. Instalasi Dependencies
Instal semua library yang dibutuhkan menggunakan npm:
```bash
npm install
```

### 5. Menjalankan Project secara Lokal
Jalankan server pengembangan:
```bash
npm run dev
```
Setelah berhasil, buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---

## 🛠️ Tech Stack
- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **UI Components**: Shadcn UI (Customized)

## ✨ Fitur Utama
- **Unified Auth Page**: Halaman Login dan Sign Up interaktif dalam satu tampilan.
- **Dashboard Analitik**: Visualisasi data pertumbuhan tanaman dan kondisi lingkungan.
- **Monitoring Real-time**: Pantau nutrisi, suhu, dan kelembaban secara langsung.
- **Manajemen Tanaman**: Kelola database tanaman dan jadwal panen.
- **Middleware Security**: Proteksi rute otomatis menggunakan Next.js Middleware.

## 📁 Struktur Folder Utama
- `src/app`: Routing dan halaman aplikasi.
- `src/components`: Komponen UI yang dapat digunakan kembali.
- `src/lib/actions`: Server Actions untuk logika backend (seperti Auth).
- `public/images`: Asset gambar lokal (termasuk hero image).

---

Dikembangkan dengan ❤️ untuk masa depan pertanian digital.
