import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import BottomNav from '@/components/BottomNav'

/* Leaflet butuh window — wajib SSR false */
const MapClient = dynamic(() => import('@/components/MapClient'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#0d0f14]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-[#E0A82E] border-t-transparent animate-spin" />
        <p className="text-sm text-gray-400">Memuat peta…</p>
      </div>
    </div>
  ),
})

export default function PetaPage() {
  return (
    <>
      <Header />

      <main className="flex flex-col bg-[#0d0f14]" style={{ height: 'calc(100dvh - 56px)' }}>
        {/* Title bar */}
        <div
          className="flex-shrink-0 px-5 py-3 flex items-center gap-3 border-b"
          style={{ background: '#111318', borderColor: 'rgba(224,168,46,0.15)' }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(224,168,46,0.12)', border: '1px solid rgba(224,168,46,0.3)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E0A82E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
              <line x1="9" y1="3" x2="9" y2="18"/>
              <line x1="15" y1="6" x2="15" y2="21"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-[#E0A82E] tracking-wider leading-none">PETA INFRASTRUKTUR</p>
            <p className="text-[10px] text-gray-500 mt-0.5">Kabupaten Sumenep · Jawa Timur</p>
          </div>
          <div className="ml-auto flex items-center gap-4 text-[10px] text-gray-500">
            <span><span className="text-blue-400 font-bold">●</span> Jalan</span>
            <span><span className="text-amber-400 font-bold">●</span> Jembatan</span>
            <span><span className="text-cyan-400 font-bold">●</span> Embung</span>
          </div>
        </div>

        {/* Peta — sisa tinggi layar */}
        <div className="flex-1 relative">
          <MapClient />
        </div>
      </main>

      {/* BottomNav mobile */}
      <BottomNav />
    </>
  )
}
