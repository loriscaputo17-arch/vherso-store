import type { Metadata } from 'next'
import { CartProvider } from '@/context/CartContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Cart from '@/components/Cart'
import './globals.css'
import NewsletterPopup from '@/components/NewsletterPopup'

export const metadata: Metadata = {
  title: 'VHERSO — Club Lifestyle',
  description: 'A lifestyle built around those who wear feeling, not just clothing.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body style={{
        margin: 0,
        background: '#0a0a0a',
        color: '#fafafa',
        fontFamily: "'Inter', sans-serif",
        fontWeight: 300,
      }}>
        <CartProvider>
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