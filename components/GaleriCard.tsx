'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Props {
  title: string
  lokasi: string
  tahun: number
  kategori: string
  status: 'Selesai' | 'Berjalan'
  beforeSrc: string
  afterSrc: string
}

const KATEGORI_COLOR: Record<string, string> = {
  Jalan:    '#3B82F6',
  Jembatan: '#F59E0B',
  Drainase: '#06B6D4',
  Gedung:   '#8B5CF6',
  Embung:   '#10B981',
}

export default function GaleriCard({ title, lokasi, tahun, kategori, status, beforeSrc, afterSrc }: Props) {
  const [mode, setMode] = useState<'before' | 'after'>('before')
  const color = KATEGORI_COLOR[kategori] ?? '#E0A82E'

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: 'linear-gradient(145deg, #1a1d26 0%, #111318 100%)',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
      }}
    >
      {/* Header */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center gap-2 mb-2">
          <span
            className="text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-wide"
            style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}
          >
            {kategori.toUpperCase()}
          </span>
          <span
            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-wide ${
              status === 'Selesai'
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
            }`}
          >
            {status === 'Selesai' ? '✓ SELESAI' : '⟳ BERJALAN'}
          </span>
        </div>
        <h3 className="text-sm font-bold text-gray-100 leading-snug">{title}</h3>
        <p className="text-[11px] text-gray-500 mt-0.5">📍 {lokasi} · {tahun}</p>
      </div>

      {/* Toggle SEBELUM / SESUDAH */}
      <div className="px-4 pb-3">
        <div
          className="flex gap-1 p-1 rounded-xl"
          style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          {(['before', 'after'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="flex-1 py-1.5 rounded-lg text-[11px] font-extrabold tracking-widest transition-all duration-200"
              style={
                mode === m
                  ? { background: '#E0A82E', color: '#000' }
                  : { color: '#6b7280' }
              }
            >
              {m === 'before' ? 'SEBELUM' : 'SESUDAH'}
            </button>
          ))}
        </div>
      </div>

      {/* Image container — crossfade */}
      <div className="relative w-full aspect-video overflow-hidden">
        {/* SEBELUM */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: mode === 'before' ? 1 : 0, pointerEvents: mode === 'before' ? 'auto' : 'none' }}
        >
          <Image src={beforeSrc} alt={`Sebelum — ${title}`} fill className="object-cover" unoptimized />
          <div className="absolute top-2 left-2 bg-black/60 text-white text-[9px] font-bold px-2 py-1 rounded-lg tracking-widest backdrop-blur-sm">
            SEBELUM
          </div>
        </div>

        {/* SESUDAH */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: mode === 'after' ? 1 : 0, pointerEvents: mode === 'after' ? 'auto' : 'none' }}
        >
          <Image src={afterSrc} alt={`Sesudah — ${title}`} fill className="object-cover" unoptimized />
          <div
            className="absolute top-2 left-2 text-[9px] font-bold px-2 py-1 rounded-lg tracking-widest"
            style={{ background: '#E0A82E', color: '#000' }}
          >
            SESUDAH
          </div>
        </div>
      </div>
    </div>
  )
}
