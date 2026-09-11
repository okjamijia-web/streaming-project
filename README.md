# Netflix Clone + Stremio Streaming Web App

Web aplikasi streaming modern dengan antarmuka Netflix dan backend Stremio resolver. Siap dideploy di Vercel dan dijalankan secara lokal.

## Status Layanan di Komputer Anda
Semua aplikasi telah terpasang dan **sedang aktif berjalan**:

| Aplikasi | Fungsi Utama | Tautan Web Dashboard | Port | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Jellyfin** | **Pemutar Streaming (Tombol PLAY ala Netflix)** | [http://localhost:8096](http://localhost:8096) | `8096` | **Aktif** (200 OK) |
| **Radarr** | Manajemen & Pengunduh Film (Movies) | [http://localhost:7878](http://localhost:7878) | `7878` | **Aktif** (200 OK) |
| **Sonarr** | Manajemen & Pengunduh Serial TV / Anime | [http://localhost:8989](http://localhost:8989) | `8989` | **Aktif** (200 OK) |

---

## 1. Alur Kerja Sistem Streaming Anda

```
               +-----------------------------------+
               |  Radarr (Film) & Sonarr (Series)  |
               +-----------------+-----------------+
                                 |
                                 v  (Download & Simpan)
               +-----------------+-----------------+
               |  Folder Media: Movies & TV Shows  |
               +-----------------+-----------------+
                                 |
                                 v  (Baca & Stream)
               +-----------------+-----------------+
               |             Jellyfin              |
               | (Buka di Browser / HP / Smart TV) |
               |        --> Klik Tombol PLAY       |
               +-----------------------------------+
```

---

## 2. Panduan Setup Awal Jellyfin (Pertama Kali Buka)

1. Buka browser ke **[http://localhost:8096](http://localhost:8096)**.
2. **Bahasa:** Pilih bahasa yang diinginkan (misal: *Indonesian* atau *English*), lalu klik **Next**.
3. **Akun:** Buat **Username** dan **Password** administrator Anda, lalu klik **Next**.
4. **Add Media Library:**
   - Klik **Add Media Library**.
   - Content type: Pilih **Movies** untuk film, lalu tentukan folder penyimpanan film Anda.
   - Content type: Pilih **Shows** untuk serial TV/anime, lalu tentukan folder serial TV Anda.
5. Klik **Next** sampai selesai (Finish).
6. Dashboard Netflix pribadi Anda siap digunakan!

---

## 3. Pintasan Desktop & Auto-Start
Pintasan berikut sudah tersedia di Desktop Anda:
- **Jellyfin**
- **Radarr**
- **Sonarr**

Ketiganya telah didaftarkan ke Windows Startup (`shell:startup`) sehingga otomatis berjalan di latar belakang setiap komputer menyala.
