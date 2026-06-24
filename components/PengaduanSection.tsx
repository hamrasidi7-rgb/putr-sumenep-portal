import { ChevronRight } from 'lucide-react'

export default function PengaduanSection() {
  return (
    <section className="px-4 lg:px-0 py-2 lg:py-8">
      {/* Header row */}
      <div className="flex items-center justify-between mb-4 lg:mb-5">
        <div className="flex items-center gap-3">
          {/* Logo — tag img biasa agar path tidak diproses next/image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/chat-ai-pengaduan.jpeg"
            alt="Logo AI Pengaduan"
            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
          />
          <div>
            <h2 className="text-sm lg:text-base font-bold text-white">Tanya AI Pengaduan</h2>
            <p className="text-[10px] lg:text-xs text-gray-500 hidden sm:block">
              Ajukan pertanyaan atau laporkan masalah infrastruktur Anda
            </p>
          </div>
        </div>

        <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gold-gradient text-black text-[10px] lg:text-xs font-bold shadow-gold hover:shadow-gold-lg transition-all flex-shrink-0">
          Buat Pengaduan
          <ChevronRight size={12} />
        </button>
      </div>

      {/* Teks panduan pengganti grid kategori */}
      <div
        className="rounded-2xl px-4 py-4 lg:py-5"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        <p className="text-xs lg:text-sm text-gray-400 leading-relaxed">
          Tanyakan atau laporkan apa saja seputar infrastruktur. Misalnya:{' '}
          <span className="text-gray-300">&ldquo;Jalan rusak di desa saya&rdquo;</span>,{' '}
          <span className="text-gray-300">&ldquo;Lampu PJU mati di jalan X&rdquo;</span>,{' '}
          <span className="text-gray-300">&ldquo;Drainase tersumbat&rdquo;</span>, atau{' '}
          <span className="text-gray-300">&ldquo;Bagaimana cara mengajukan perizinan bangunan?&rdquo;</span>
        </p>
      </div>
    </section>
  )
}
