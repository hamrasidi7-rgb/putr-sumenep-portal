'use client'

import { useState } from 'react'
import { Menu, X, Bot } from 'lucide-react'
import Image from 'next/image'
import { navItems } from '@/data/putr'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* ── Mobile header (< lg) ── */}
      <header className="sticky top-0 z-50 lg:hidden bg-red-600/95 backdrop-blur-md border-b border-red-700 shadow-sm">
        <div className="flex items-center justify-between px-4 h-14">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image src="/images/logo.jpeg" alt="Logo PUTR Sumenep" fill className="object-contain rounded-lg" />
            </div>
            <div className="leading-tight">
              <p className="text-xs font-bold text-[#E0A82E] tracking-wide">PUTR SUMENEP</p>
              <p className="text-[9px] text-red-100 leading-none">Dinas PU & Tata Ruang Sumenep</p>
            </div>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-9 h-9 rounded-xl border border-red-400 flex items-center justify-center text-white hover:border-[#E0A82E] hover:text-[#E0A82E] transition-all"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <nav className="border-t border-red-700 bg-red-600 shadow-md">
            {navItems.map(({ id, label, Icon, href }) => (
              <a
                key={id}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-5 py-3.5 text-sm text-white hover:text-[#E0A82E] hover:bg-[rgba(255,255,255,0.1)] transition-all border-b border-red-700"
              >
                <Icon size={16} />
                {label}
              </a>
            ))}
            <div className="p-4">
              <button className="w-full py-2.5 rounded-xl bg-gold-gradient text-black text-sm font-bold flex items-center justify-center gap-2 shadow-gold">
                <Bot size={16} />
                Tanya AI PUTR
              </button>
            </div>
          </nav>
        )}
      </header>

      {/* ── Desktop top nav (≥ lg) ── */}
      <header className="hidden lg:block sticky top-0 z-50 bg-red-600/95 backdrop-blur-md border-b border-red-700 shadow-sm">
        <div className="max-w-[1280px] mx-auto px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 flex-shrink-0">
              <Image src="/images/logo.jpeg" alt="Logo PUTR Sumenep" fill className="object-contain rounded-xl" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-bold text-[#E0A82E] tracking-wider">PUTR SUMENEP</p>
              <p className="text-[10px] text-red-100">Dinas Pekerjaan Umum dan Tata Ruang Sumenep</p>
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-1">
            {navItems.map(({ id, label, href }) => (
              <a
                key={id}
                href={href}
                className="px-4 py-2 rounded-xl text-sm text-white hover:text-[#E0A82E] hover:bg-[rgba(255,255,255,0.12)] transition-all font-medium"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-gradient text-black text-sm font-bold shadow-gold hover:shadow-gold-lg hover:scale-105 transition-all">
            <Bot size={15} />
            Tanya AI PUTR
          </button>
        </div>
      </header>
    </>
  )
}
