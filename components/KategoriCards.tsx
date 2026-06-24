'use client'

import { useState } from 'react'
import { Navigation, ArrowLeftRight, Droplets, Building2, LayoutDashboard, FlaskConical } from 'lucide-react'

const TOPICS = [
  {
    id: 'jalan',
    label: 'JALAN',
    Icon: Navigation,
    cardBg: 'linear-gradient(145deg, #1a2a48 0%, #0d1a30 100%)',
    borderColor: '#4a8fd4',
    iconBg: 'linear-gradient(145deg, #5b9bd5 0%, #3a72b0 100%)',
    glow: 'rgba(74,143,212,0.25)',
  },
  {
    id: 'jembatan',
    label: 'JEMBATAN',
    Icon: ArrowLeftRight,
    cardBg: 'linear-gradient(145deg, #2e1e08 0%, #1c1205 100%)',
    borderColor: '#d48a14',
    iconBg: 'linear-gradient(145deg, #e09c2a 0%, #b87810 100%)',
    glow: 'rgba(212,138,20,0.25)',
  },
  {
    id: 'drainase',
    label: 'DRAINASE',
    Icon: Droplets,
    cardBg: 'linear-gradient(145deg, #0b2626 0%, #061818 100%)',
    borderColor: '#2aacac',
    iconBg: 'linear-gradient(145deg, #3ab8b8 0%, #1a9090 100%)',
    glow: 'rgba(42,172,172,0.25)',
  },
  {
    id: 'gedung',
    label: 'GEDUNG',
    Icon: Building2,
    cardBg: 'linear-gradient(145deg, #0f2016 0%, #07130c 100%)',
    borderColor: '#3a9040',
    iconBg: 'linear-gradient(145deg, #4aaa50 0%, #2a8030 100%)',
    glow: 'rgba(58,144,64,0.25)',
  },
  {
    id: 'tata-ruang',
    label: 'TATA RUANG',
    Icon: LayoutDashboard,
    cardBg: 'linear-gradient(145deg, #1e1038 0%, #110a22 100%)',
    borderColor: '#8050c0',
    iconBg: 'linear-gradient(145deg, #9b68d8 0%, #7040b0 100%)',
    glow: 'rgba(128,80,192,0.25)',
  },
  {
    id: 'peralatan-lab',
    label: 'PERALATAN &\nLABORATORIUM',
    Icon: FlaskConical,
    cardBg: 'linear-gradient(145deg, #2e1020 0%, #1c0812 100%)',
    borderColor: '#c03060',
    iconBg: 'linear-gradient(145deg, #d85080 0%, #b02858 100%)',
    glow: 'rgba(192,48,96,0.25)',
  },
]

export default function KategoriCards() {
  const [showModal, setShowModal] = useState(false)
  const [activeLabel, setActiveLabel] = useState('')

  const handleClick = (label: string) => {
    setActiveLabel(label.replace('\n', ' '))
    setShowModal(true)
  }

  return (
    <>
      <section className="px-4 py-8 lg:px-8" style={{ background: '#0d0f14' }}>
        <div className="max-w-[860px] mx-auto">

          {/* Judul section */}
          <div className="mb-6">
            <h2 className="text-base lg:text-lg font-extrabold text-white tracking-wide leading-none">
              DATA & PROGRES <span className="text-gold-gradient">PUTR</span>
            </h2>
            <p className="text-[11px] text-gray-500 mt-1">Informasi dan progres pekerjaan per bidang</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {TOPICS.map(({ id, label, Icon, cardBg, borderColor, iconBg, glow }) => (
              <button
                key={id}
                onClick={() => handleClick(label)}
                className="relative rounded-3xl p-5 lg:p-7 flex flex-col items-center gap-4 text-center transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
                style={{
                  background: cardBg,
                  border: `1px solid ${borderColor}55`,
                  boxShadow: `0 0 24px ${glow}, inset 0 1px 0 rgba(255,255,255,0.07)`,
                }}
              >
                {/* Icon container */}
                <div
                  className="w-[72px] h-[72px] lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center"
                  style={{
                    background: iconBg,
                    boxShadow: `0 6px 16px ${glow}`,
                  }}
                >
                  <Icon size={34} className="text-white lg:hidden" strokeWidth={1.4} />
                  <Icon size={40} className="text-white hidden lg:block" strokeWidth={1.4} />
                </div>

                {/* Label */}
                <span
                  className="text-white font-bold text-sm lg:text-base tracking-widest leading-snug whitespace-pre-line"
                >
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Modal: MATERI DALAM PROSES */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="mx-6 max-w-xs w-full rounded-3xl p-8 text-center shadow-2xl"
            style={{
              background: 'linear-gradient(145deg, #1e2535 0%, #141920 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 0 60px rgba(224,168,46,0.15)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-[11px] text-gray-500 uppercase tracking-widest mb-2">{activeLabel}</p>
            <p className="text-2xl font-extrabold text-[#E0A82E] tracking-widest leading-tight">
              MATERI<br />DALAM PROSES
            </p>
            <p className="text-gray-400 text-xs mt-3 leading-relaxed">
              Konten sedang disiapkan.<br />Silakan cek kembali nanti.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-6 px-8 py-2.5 rounded-xl text-black text-sm font-extrabold tracking-wider transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(90deg, #E0A82E, #f0b840)' }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  )
}
