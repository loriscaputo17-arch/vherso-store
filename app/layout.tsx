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
import CookieBanner from '@/components/CookieBanner'

const OG_LOCALES: Record<string, string> = {
  it: 'it_IT', en: 'en_US', fr: 'fr_FR',
  de: 'de_DE', es: 'es_ES', sv: 'sv_SE',
  nl: 'nl_NL', pt: 'pt_PT', pl: 'pl_PL',
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const ogLocale = OG_LOCALES[locale] ?? 'en_US'

  return {
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
    alternates: { canonical: '/' },
    openGraph: {
      type: 'website',
      locale: ogLocale,
      url: 'https://vhersoclo.com',
      siteName: 'VHERSO',
      title: 'VHERSO — Club Lifestyle',
      description: 'Contemporary club lifestyle brand. Limited drops, premium streetwear and art-driven collections.',
      images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'VHERSO — Club Lifestyle' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'VHERSO — Club Lifestyle',
      description: 'Contemporary club lifestyle brand. Limited drops, premium streetwear and art-driven collections.',
      images: ['/images/og-image.jpg'],
      creator: '@vhersoo',
    },
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    icons: { icon: '/favicon.ico', shortcut: '/favicon.ico', apple: '/apple-touch-icon.png' },
    verification: { google: 'JGL1PE8TZY' },
  }
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

        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '2053948174983095');
          fbq('track', 'PageView');
        `}</Script>
        <noscript>
          <img height="1" width="1" style={{display:'none'}}
            src="https://www.facebook.com/tr?id=2053948174983095&ev=PageView&noscript=1"
          />
        </noscript>
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
          <CookieBanner />
        </CartProvider>
        <Footer />
      </body>
    </html>
  )
}