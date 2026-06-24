import Header from '@/components/Header'
import BottomNav from '@/components/BottomNav'
import GaleriCard from '@/components/GaleriCard'
import Footer from '@/components/Footer'

const PROYEK = [
  {
    title: 'Rekonstruksi Jalan Raya Sumenep – Arjasa',
    lokasi: 'Kec. Kota Sumenep',
    tahun: 2024,
    kategori: 'Jalan',
    status: 'Selesai' as const,
    beforeSrc: 'https://picsum.photos/seed/road-before-1/800/500',
    afterSrc:  'https://picsum.photos/seed/road-after-1/800/500',
  },
  {
    title: 'Pembangunan Jembatan Kali Marengan',
    lokasi: 'Kec. Batuan',
    tahun: 2024,
    kategori: 'Jembatan',
    status: 'Selesai' as const,
    beforeSrc: 'https://picsum.photos/seed/bridge-before-1/800/500',
    afterSrc:  'https://picsum.photos/seed/bridge-after-1/800/500',
  },
  {
    title: 'Normalisasi Drainase Pasar Anom Baru',
    lokasi: 'Kec. Kota Sumenep',
    tahun: 2024,
    kategori: 'Drainase',
    status: 'Selesai' as const,
    beforeSrc: 'https://picsum.photos/seed/drain-before-1/800/500',
    afterSrc:  'https://picsum.photos/seed/drain-after-1/800/500',
  },
  {
    title: 'Rehabilitasi Gedung Kantor PUTR Sumenep',
    lokasi: 'Kec. Kota Sumenep',
    tahun: 2023,
    kategori: 'Gedung',
    status: 'Selesai' as const,
    beforeSrc: 'https://picsum.photos/seed/gedung-before-2/800/500',
    afterSrc:  'https://picsum.photos/seed/gedung-after-2/800/500',
  },
  {
    title: 'Pelebaran Jalan Desa Pragaan Laok',
    lokasi: 'Kec. Pragaan',
    tahun: 2025,
    kategori: 'Jalan',
    status: 'Berjalan' as const,
    beforeSrc: 'https://picsum.photos/seed/road-before-3/800/500',
    afterSrc:  'https://picsum.photos/seed/road-after-3/800/500',
  },
  {
    title: 'Pembangunan Embung Rubaru',
    lokasi: 'Kec. Rubaru',
    tahun: 2025,
    kategori: 'Embung',
    status: 'Berjalan' as const,
    beforeSrc: 'https://picsum.photos/seed/embung-before-1/800/500',
    afterSrc:  'https://picsum.photos/seed/embung-after-1/800/500',
  },
]

const STATS = [
  { value: PROYEK.filter(p => p.status === 'Selesai').length, label: 'Proyek Selesai' },
  { value: PROYEK.filter(p => p.status === 'Berjalan').length, label: 'Sedang Berjalan' },
  { value: [...new Set(PROYEK.map(p => p.kategori))].length, label: 'Kategori' },
]

export default function GaleriPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#0d0f14] pb-24 lg:pb-12">

        {/* Hero section */}
        <div
          className="px-4 lg:px-8 py-10 lg:py-14 text-center border-b"
          style={{ background: 'linear-gradient(180deg, #111318 0%, #0d0f14 100%)', borderColor: 'rgba(224,168,46,0.12)' }}
        >
          <p className="text-[11px] font-bold text-[#E0A82E] tracking-[0.4em] uppercase mb-2">PUTR Sumenep</p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Galeri <span className="text-gold-gradient">Pembangunan</span>
          </h1>
          <p className="text-gray-400 text-sm mt-3 max-w-lg mx-auto leading-relaxed">
            Dokumentasi visual proyek infrastruktur sebelum dan sesudah pengerjaan di Kabupaten Sumenep.
          </p>

          {/* Mini stats */}
          <div className="flex justify-center gap-8 mt-8">
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-extrabold text-gold-gradient leading-none">{value}</p>
                <p className="text-[10px] text-gray-500 mt-1 tracking-wide">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Grid kartu */}
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8">

          {/* Filter label */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1" style={{ background: 'rgba(224,168,46,0.15)' }} />
            <p className="text-[11px] text-gray-500 tracking-widest uppercase">
              {PROYEK.length} Proyek Terdokumentasi
            </p>
            <div className="h-px flex-1" style={{ background: 'rgba(224,168,46,0.15)' }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROYEK.map((p) => (
              <GaleriCard key={p.title} {...p} />
            ))}
          </div>

          {/* Catatan placeholder */}
          <p className="text-center text-[11px] text-gray-600 mt-10 leading-relaxed">
            * Gambar saat ini menggunakan placeholder.<br />
            Ganti dengan foto dokumentasi nyata di array <code className="text-gray-500">PROYEK</code> pada <code className="text-gray-500">app/galeri/page.tsx</code>.
          </p>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </>
  )
}
