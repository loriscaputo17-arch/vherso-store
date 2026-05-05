import { shopifyFetch } from '@/lib/shopify'
import { GET_COLLECTION_BY_HANDLE } from '@/lib/queries'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'
import { headers, cookies } from 'next/headers'

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params
  const headersList = await headers()
  const cookieStore = await cookies()
  const country = cookieStore.get('x-country')?.value 
    ?? headersList.get('x-country') 
    ?? 'IT'

  let collection = null
  try {
    const data = await shopifyFetch(GET_COLLECTION_BY_HANDLE, { 
      handle, 
      first: 48,
      country,
    })
    collection = data?.collection

  } catch (e) {
    console.error('Collection load error')
  }

  if (!collection) {
    return (
      <div style={{
        minHeight: '100vh', background: '#f5f5f5',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '1rem',
      }}>
        <span style={{ fontFamily: "'CenturyGothic', sans-serif", fontSize: '5rem', color: 'rgba(0,0,0,0.06)' }}>404</span>
        <p style={{ fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.25)' }}>
          Collection not found
        </p>
      </div>
    )
  }

  const products = collection.products?.edges ?? []

  return (
    <>
      <style>{`
        .col-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 2px; padding: 2px; background: rgba(0,0,0,0.06);
        }
        .col-header-bg {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'CenturyGothic', sans-serif;
          font-size: clamp(80px, 9vw, 220px);
          color: rgba(0,0,0,0.03); white-space: nowrap;
          user-select: none; letter-spacing: 0.05em; pointer-events: none;
        }
        .col-empty {
          grid-column: 1 / -1; padding: 6rem 2rem;
          text-align: center; background: #f5f5f5;
        }
        @media (max-width: 1024px) { .col-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px) {
          .col-grid { grid-template-columns: repeat(2, 1fr); }
          .col-header { padding: 6rem 1.5rem 0 !important; }
        }
        @media (max-width: 480px) { .col-grid { grid-template-columns: repeat(2, 1fr); gap: 1px; padding: 1px; } }
      `}</style>

      <div style={{ background: '#f5f5f5', minHeight: '100vh' }}>

        {/* HEADER */}
        <div className="col-header" style={{
          padding: '8rem 2rem 0', position: 'relative',
          overflow: 'hidden', borderBottom: '1px solid rgba(0,0,0,0.06)',
          background: '#efefef',
        }}>
          <div className="col-header-bg">{collection.title.toUpperCase()}</div>

          <div style={{ position: 'relative', zIndex: 2 }}>
            {/* BREADCRUMB */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {[
                { label: 'Home', href: '/' },
                { label: 'Shop', href: '/shop' },
                { label: collection.title, href: '#' },
              ].map(({ label, href }, i, arr) => (
                <span key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Link href={href} style={{
                    fontSize: '0.55rem', letterSpacing: '0.15em',
                    textTransform: 'uppercase', textDecoration: 'none',
                    color: i === arr.length - 1 ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.2)',
                  }}>
                    {label}
                  </Link>
                  {i < arr.length - 1 && <span style={{ color: 'rgba(0,0,0,0.15)', fontSize: '0.55rem' }}>/</span>}
                </span>
              ))}
            </div>

            {/* TITLE + META */}
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'flex-end', paddingBottom: '2.5rem',
              flexWrap: 'wrap', gap: '1rem',
            }}>
              <div>
                <p style={{
                  fontSize: '0.6rem', letterSpacing: '0.25em',
                  textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)',
                  marginBottom: '1rem', fontFamily: "'CenturyGothic', sans-serif",
                }}>
                  VHERSO — Collection
                </p>
                <h1 style={{
                  fontFamily: "'CenturyGothic', sans-serif",
                  fontSize: 'clamp(2.5rem, 4vw, 10rem)',
                  fontWeight: 700, lineHeight: 0.88,
                  letterSpacing: '-0.01em', color: '#080808',
                }}>
                  {collection.title.toUpperCase()}<br />
                  <span style={{ fontSize: 'clamp(1.5rem, 2vw, 5rem)', color: 'rgba(0,0,0,0.18)', fontWeight: 400 }}>SS26</span>
                </h1>
                {collection.description && (
                  <p style={{
                    fontSize: '0.8rem', lineHeight: 1.8,
                    color: 'rgba(0,0,0,0.4)', maxWidth: '400px',
                    marginTop: '1rem', fontFamily: "'CenturyGothic', sans-serif",
                  }}>
                    {collection.description}
                  </p>
                )}
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.25)', fontFamily: "'CenturyGothic', sans-serif" }}>
                  {products.length} styles
                </p>
                <p style={{ fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.25)', fontFamily: "'CenturyGothic', sans-serif", marginTop: '0.3rem' }}>
                  SS26 Collection
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* COLLECTION IMAGE */}
        {collection.image && (
          <div style={{ height: '50vh', overflow: 'hidden', position: 'relative' }}>
            <img
              src={collection.image.url}
              alt={collection.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, transparent 50%, rgba(245,245,245,1) 100%)',
            }} />
          </div>
        )}

        {/* RESULTS BAR */}
        <div style={{
          padding: '1.2rem 2rem',
          borderBottom: '1px solid rgba(0,0,0,0.04)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: '#f5f5f5',
        }}>
          <p style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.25)', fontFamily: "'CenturyGothic', sans-serif" }}>
            {products.length} results
          </p>
          <Link href="/shop" style={{
            fontSize: '0.58rem', letterSpacing: '0.15em',
            textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)',
            textDecoration: 'none', fontFamily: "'CenturyGothic', sans-serif",
          }}>
            ← All products
          </Link>
        </div>

        {/* GRID */}
        {products.length === 0 ? (
          <div className="col-empty">
            <p style={{ fontFamily: "'CenturyGothic', sans-serif", fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.25)' }}>
              No products in this collection yet.
            </p>
          </div>
        ) : (
          <div className="col-grid">
            {products.map(({ node }: any) => (
              <ProductCard key={node.id} product={node} />
            ))}
          </div>
        )}

      </div>
    </>
  )
}