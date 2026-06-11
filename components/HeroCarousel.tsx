'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Bot, BookOpen, Shield } from 'lucide-react'

const slides = [
  {
    id: 1,
    tag: 'Pemerintah Kabupaten Sumenep',
    subtitle: 'Dinas Pekerjaan Umum dan Penataan Ruang',
    title: ['KOTA', 'UNTUK', 'KITA'],
    titleGold: [false, false, true],
    desc: 'PUTR Sumenep Menata Kota dan Melayani Warga',
    image: '/images/kadis.jpeg',
    cover: '/images/cover.jpeg',
  },
  {
    id: 2,
    tag: 'Program Unggulan 2024–2026',
    subtitle: 'Infrastruktur Berkualitas untuk Masyarakat',
    title: ['BANGUN', 'DENGAN', 'HATI'],
    titleGold: [false, false, true],
    desc: 'Mewujudkan infrastruktur yang merata dan berkelanjutan di seluruh Kabupaten Sumenep',
    image: '/images/kadis.jpeg',
    cover: '/images/cover.jpeg',
  },
]

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)

  const goTo = useCallback(
    (idx: number) => {
      if (animating) return
      setAnimating(true)
      setCurrent(idx)
      setTimeout(() => setAnimating(false), 500)
    },
    [animating],
  )

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo])
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo])

  useEffect(() => {
    const t = setInterval(next, 6000)
    return () => clearInterval(t)
  }, [next])

  const slide = slides[current]

  return (
    <section className="relative overflow-hidden bg-[#080808]">
      {/* ── Background cover art ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src={slide.cover}
          alt="Background hero"
          fill
          className="object-cover object-center opacity-20 transition-opacity duration-700"
          priority
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/50 to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/90 via-transparent to-[#0a0a0a]/30" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 lg:px-8">

        {/* MOBILE layout */}
        <div className="lg:hidden py-8 pb-10">
          {/* Gov header badge */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-full overflow-hidden border border-[rgba(224,168,46,0.3)] flex-shrink-0">
              <Shield size={16} className="text-[#E0A82E] m-auto mt-1" />
            </div>
            <div className="text-[9px] leading-tight text-gray-400">
              <p className="font-semibold text-[#E0A82E] uppercase tracking-widest text-[8px]">{slide.tag}</p>
              <p>{slide.subtitle}</p>
            </div>
          </div>

          {/* Kadis photo – floated right */}
          <div className="relative mb-2">
            <div className="absolute right-0 top-0 w-40 h-52 z-10">
              <Image
                src={slide.image}
                alt="Kepala Dinas PUTR Sumenep"
                fill
                className="object-cover object-top"
                style={{ maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)' }}
              />
            </div>
            {/* Title */}
            <div
              className={`transition-all duration-500 ${animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
            >
              <h1 className="text-5xl font-extrabold leading-[0.92] tracking-tight">
                {slide.title.map((word, i) => (
                  <span
                    key={i}
                    className={`block ${
                      slide.titleGold[i]
                        ? 'text-gold-gradient'
                        : 'text-white'
                    }`}
                  >
                    {word}
                  </span>
                ))}
              </h1>
              <p className="mt-3 text-xs text-gray-300 leading-relaxed max-w-[200px]">
                {slide.desc}
              </p>
              <div className="flex gap-2 mt-5">
                <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#E0A82E] text-[#E0A82E] text-xs font-semibold hover:bg-[rgba(224,168,46,0.08)] transition-all">
                  <BookOpen size={13} />
                  Jelajahi Buku
                </button>
                <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold-gradient text-black text-xs font-bold shadow-gold animate-pulse-gold">
                  <Bot size={13} />
                  Tanya AI PUTR
                </button>
              </div>
            </div>
          </div>

          {/* Spacer for photo */}
          <div className="h-12" />

          {/* Carousel dots */}
          <div className="flex items-center gap-2 mt-4">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === current ? 'w-6 bg-[#E0A82E]' : 'w-1.5 bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* DESKTOP layout */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center min-h-[70vh] py-16">
          {/* Left: text */}
          <div
            className={`transition-all duration-500 ${animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
          >
            {/* Gov badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(224,168,46,0.25)] bg-[rgba(224,168,46,0.06)] mb-6">
              <Shield size={12} className="text-[#E0A82E]" />
              <span className="text-[10px] font-semibold text-[#E0A82E] uppercase tracking-widest">
                {slide.tag}
              </span>
            </div>

            <p className="text-sm text-gray-400 mb-2 font-medium">{slide.subtitle}</p>

            <h1 className="text-7xl xl:text-8xl font-extrabold leading-[0.9] tracking-tight mb-6">
              {slide.title.map((word, i) => (
                <span
                  key={i}
                  className={`block ${
                    slide.titleGold[i] ? 'text-gold-gradient' : 'text-white'
                  }`}
                >
                  {word}
                </span>
              ))}
            </h1>

            <p className="text-base text-gray-300 leading-relaxed max-w-sm mb-8">
              {slide.desc}
            </p>

            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[#E0A82E] text-[#E0A82E] font-semibold hover:bg-[rgba(224,168,46,0.08)] transition-all">
                <BookOpen size={16} />
                Jelajahi Buku
              </button>
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-gradient text-black font-bold shadow-gold hover:shadow-gold-lg hover:scale-105 transition-all animate-pulse-gold">
                <Bot size={16} />
                Tanya AI PUTR
              </button>
            </div>

            {/* Carousel controls */}
            <div className="flex items-center gap-3 mt-10">
              <button
                onClick={prev}
                className="w-9 h-9 rounded-full border border-[rgba(224,168,46,0.2)] flex items-center justify-center text-gray-400 hover:border-[#E0A82E] hover:text-[#E0A82E] transition-all"
              >
                <ChevronLeft size={16} />
              </button>
              <div className="flex gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === current ? 'w-8 bg-[#E0A82E]' : 'w-2 bg-gray-600 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="w-9 h-9 rounded-full border border-[rgba(224,168,46,0.2)] flex items-center justify-center text-gray-400 hover:border-[#E0A82E] hover:text-[#E0A82E] transition-all"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Right: kadis photo + floating card */}
          <div className="relative flex items-end justify-center h-[60vh]">
            {/* Glow behind photo */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-[#E0A82E] opacity-10 blur-3xl" />

            {/* Kadis photo */}
            <div
              className={`relative w-80 h-[520px] transition-all duration-700 ${animating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
            >
              <Image
                src={slide.image}
                alt="Kepala Dinas PUTR Sumenep"
                fill
                className="object-cover object-top"
                style={{
                  maskImage:
                    'linear-gradient(to bottom, black 70%, transparent 100%)',
                  WebkitMaskImage:
                    'linear-gradient(to bottom, black 70%, transparent 100%)',
                }}
                priority
              />
            </div>

            {/* Floating stat badge */}
            <div className="absolute top-8 right-0 card-glass px-4 py-3 rounded-2xl shadow-card animate-float">
              <p className="text-[10px] text-gray-400 mb-0.5">Jalan Kabupaten</p>
              <p className="text-xl font-extrabold text-gold-gradient">1.256,45</p>
              <p className="text-[10px] text-gray-400">km terdata</p>
            </div>

            {/* Floating badge 2 */}
            <div
              className="absolute bottom-16 left-0 card-glass px-4 py-3 rounded-2xl shadow-card animate-float"
              style={{ animationDelay: '1.5s' }}
            >
              <p className="text-[10px] text-gray-400 mb-0.5">Jembatan Aktif</p>
              <p className="text-xl font-extrabold text-gold-gradient">312</p>
              <p className="text-[10px] text-gray-400">unit terpantau</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
