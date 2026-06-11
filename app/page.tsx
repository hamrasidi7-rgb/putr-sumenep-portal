import Header from '@/components/Header'
import BottomNav from '@/components/BottomNav'
import HeroKadis from '@/components/HeroKadis'
import KategoriCards from '@/components/KategoriCards'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="pb-20 lg:pb-0 min-h-screen">
        <HeroKadis />
        <KategoriCards />
      </main>

      <Footer />
      <BottomNav />
      <WhatsAppButton />
    </>
  )
}
