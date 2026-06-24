import Link from 'next/link'
import Image from 'next/image'
import { Camera, ArrowRight } from 'lucide-react'

const PREVIEW = [
  {
    title: 'Rekonstruksi Jalan Raya Sumenep – Arjasa',
    kategori: 'Jalan',
    color: '#3B82F6',
    src: 'https://picsum.photos/seed/road-after-1/600/400',
  },
  {
    title: 'Pembangunan Jembatan Kali Marengan',
    kategori: 'Jembatan',
    color: '#F59E0B',
    src: 'https://picsum.photos/seed/bridge-after-1/600/400',
  },
  {
    title: 'Normalisasi Drainase Pasar Anom Baru',
    kategori: 'Drainase',
    color: '#06B6D4',
    src: 'https://picsum.photos/seed/drain-after-1/600/400',
  },
  {
    title: 'Rehabilitasi Gedung Kantor PUTR Sumenep',
    kategori: 'Gedung',
    color: '#8B5CF6',
    src: 'https://picsum.photos/seed/gedung-after-2/600/400',
  },
]

export default function GaleriPreview() {
  return (
    <section className="px-4 lg:px-0 py-10 lg:py-14">

      {/* Header section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(224,168,46,0.12)', border: '1px solid rgba(224,168,46,0.25)' }}
          >
            <Camera size={17} className="text-[#E0A82E]" strokeWidth={1.8} />
          </div>
          <div>
            <h2 className="text-base lg:text-lg font-extrabold text-white tracking-wide leading-none">
              BERITA <span className="text-gold-gradient">PUTR</span>
            </h2>
            <p className="text-[11px] text-gray-500 mt-1">Kabar dan dokumentasi terbaru</p>
          </div>
        </div>

        <Link
          href="/galeri"
          className="flex items-center gap-1.5 text-xs font-bold text-[#E0A82E] hover:text-white transition-colors group"
        >
          Lihat Semua
          <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Grid kartu */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {PREVIEW.map(({ title, kategori, color, src }) => (
          <Link
            key={title}
            href="/galeri"
            className="group rounded-2xl overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-1"
            style={{
              background: 'linear-gradient(145deg, #1a1d26 0%, #111318 100%)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {/* Gambar */}
            <div className="relative w-full aspect-video overflow-hidden">
              <Image
                src={src}
                alt={title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                unoptimized
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Info */}
            <div className="px-3 py-3">
              <span
                className="text-[9px] font-bold tracking-widest uppercase"
                style={{ color }}
              >
                {kategori}
              </span>
              <p className="text-xs font-semibold text-gray-200 mt-0.5 leading-snug line-clamp-2">
                {title}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Tombol Lihat Semua — mobile */}
      <div className="mt-5 lg:hidden">
        <Link
          href="/galeri"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-sm font-bold text-black transition-opacity hover:opacity-90"
          style={{ background: 'linear-gradient(90deg, #E0A82E, #f0b840)' }}
        >
          <Camera size={15} />
          Lihat Semua Galeri
        </Link>
      </div>
    </section>
  )
}
