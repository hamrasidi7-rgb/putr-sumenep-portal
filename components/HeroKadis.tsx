import Image from 'next/image'

const TICKER_ITEM = 'KOTA UNTUK KITA'
const TICKER_SEP  = '◆'

export default function HeroKadis() {
  return (
    <>
      {/* ── LAYAR UTAMA ── */}
      <section className="relative overflow-hidden" style={{ background: '#0d0f14' }}>

        {/* Gold ambient glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full bg-[#E0A82E]/5 blur-3xl" />
        </div>

        {/* ─ Mobile: full-width portrait | Desktop: 2-kolom (gambar + tagline) ─ */}
        <div className="flex flex-col lg:flex-row lg:items-stretch lg:min-h-[640px] lg:max-w-[1280px] lg:mx-auto">

          {/* Gambar — portrait, tidak pernah crop wajah */}
          <div className="relative w-full h-[470px] lg:w-[480px] lg:h-auto lg:flex-shrink-0">
            <Image
              src="/images/FOTO LAYAR UTAMA.jpeg"
              alt="Eri Kepala PUTR Sumenep — Kota Untuk Kita"
              fill
              className="object-cover object-top"
              priority
            />
            {/* Fade kanan hanya di desktop */}
            <div
              className="hidden lg:block absolute top-0 right-0 w-32 h-full pointer-events-none"
              style={{ background: 'linear-gradient(to right, transparent, #0d0f14)' }}
            />
          </div>

          {/* Tagline — desktop only di sebelah kanan */}
          <div className="hidden lg:flex flex-1 items-center justify-start px-14 xl:px-20">
            <h2 className="font-extrabold tracking-tight leading-[1.08] text-[2.75rem] xl:text-[3.75rem]">
              <span className="block text-white">MEMBANGUN</span>
              <span className="block text-white">INFRASTRUKTUR,</span>
              <span className="block text-white">MENATA RUANG,</span>
              <span className="block text-gold-gradient">MELAYANI WARGA.</span>
            </h2>
          </div>
        </div>

        {/* Bottom fade ke hitam — mobile only (desktop pakai sidebar fade) */}
        <div
          className="lg:hidden absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #0d0f14)' }}
        />

        {/* ── Ticker KOTA UNTUK KITA ── */}
        <div
          className="absolute bottom-0 left-0 right-0 overflow-hidden py-3"
          style={{
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            borderTop: '1px solid rgba(224,168,46,0.25)',
          }}
        >
          <div
            className="flex whitespace-nowrap"
            style={{ width: 'max-content', animation: 'ticker-scroll 18s linear infinite' }}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <span key={i} className="inline-flex items-center gap-3 px-6">
                <span className="font-extrabold tracking-[0.35em] text-sm uppercase" style={{ color: '#E0A82E' }}>
                  {TICKER_ITEM}
                </span>
                <span style={{ color: 'rgba(224,168,46,0.35)', fontSize: '0.6rem' }}>{TICKER_SEP}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── TAGLINE mobile only — di bawah banner ── */}
      <section className="lg:hidden px-4 pt-4 pb-8" style={{ background: '#0d0f14' }}>
        <div className="max-w-[860px] mx-auto text-center">
          <h2 className="font-extrabold tracking-tight leading-[1.08] text-[1.75rem] sm:text-[2.25rem]">
            <span className="block text-white">MEMBANGUN INFRASTRUKTUR,</span>
            <span className="block text-white">MENATA RUANG,</span>
            <span className="block text-gold-gradient">MELAYANI WARGA.</span>
          </h2>
        </div>
      </section>
    </>
  )
}
