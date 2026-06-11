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
    <section className="relative overflow-hidden bg-[#f0f2f5]">
      {/* ── Background cover art ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src={slide.cover}
          alt="Background hero"
          fill
          className="object-cover object-center opacity-10 transition-opacity duration-700"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f0f2f5]/70 via-[#f0f2f5]/50 to-[#f0f2f5]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f0f2f5]/90 via-transparent to-[#f0f2f5]/30" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 lg:px-8">

        {/* MOBILE layout */}
        <div className="lg:hidden py-8 pb-10">
          {/* Gov header badge */}
          <div className="flex items-center gap-2 mb-5">
            <div className="w-7 h-7 rounded-full border border-[rgba(224,168,46,0.3)] flex items-center justify-center flex-shrink-0">
              <Shield size={14} className="text-[#E0A82E]" />
            </div>
            <div className="text-[9px] leading-tight text-gray-500">
              <p className="font-semibold text-[#E0A82E] uppercase tracking-widest text-[8px]">{slide.tag}</p>
              <p>{slide.subtitle}</p>
            </div>
          </div>

          {/* Flex row: FOTO KIRI — teks kanan */}
          <div className="flex gap-4 items-start mb-5">
            {/* Kadis photo – KIRI */}
            <div className="relative w-28 h-44 flex-shrink-0">
              <Image
                src={slide.image}
                alt="Kepala Dinas PUTR Sumenep"
                fill
                className="object-cover object-top rounded-2xl"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                }}
              />
            </div>

            {/* Teks – KANAN */}
            <div
              className={`flex-1 transition-all duration-500 ${animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
            >
              <h1 className="text-4xl font-extrabold leading-[0.92] tracking-tight">
                {slide.title.map((word, i) => (
                  <span
                    key={i}
                    className={`block ${slide.titleGold[i] ? 'text-gold-gradient' : 'text-gray-900'}`}
                  >
                    {word}
                  </span>
                ))}
              </h1>
              <p className="mt-2 text-[10px] text-gray-500 leading-relaxed">
                {slide.desc}
              </p>
              <div className="flex gap-2 mt-4 flex-wrap">
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[#E0A82E] text-[#E0A82E] text-[10px] font-semibold hover:bg-[rgba(224,168,46,0.08)] transition-all">
                  <BookOpen size={11} />
                  Jelajahi
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gold-gradient text-black text-[10px] font-bold shadow-gold animate-pulse-gold">
                  <Bot size={11} />
                  Tanya AI
                </button>
              </div>
            </div>
          </div>

          {/* Carousel dots */}
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === current ? 'w-6 bg-[#E0A82E]' : 'w-1.5 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* DESKTOP layout */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center min-h-[70vh] py-16">

          {/* KIRI: foto kadis + floating cards */}
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
                  maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                }}
                priority
              />
            </div>

            {/* Floating stat badge – atas kiri */}
            <div className="absolute top-8 left-0 card-glass px-4 py-3 rounded-2xl shadow-card animate-float">
              <p className="text-[10px] text-gray-500 mb-0.5">Jalan Kabupaten</p>
              <p className="text-xl font-extrabold text-gold-gradient">1.256,45</p>
              <p className="text-[10px] text-gray-500">km terdata</p>
            </div>

            {/* Floating badge – bawah kanan */}
            <div
              className="absolute bottom-16 right-0 card-glass px-4 py-3 rounded-2xl shadow-card animate-float"
              style={{ animationDelay: '1.5s' }}
            >
              <p className="text-[10px] text-gray-500 mb-0.5">Jembatan Aktif</p>
              <p className="text-xl font-extrabold text-gold-gradient">312</p>
              <p className="text-[10px] text-gray-500">unit terpantau</p>
            </div>
          </div>

          {/* KANAN: teks */}
          <div
            className={`transition-all duration-500 ${animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
          >
            {/* Gov badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(224,168,46,0.3)] bg-[rgba(224,168,46,0.06)] mb-6">
              <Shield size={12} className="text-[#E0A82E]" />
              <span className="text-[10px] font-semibold text-[#E0A82E] uppercase tracking-widest">
                {slide.tag}
              </span>
            </div>

            <p className="text-sm text-gray-500 mb-2 font-medium">{slide.subtitle}</p>

            <h1 className="text-7xl xl:text-8xl font-extrabold leading-[0.9] tracking-tight mb-6">
              {slide.title.map((word, i) => (
                <span
                  key={i}
                  className={`block ${slide.titleGold[i] ? 'text-gold-gradient' : 'text-gray-900'}`}
                >
                  {word}
                </span>
              ))}
            </h1>

            <p className="text-base text-gray-600 leading-relaxed max-w-sm mb-8">
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
                className="w-9 h-9 rounded-full border border-[rgba(224,168,46,0.25)] flex items-center justify-center text-gray-500 hover:border-[#E0A82E] hover:text-[#E0A82E] transition-all"
              >
                <ChevronLeft size={16} />
              </button>
              <div className="flex gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === current ? 'w-8 bg-[#E0A82E]' : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="w-9 h-9 rounded-full border border-[rgba(224,168,46,0.25)] flex items-center justify-center text-gray-500 hover:border-[#E0A82E] hover:text-[#E0A82E] transition-all"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
