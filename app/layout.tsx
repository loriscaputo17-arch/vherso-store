import type { Metadata } from 'next'
import { CartProvider } from '@/context/CartContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Cart from '@/components/Cart'
import './globals.css'
import NewsletterPopup from '@/components/NewsletterPopup'
import PageLoader from '@/components/PageLoader'
import { getLocale } from '@/lib/i18n.server'
import Script from 'next/script'

export const metadata: Metadata = {
  title: {
    default: 'VHERSO — Club Lifestyle',
    template: '%s | VHERSO',
  },
  description: 'VHERSO is a contemporary club lifestyle brand. Discover limited drops, premium streetwear and art-driven collections — ski slopes, rooftops, late dinners.',
  keywords: ['VHERSO', 'club lifestyle', 'streetwear', 'limited edition', 'fashion', 'Milan', 'ski collection', 'summer capsule'],
  authors: [{ name: 'VHERSO', url: 'https://vhersoclo.com' }],
  creator: 'VHERSO',
  publisher: 'VHERSO',
  metadataBase: new URL('https://vhersoclo.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://vhersoclo.com',
    siteName: 'VHERSO',
    title: 'VHERSO — Club Lifestyle',
    description: 'Contemporary club lifestyle brand. Limited drops, premium streetwear and art-driven collections.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'VHERSO — Club Lifestyle',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VHERSO — Club Lifestyle',
    description: 'Contemporary club lifestyle brand. Limited drops, premium streetwear and art-driven collections.',
    images: ['/images/og-image.jpg'],
    creator: '@vhersoo',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: 'JGL1PE8TZY',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()

  return (
    <html lang={locale}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JGL1PE8TZY"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-JGL1PE8TZY');
        `}</Script>
      </head>
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
          <main style={{ paddingTop: '20px' }}>
            {children}
          </main>
        </CartProvider>
        <Footer />
      </body>
    </html>
  )
}