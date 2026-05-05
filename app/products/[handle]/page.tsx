import { shopifyFetch } from '@/lib/shopify'
import { GET_PRODUCT_BY_HANDLE } from '@/lib/queries'
import ProductClient from '@/components/ProductClient'
import { headers, cookies } from 'next/headers'
import { getT } from '@/lib/i18n.server'

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params
  const headersList = await headers()
  const cookieStore = await cookies()
  const t = await getT('product')

  // Leggi il paese dal cookie o dall'header
  const country = cookieStore.get('x-country')?.value 
    ?? headersList.get('x-country') 
    ?? 'IT'

  let product = null
  try {
    const data = await shopifyFetch(GET_PRODUCT_BY_HANDLE, { 
      handle,
      country,  // ← passa il paese per avere la valuta locale
    })
    product = data?.product
  } catch (e) {
    console.error('Product load error')
  }

  if (!product) {
    return (
      <div style={{
        minHeight: '100vh', background: '#f5f5f5',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '1rem',
      }}>
        <span style={{ fontFamily: "'CenturyGothic', sans-serif", fontSize: '5rem', color: 'rgba(0,0,0,0.06)' }}>404</span>
        <p style={{ fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.25)' }}>
          {t('notFound')}
        </p>
      </div>
    )
  }

  return <ProductClient product={product} />
}