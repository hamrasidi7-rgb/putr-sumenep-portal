import Header from '@/components/Header'
import BottomNav from '@/components/BottomNav'
import HeroKadis from '@/components/HeroKadis'
import ChatAIPUTR from '@/components/ChatAIPUTR'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="pb-20 lg:pb-0 min-h-screen">
        <HeroKadis />

        <div className="max-w-[1280px] mx-auto lg:px-8">
          <ChatAIPUTR />
        </div>
      </main>

      <Footer />
      <BottomNav />
      <WhatsAppButton />
    </>
  )
}
