'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import { navItems } from '@/data/putr'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* ── Mobile header (< lg) ── */}
      <header className="sticky top-0 z-50 lg:hidden bg-orange-400 border-b border-orange-500 shadow-md">
        <div className="flex items-center justify-between px-4 h-14">

          {/* Logo PUTR */}
          <div className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image src="/images/logo.jpeg" alt="Logo PUTR Sumenep" fill className="object-contain rounded-lg" />
            </div>
            <div className="leading-tight">
              <p className="text-[15px] font-extrabold text-white tracking-wide drop-shadow">PUTR SUMENEP</p>
              <p className="text-[9px] text-orange-100 leading-none">Dinas PU & Tata Ruang Sumenep</p>
            </div>
          </div>

          {/* Kanan: Logo Sumekar + Hamburger */}
          <div className="flex items-center gap-2">
            <div className="relative w-12 h-12 flex-shrink-0" style={{ transform: 'translateX(-20%)' }}>
              <Image src="/images/LOGO SUMEKAR.png" alt="Logo Sumekar Sumenep" fill className="object-contain mix-blend-multiply" />
            </div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-9 h-9 rounded-xl border border-orange-200 flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition-all"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <nav className="border-t border-orange-500 bg-orange-400 shadow-md">
            {navItems.map(({ id, label, Icon, href }) => (
              <a
                key={id}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-5 py-3.5 text-sm text-white hover:text-[#E0A82E] hover:bg-white/10 transition-all border-b border-orange-500/50"
              >
                <Icon size={16} />
                {label}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* ── Desktop top nav (≥ lg) ── */}
      <header className="hidden lg:block sticky top-0 z-50 bg-orange-400 border-b border-orange-500 shadow-md">
        <div className="max-w-[1280px] mx-auto px-8 h-16 flex items-center justify-between">

          {/* Logo PUTR */}
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 flex-shrink-0">
              <Image src="/images/logo.jpeg" alt="Logo PUTR Sumenep" fill className="object-contain rounded-xl" />
            </div>
            <div className="leading-tight">
              <p className="text-[18px] font-extrabold text-white tracking-wider drop-shadow">PUTR SUMENEP</p>
              <p className="text-[10px] text-orange-100">Dinas Pekerjaan Umum dan Tata Ruang Sumenep</p>
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-1">
            {navItems.map(({ id, label, href }) => (
              <a
                key={id}
                href={href}
                className="px-4 py-2 rounded-xl text-sm text-white hover:text-[#E0A82E] hover:bg-white/15 transition-all font-medium"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Logo Sumekar */}
          <div className="relative w-[60px] h-[60px] flex-shrink-0" style={{ transform: 'translateX(-20%)' }}>
            <Image src="/images/LOGO SUMEKAR.png" alt="Logo Sumekar Sumenep" fill className="object-contain mix-blend-multiply" />
          </div>
        </div>
      </header>
    </>
  )
}
