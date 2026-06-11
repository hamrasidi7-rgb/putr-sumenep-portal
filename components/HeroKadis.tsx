'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Send } from 'lucide-react'

export default function HeroKadis() {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = query.trim()
    // Scroll ke AI section
    document.getElementById('ai-putr')?.scrollIntoView({ behavior: 'smooth' })
    if (text) {
      // Pass teks ke ChatAIPUTR via custom event
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('hero-query', { detail: text }))
      }, 500)
      setQuery('')
    }
  }

  return (
    <>
      {/* ── LAYAR UTAMA: Full-screen Kadis ── */}
      <section className="relative min-h-[100svh] bg-[#f0f2f5] overflow-hidden flex flex-col items-center justify-end">

        {/* Cover art — very subtle bg texture */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/images/cover.jpeg"
            alt=""
            fill
            className="object-cover object-center opacity-[0.07]"
            priority
          />
        </div>

        {/* Gold ambient glow */}
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#E0A82E]/10 blur-3xl pointer-events-none" />

        {/* Kadis portrait — main visual */}
        <div
          className="relative w-[280px] sm:w-[320px] lg:w-[380px] xl:w-[420px] flex-shrink-0"
          style={{ height: '82vh' }}
        >
          <Image
            src="/images/kadis.jpeg"
            alt="Eri Kepala Dinas PUTR Sumenep"
            fill
            className="object-cover object-top"
            style={{
              maskImage: 'linear-gradient(to bottom, black 72%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 72%, transparent 100%)',
            }}
            priority
          />
        </div>

        {/* Bottom fade to page bg */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-[#f0f2f5] pointer-events-none" />
      </section>

      {/* ── TAGLINE ── */}
      <section className="relative bg-[#f0f2f5] px-4 lg:px-8 pt-4 pb-14 lg:pb-20">
        <div className="max-w-[860px] mx-auto text-center">

          {/* Stacked headline */}
          <h2 className="font-extrabold tracking-tight leading-[1.08] mb-10
            text-[1.75rem] sm:text-[2.25rem] lg:text-[3.25rem] xl:text-[4rem]">
            <span className="block text-gray-800">MEMBANGUN INFRASTRUKTUR,</span>
            <span className="block text-gray-800">MENATA RUANG,</span>
            <span className="block text-gold-gradient">MELAYANI WARGA.</span>
          </h2>

          {/* Quick input — scrolls ke chat section */}
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="flex items-center gap-3 bg-white rounded-2xl border border-gray-200
              shadow-sm px-4 py-3
              hover:border-[rgba(224,168,46,0.45)] hover:shadow-md transition-all">

              {/* Robot avatar kecil */}
              <div className="relative w-7 h-7 flex-shrink-0">
                <Image
                  src="/images/robot.jpeg"
                  alt="AI PUTR"
                  fill
                  className="object-cover rounded-full border border-[#E0A82E]"
                />
              </div>

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tanya AI PUTR Sumenep..."
                className="flex-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none"
              />

              <button
                type="submit"
                className="w-8 h-8 rounded-xl bg-gold-gradient flex items-center justify-center
                  shadow-gold hover:scale-105 transition-all flex-shrink-0"
              >
                <Send size={13} className="text-black" />
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
