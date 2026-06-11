import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'PUTR Sumenep — Kota Untuk Kita',
  description:
    'Portal Digital Dinas Pekerjaan Umum dan Penataan Ruang Kabupaten Sumenep. Menata Kota dan Melayani Warga.',
  keywords:
    'PUTR Sumenep, infrastruktur, pembangunan, jalan, jembatan, kota untuk kita',
  authors: [{ name: 'PUTR Kabupaten Sumenep' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={jakarta.variable} suppressHydrationWarning>
      <body className="bg-[#0a0a0a] text-white font-jakarta antialiased min-h-screen">
        {children}
      </body>
    </html>
  )
}
