import Header from '@/components/Header'
import BottomNav from '@/components/BottomNav'
import HeroKadis from '@/components/HeroKadis'
import StatsStrip from '@/components/StatsStrip'
import KategoriCards from '@/components/KategoriCards'
import QuickTopics from '@/components/QuickTopics'
import PengaduanSection from '@/components/PengaduanSection'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pb-20 lg:pb-0 min-h-screen bg-[#0d0f14]">
        <HeroKadis />
        <div className="max-w-6xl mx-auto">
          <StatsStrip />
          <KategoriCards />
          <QuickTopics />
          <PengaduanSection />
        </div>
      </main>
      <Footer />
      <BottomNav />
      <WhatsAppButton />
    </>
  )
}
