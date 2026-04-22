import type { Metadata } from 'next'
import { CartProvider } from '@/context/CartContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Cart from '@/components/Cart'
import './globals.css'
import NewsletterPopup from '@/components/NewsletterPopup'
import PageLoader from '@/components/PageLoader'
import { getLocale } from '@/lib/i18n.server'

export const metadata: Metadata = {
  title: 'VHERSO — Club Lifestyle',
  description: 'A lifestyle built around those who wear feeling, not just clothing.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()

  return (
    <html lang={locale}>
      <body style={{
        margin: 0,
        background: '#0a0a0a',
        color: '#fafafa',
        fontFamily: "'CenturyGothic', sans-serif",
        fontWeight: 300,
      }}>
        <CartProvider>
          <PageLoader />
          <Navbar />
          <Cart />
          <NewsletterPopup />
          <main style={{ paddingTop: '64px' }}>
            {children}
          </main>
        </CartProvider>
        <Footer />
      </body>
    </html>
  )
}