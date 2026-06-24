import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { pengaduanCategories } from '@/data/putr'

export default function PengaduanSection() {
  return (
    <section className="px-4 lg:px-0 py-2 lg:py-8">
      {/* Header row */}
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 flex-shrink-0 rounded-full overflow-hidden">
            <Image
              src="/images/chat-ai-pengaduan.jpeg"
              alt="Logo AI Pengaduan PUTR"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-sm lg:text-base font-bold text-gray-900">Tanya AI Pengaduan</h2>
            <p className="text-[10px] lg:text-xs text-gray-500 hidden sm:block">
              Laporkan keluhan Anda terkait infrastruktur di lingkungan Anda mulai dari:
            </p>
          </div>
        </div>

        <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gold-gradient text-black text-[10px] lg:text-xs font-bold shadow-gold hover:shadow-gold-lg transition-all flex-shrink-0">
          Buat Pengaduan
          <ChevronRight size={12} />
        </button>
      </div>

      {/* Description (mobile only) */}
      <p className="text-[10px] text-gray-500 sm:hidden mb-4">
        Laporkan keluhan terkait infrastruktur di lingkungan Anda:
      </p>

      {/* Categories grid: 3×2 mobile → 6 in a row desktop */}
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-2.5 lg:gap-3">
        {pengaduanCategories.map(({ id, label, Icon, color, bg }) => (
          <button
            key={id}
            className="
              group card-dark p-3 lg:p-4 rounded-2xl flex flex-col items-center gap-2 text-center
              hover:border-[rgba(224,168,46,0.35)] hover:bg-gray-50 hover:-translate-y-0.5
              transition-all duration-200
            "
          >
            <div
              className="w-9 h-9 lg:w-11 lg:h-11 rounded-xl flex items-center justify-center transition-all group-hover:scale-110"
              style={{ background: bg, border: `1px solid ${color}25` }}
            >
              <Icon size={18} style={{ color }} strokeWidth={1.8} />
            </div>
            <span className="text-[9px] lg:text-xs text-gray-600 group-hover:text-gray-900 leading-tight font-medium">
              {label}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
