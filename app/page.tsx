import Header from '@/components/Header'
import BottomNav from '@/components/BottomNav'
import HeroCarousel from '@/components/HeroCarousel'
import QuickTopics from '@/components/QuickTopics'
import PengaduanSection from '@/components/PengaduanSection'
import ChatAIPUTR from '@/components/ChatAIPUTR'
import StatsStrip from '@/components/StatsStrip'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Header />

      <main
        className="
          pb-20 lg:pb-0
          min-h-screen
        "
      >
        {/* Hero */}
        <HeroCarousel />

        {/* ── Content container (desktop max-width centred) ── */}
        <div className="max-w-[1280px] mx-auto lg:px-8">

          {/* Stats — just below hero on desktop */}
          <StatsStrip />

          {/* Divider */}
          <div className="hidden lg:block h-px bg-[rgba(224,168,46,0.08)] my-2" />

          {/* AI PUTR + Quick Topics */}
          <QuickTopics />

          {/* Divider */}
          <div className="mx-4 lg:mx-0 h-px bg-[rgba(255,255,255,0.05)] my-1" />

          {/* Pengaduan */}
          <PengaduanSection />

          {/* Divider */}
          <div className="mx-4 lg:mx-0 h-px bg-[rgba(255,255,255,0.05)] my-1" />

          {/* Chat AI PUTR */}
          <ChatAIPUTR />

        </div>
      </main>

      <Footer />
      <BottomNav />
    </>
  )
}
