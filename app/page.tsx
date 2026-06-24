import Header from '@/components/Header'
import BottomNav from '@/components/BottomNav'
import HeroKadis from '@/components/HeroKadis'
import KategoriCards from '@/components/KategoriCards'
import PengaduanSection from '@/components/PengaduanSection'
import GaleriPreview from '@/components/GaleriPreview'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pb-20 lg:pb-0 min-h-screen bg-[#0d0f14]">
        <HeroKadis />
        <div className="max-w-6xl mx-auto">
          <PengaduanSection />
          <KategoriCards />
          <GaleriPreview />
        </div>
      </main>
      <Footer />
      <BottomNav />
    </>
  )
}
