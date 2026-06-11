'use client'

import { useState } from 'react'
import Image from 'next/image'

// Ganti dengan nomor WhatsApp resmi PUTR Sumenep (format internasional tanpa +)
const WA_NUMBER = '6281234567890'
const WA_MESSAGE = 'Halo PUTR Sumenep, saya ingin menyampaikan pengaduan mengenai infrastruktur di Kabupaten Sumenep.'

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false)

  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Pengaduan via WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="
        fixed right-4 lg:right-6 z-50
        bottom-[88px] lg:bottom-6
        flex items-center gap-3 group
      "
    >
      {/* Tooltip — desktop hover */}
      <div
        className={`
          hidden lg:block
          bg-white text-gray-700 rounded-2xl shadow-lg border border-gray-100
          px-4 py-2.5 text-xs whitespace-nowrap
          transition-all duration-200 origin-right
          ${hovered ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-95 translate-x-1 pointer-events-none'}
        `}
      >
        <p className="font-bold text-gray-900 text-[11px]">Pengaduan Online</p>
        <p className="text-gray-400 text-[10px] mt-0.5">Chat via WhatsApp</p>
      </div>

      {/* Tombol utama — gambar CHAT PENGADUAN PUTR SUMENEP */}
      <div className="relative flex-shrink-0">
        {/* Ping glow */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />

        <div
          className="
            relative w-16 h-16 rounded-full overflow-hidden
            shadow-[0_4px_20px_rgba(0,0,0,0.2)]
            hover:scale-110 active:scale-95
            transition-transform duration-150
          "
        >
          <Image
            src="/images/CHAT PENGADUAN PUTR SUMENEP.jpeg"
            alt="Chat Pengaduan PUTR Sumenep"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </a>
  )
}
