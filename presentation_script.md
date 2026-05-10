# Naskah Presentasi & Analisis User Flow: Plantelligence

Dokumen ini disusun untuk memandu presentasi aplikasi **Plantelligence**, menggabungkan visi strategis dari dokumen *User Flow* asli dengan implementasi fitur teknis terbaru.

---

## I. Ringkasan User Flow (Sesuai Dokumen Asli)

Berikut adalah pemetaan alur dari dokumen `user_flow_plantelligence.docx` ke dalam fungsionalitas aplikasi kita:

1.  **Menerima Notifikasi Otomatis:**
    *   **Kondisi:** Sistem mendeteksi nilai sensor (pH, TDS, Suhu) yang melampaui batas normal.
    *   **Aksi:** Push notification dikirim secara real-time.
    *   **Contoh:** *"Kadar nutrisi tanaman Selada turun di bawah batas minimum!"*

2.  **Membuka & Merespons Notifikasi:**
    *   **Aksi:** Pengguna mengetuk notifikasi.
    *   **Hasil:** Sistem membawa pengguna langsung ke halaman **Detail Tanaman** yang bermasalah.
    *   **Informasi:** Menampilkan Nilai Saat Ini, Nilai Normal, dan Selisih (Delta).

3.  **Melihat Data Secara Langsung:**
    *   **Aksi:** Memantau Dashboard & Monitoring.
    *   **Visual:** Indikator warna (Hijau/Kuning/Merah) menunjukkan status kondisi tanaman.
    *   **Update:** Data diperbarui otomatis setiap beberapa detik.

4.  **Tindak Lanjut (Penanganan):**
    *   **Aksi:** Pengguna menggunakan tombol "Buka Kontrol" untuk melakukan penyesuaian alat IoT.
    *   **Finalisasi:** Menandai notifikasi sebagai "Handled" (Selesai).

---

## II. Naskah Presentasi (Step-by-Step)

### 1. Pembukaan: Visi Plantelligence
> **(Tampilkan Halaman Dashboard Overview)**
>
> "Selamat pagi/siang rekan-rekan. Hari ini saya bangga memperkenalkan **Plantelligence**. Sebuah ekosistem cerdas yang dirancang untuk menjawab tantangan terbesar dalam hidroponik: **Kecepatan dan Ketepatan Respon**."
>
> "Aplikasi ini bukan sekadar dashboard statis, melainkan asisten cerdas yang memandu petani dari deteksi masalah hingga aksi nyata."

### 2. Alur 1: Monitoring & Kondisi Global
> **(Scroll Dashboard & Tunjukkan Widget Kesehatan Global)**
>
> "Sesuai dengan alur pertama di *User Flow* kami, pengguna dapat melihat data secara langsung. Di sini, kami menyediakan **Ringkasan Kesehatan Tanaman**. Dalam satu detik, petani tahu berapa tanaman yang sehat dan berapa yang butuh perhatian."
>
> **(Buka Halaman Monitoring)**
>
> "Visualisasi bar level kami tidak hanya menampilkan angka, tapi menggunakan **Marker Target Dinamis**. Jika level air atau nutrisi bergeser dari garis target, warna bar akan berubah, memberikan sinyal intuitif bagi pengguna."

### 3. Alur 2: Deteksi & Notifikasi Otomatis
> **(Buka Halaman Notifikasi)**
>
> "Mari kita masuk ke skenario nyata. Di sinilah letak 'kecerdasan' Plantelligence. Ketika sensor mendeteksi nilai pH turun di bawah 5.6 atau nutrisi di bawah 600 ppm, sistem akan memicu **Notifikasi Otomatis**."
>
> "Perhatikan daftar notifikasi ini. Setiap peringatan memiliki status **'Pending'**. Ini memastikan tidak ada masalah yang terlewatkan. Kita tidak perlu menunggu tanaman layu untuk tahu ada masalah."

### 4. Alur 3: Respon & Analisa Detail
> **(Klik Ikon Detail/Cari di salah satu Notifikasi Kritis)**
>
> "Sesuai alur di dokumen kami: *'Pengguna mengetuk notifikasi dan dibawa ke detail'*. Di halaman ini, kita melakukan analisa mendalam."
>
> "Kita menyajikan data dalam format **Current vs Normal**. Kita bisa melihat, misalnya, pH saat ini 5.2 sementara normalnya 6.0. Selisih 0.8 ini langsung dihitung oleh sistem, lengkap dengan rekomendasi tindakan seperti 'Tambahkan pH Down'."

### 5. Alur 4: Aksi Penanganan (Closing the Loop)
> **(Klik Tombol 'Buka Kontrol Sistem' di halaman Detail)**
>
> "Inilah bagian terpenting: **Responsibilitas**. Setelah melihat masalah, pengguna tidak perlu mencari-cari menu. Cukup klik **'Buka Kontrol'**, dan pengguna langsung bisa melakukan penyesuaian manual pada pompa nutrisi atau grow light."
>
> **(Kembali ke Notifikasi & Tandai Selesai)**
>
> "Setelah tindakan diambil, pengguna menandai tugas tersebut sebagai **'Selesai'**. Judul akan dicoret, status berubah menjadi Hijau. Alur kerja tuntas."

### 6. Penutup
> "Dengan Plantelligence, kita mengubah cara kerja pertanian: dari reaktif menjadi proaktif, dari manual menjadi otomatis. Terima kasih."

---

## III. Keunggulan Teknis untuk Highlight
*   **Real-time Synch:** Sinkronisasi data setiap 15 detik menggunakan state management yang efisien.
*   **Visual UX:** Penggunaan warna HSL yang harmonis (Emerald untuk sehat, Amber untuk peringatan, Rose untuk kritis).
*   **Data Integrity:** Parsing otomatis untuk nilai sensor yang kompleks (seperti konversi 12.5k Lux menjadi nilai numerik untuk grafik).
*   **Traceability:** Setiap notifikasi memiliki rekam jejak penanganan (Handled status).
