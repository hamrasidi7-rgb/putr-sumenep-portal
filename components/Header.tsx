'use client'

import { useState } from 'react'
import { Menu, X, Bot, Building2 } from 'lucide-react'
import { navItems } from '@/data/putr'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* ── Mobile header (< lg) ── */}
      <header className="sticky top-0 z-50 lg:hidden bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[rgba(224,168,46,0.12)]">
        <div className="flex items-center justify-between px-4 h-14">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gold-gradient flex items-center justify-center shadow-gold flex-shrink-0">
              <Building2 size={16} className="text-black" />
            </div>
            <div className="leading-tight">
              <p className="text-xs font-bold text-[#E0A82E] tracking-wide">PUTR SUMENEP</p>
              <p className="text-[9px] text-gray-400 leading-none">Dinas Pekerjaan Umum & Penataan Ruang</p>
            </div>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-9 h-9 rounded-xl border border-[rgba(224,168,46,0.2)] flex items-center justify-center text-gray-300 hover:border-[#E0A82E] hover:text-[#E0A82E] transition-all"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <nav className="border-t border-[rgba(224,168,46,0.12)] bg-[#0f0f0f]">
            {navItems.map(({ id, label, Icon, href }) => (
              <a
                key={id}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-5 py-3.5 text-sm text-gray-300 hover:text-[#E0A82E] hover:bg-[rgba(224,168,46,0.06)] transition-all border-b border-[rgba(255,255,255,0.04)]"
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
      <header className="hidden lg:block sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[rgba(224,168,46,0.12)]">
        <div className="max-w-[1280px] mx-auto px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gold-gradient flex items-center justify-center shadow-gold">
              <Building2 size={18} className="text-black" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-bold text-[#E0A82E] tracking-wider">PUTR SUMENEP</p>
              <p className="text-[10px] text-gray-400">Dinas Pekerjaan Umum & Penataan Ruang</p>
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-1">
            {navItems.map(({ id, label, href }) => (
              <a
                key={id}
                href={href}
                className="px-4 py-2 rounded-xl text-sm text-gray-300 hover:text-[#E0A82E] hover:bg-[rgba(224,168,46,0.08)] transition-all font-medium"
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
