# Blooms of Love — Interactive Bouquet & Love Note

Website vanilla (HTML/CSS/JS) untuk merangkai buket bunga A-Z + surat cinta dengan amplop wax seal, preview hadiah, dan share link.

## Jalankan
Buka `index.html` langsung di browser (double-click). Tidak butuh build tool / server.
Opsional: `npx serve .` atau Live Server VS Code untuk URL sharing.

## Fitur
- Katalog 26 bunga A-Z (Amaryllis ... Zinnia) + makna + SVG
- Search & filter abjad A-Z
- Canvas buket: pilih wrapper (Kraft/Silk/Vintage/Satin), pita, drag & drop posisi, rotasi & skala, sparkle & hujan kelopak
- Surat cinta: input penerima/pesan/pengirim, 3 font (Dancing Script, Great Vibes, Playfair Display), amplop wax seal interaktif
- Gift Preview Mode + LocalStorage auto-save + encoded URL (`?gift=...`) untuk berbagi

## Struktur
```
index.html
css/style.css
js/flowers-data.js
js/app.js
```

## Tips
- Klik segel lilin untuk buka/tutup surat
- Drag bunga di canvas untuk atur posisi
- Tombol “Salin Link Hadiah” menghasilkan URL yang bisa langsung dibuka pacar — state buket & surat ikut terkirim
