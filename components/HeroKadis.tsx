import Image from 'next/image'

const TICKER_ITEM = 'KOTA UNTUK KITA'
const TICKER_SEP  = '◆'

export default function HeroKadis() {
  return (
    <>
      {/* ── LAYAR UTAMA: Banner ── */}
      <section className="relative overflow-hidden" style={{ background: '#0d0f14' }}>

        {/* Gold ambient glow */}
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#E0A82E]/8 blur-3xl pointer-events-none" />

        {/* Hero banner — 470px mobile, 580px desktop */}
        <div className="relative w-full h-[470px] lg:h-[580px]">
          <Image
            src="/images/FOTO LAYAR UTAMA.jpeg"
            alt="Layar Utama PUTR Sumenep"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Bottom fade ke hitam */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
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
          {/* 12 items = 6 + 6 duplikat → seamless loop dengan translateX(-50%) */}
          <div
            className="flex whitespace-nowrap"
            style={{
              width: 'max-content',
              animation: 'ticker-scroll 18s linear infinite',
            }}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <span key={i} className="inline-flex items-center gap-3 px-6">
                <span
                  className="font-extrabold tracking-[0.35em] text-sm uppercase"
                  style={{ color: '#E0A82E' }}
                >
                  {TICKER_ITEM}
                </span>
                <span style={{ color: 'rgba(224,168,46,0.35)', fontSize: '0.6rem' }}>
                  {TICKER_SEP}
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── TAGLINE — hitam, langsung di bawah banner ── */}
      <section className="px-4 lg:px-8 pt-4 pb-8 lg:pb-10" style={{ background: '#0d0f14' }}>
        <div className="max-w-[860px] mx-auto text-center">
          <h2 className="font-extrabold tracking-tight leading-[1.08]
            text-[1.75rem] sm:text-[2.25rem] lg:text-[3.25rem] xl:text-[4rem]">
            <span className="block text-white">MEMBANGUN INFRASTRUKTUR,</span>
            <span className="block text-white">MENATA RUANG,</span>
            <span className="block text-gold-gradient">MELAYANI WARGA.</span>
          </h2>
        </div>
      </section>
    </>
  )
}
