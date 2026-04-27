import { shopifyFetch } from '@/lib/shopify'
import { GET_PRODUCTS, GET_COLLECTIONS } from '@/lib/queries'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'
import { headers } from 'next/headers'
import { getT } from '@/lib/i18n.server'

export default async function HomePage() {
  const headersList = await headers()
  let products: any[] = []
  let collections: any[] = []

  const t = await getT('home')
  const tn = await getT('ticker')
  const th = await getT('hero')

  try {
    const productsData = await shopifyFetch(GET_PRODUCTS, { first: 8 }, headersList)
    const collectionsData = await shopifyFetch(GET_COLLECTIONS, { first: 6 }, headersList)
    products = productsData?.products?.edges ?? []
    collections = collectionsData?.collections?.edges ?? []
  } catch (e) {
    console.error('Shopify not connected yet')
  }

  return (
    <div style={{ background: '#f5f5f5' }}>

      {/* HERO */}
      <section style={{
        height: '100vh', position: 'relative',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '3rem 2rem',
        background: '#efefef',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: "'CenturyGothic', sans-serif",
          fontSize: 'clamp(160px, 28vw, 400px)',
          fontWeight: 400, lineHeight: 0.85,
          color: 'rgba(0,0,0,0.04)',
          whiteSpace: 'nowrap', userSelect: 'none',
          letterSpacing: '-0.02em', zIndex: 0,
        }}>
          VHERSO
        </div>

        <div style={{
          position: 'absolute', top: '6rem', left: '2rem', zIndex: 2,
          display: 'flex', alignItems: 'center', gap: '0.8rem',
        }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#000' }} />
          <span style={{
            fontSize: '0.90rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)',
          }}>
            {th('drop')}
          </span>
        </div>

        <div style={{
          position: 'relative', zIndex: 2,
          display: 'grid', gridTemplateColumns: '1fr auto',
          alignItems: 'flex-end', gap: '2rem',
        }}>
          <div>
            <h1 style={{
              fontFamily: "'CenturyGothic', sans-serif",
              fontSize: 'clamp(3rem, 8vw, 10rem)',
              fontWeight: 700, lineHeight: 0.88,
              letterSpacing: '0.01em', color: '#080808',
            }}>
              SUMMER<br />COLLECTION
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '2rem' }}>
              <Link href="/shop" style={{
                background: '#080808', color: '#f5f5f5',
                padding: '0.9rem 2.2rem',
                fontSize: '0.72rem', letterSpacing: '0.15em',
                textTransform: 'uppercase', fontWeight: 500,
                display: 'inline-block',
              }}>
                {th('shopNow')}
              </Link>
              <Link href="/shop" style={{
                fontSize: '0.72rem', letterSpacing: '0.15em',
                textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}>
                {th('allDrops')} <span style={{ fontSize: '1rem' }}>→</span>
              </Link>
            </div>
          </div>
          <div style={{ textAlign: 'right', paddingBottom: '0.5rem' }}>
            <p style={{
              fontSize: '0.7rem', letterSpacing: '0.08em',
              color: 'rgba(0,0,0,0.3)', lineHeight: 1.8,
              maxWidth: '180px', marginLeft: 'auto',
              whiteSpace: 'pre-line',
            }}>
              {th('tagline')}
            </p>
          </div>
        </div>

        <div style={{
          position: 'absolute', bottom: '2rem', right: '2rem',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '0.5rem', zIndex: 2,
        }}>
          <div style={{
            width: '1px', height: '60px',
            background: 'rgba(0,0,0,0.15)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 0, width: '100%',
              height: '40%', background: '#080808',
              animation: 'scrollLine 1.8s ease infinite',
            }} />
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div style={{
        background: '#080808', color: '#f5f5f5',
        height: '36px', overflow: 'hidden',
        display: 'flex', alignItems: 'center',
      }}>
        <div style={{
          display: 'flex', animation: 'ticker 20s linear infinite',
          whiteSpace: 'nowrap',
        }}>
          {Array(4).fill([
            tn('shipping'), '★',
            tn('newDrop'), '★',
            tn('skiGone'), '★',
            tn('returns'), '★',
          ]).flat().map((text, i) => (
            <span key={i} style={{
              fontSize: '0.58rem', letterSpacing: '0.2em',
              padding: '0 1.5rem', fontWeight: 500,
              fontFamily: "'CenturyGothic', sans-serif",
            }}>
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* COLLECTIONS */}
      {collections.length > 0 && (
        <section style={{ padding: '4rem 0' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', padding: '0 2rem', marginBottom: '2rem',
          }}>
            <h2 style={{
              fontFamily: "'CenturyGothic', sans-serif",
              fontSize: 'clamp(2.5rem, 4vw, 4rem)',
              fontWeight: 700, letterSpacing: '0.02em', color: '#080808',
            }}>
              {t('collections')}
            </h2>
            <Link href="/shop" style={{
              fontSize: '0.65rem', letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)',
            }}>
              {t('all')}
            </Link>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: collections.length >= 3 ? '1.5fr 1fr 1fr' : `repeat(${Math.min(collections.length, 3)}, 1fr)`,
            gap: '2px', padding: '0 2rem',
          }}>
            {collections.slice(0, 3).map(({ node }: any, i: number) => (
              <Link key={node.id} href={`/collections/${node.handle}`} style={{
                position: 'relative',
                aspectRatio: i === 0 ? '2/3' : '3/4',
                background: '#ddd', overflow: 'hidden', display: 'block',
              }}>
                {node.image && (
                  <img src={node.image.url} alt={node.title} style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                  }} />
                )}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)',
                }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem' }}>
                  <p style={{
                    fontFamily: "'CenturyGothic', sans-serif",
                    fontSize: i === 0 ? '3rem' : '2rem',
                    color: '#fff', lineHeight: 1, letterSpacing: '0.03em',
                  }}>
                    {node.title.toUpperCase()}
                  </p>
                  <p style={{
                    fontSize: '0.62rem', letterSpacing: '0.15em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)',
                    marginTop: '0.4rem',
                  }}>
                    {node.products?.edges?.length ?? 0} {t('styles')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* MARQUEE DIVIDER */}
      <div style={{
        overflow: 'hidden', padding: '2rem 0',
        borderTop: '1px solid rgba(0,0,0,0.06)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}>
        <div style={{
          display: 'flex', animation: 'ticker 15s linear infinite',
          whiteSpace: 'nowrap',
        }}>
          {Array(6).fill('VHERSO — CLUB LIFESTYLE — SS26 — ').map((text, i) => (
            <span key={i} style={{
              fontFamily: "'CenturyGothic', sans-serif",
              fontSize: '4rem', letterSpacing: '0.05em',
              color: 'rgba(0,0,0,0.05)', paddingRight: '2rem',
            }}>
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* BEST SELLERS */}
      <section style={{ padding: '4rem 0' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', padding: '0 2rem', marginBottom: '2rem',
        }}>
          <h2 style={{
            fontFamily: "'CenturyGothic', sans-serif",
              fontSize: 'clamp(2.5rem, 4vw, 4rem)',
              fontWeight: 700, letterSpacing: '0.02em', color: '#080808',
          }}>
            {t('bestSellers')}
          </h2>
          <Link href="/shop" style={{
            fontSize: '0.65rem', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)',
          }}>
            {t('viewAll')}
          </Link>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '2px', padding: '0 2rem',
        }}>
          {products.slice(0, 4).map(({ node }: any) => (
            <ProductCard key={node.id} product={node} />
          ))}
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section style={{
        padding: '4rem 2rem',
        borderTop: '1px solid rgba(0,0,0,0.06)',
      }}>
        <h2 style={{
          fontFamily: "'CenturyGothic', sans-serif",
          fontSize: 'clamp(2.5rem, 4vw, 4rem)',
          fontWeight: 700, letterSpacing: '0.02em',
          marginBottom: '2rem', color: '#080808',
        }}>
          {t('shopByCategory')}
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '2px',
        }}>
          {[
            { label: 'HOODIES', count: 14, href: '/collections/hoodie' },
            { label: 'TEES', count: 8, href: '/collections/tees' },
            { label: 'PANTS', count: 10, href: '/collections/pants' },
            { label: 'ZIP-UPS', count: 9, href: '/collections/zip-up' },
            { label: 'CANVAS', count: 4, href: '/collections/canvas' },
          ].map(({ label, count, href }, i) => (
            <Link key={label} href={href} style={{
              background: i % 2 === 0 ? '#e8e8e8' : '#ebebeb',
              padding: '2rem 1.2rem',
              display: 'flex', flexDirection: 'column',
              justifyContent: 'flex-end', minHeight: '180px',
            }}>
              <p style={{
                fontFamily: "'CenturyGothic', sans-serif",
                fontSize: 'clamp(1.2rem, 2vw, 2rem)',
                letterSpacing: '0.04em',
                color: '#080808', lineHeight: 1,
                wordBreak: 'break-word',
              }}>
                {label}
              </p>
              <p style={{
                fontSize: '0.58rem', letterSpacing: '0.15em',
                textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)',
                marginTop: '0.4rem',
              }}>
                {count} {t('shopByCategory') === 'SHOP BY CATEGORY' ? 'styles' : 'stili'}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section style={{
        padding: '4rem 0',
        borderTop: '1px solid rgba(0,0,0,0.06)',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', padding: '0 2rem', marginBottom: '2rem',
        }}>
          <h2 style={{
            fontFamily: "'CenturyGothic', sans-serif",
            fontSize: 'clamp(2.5rem, 4vw, 4rem)',
            fontWeight: 700, letterSpacing: '0.02em', color: '#080808',
          }}>
            {t('newArrivals')}
          </h2>
          <Link href="/shop" style={{
            fontSize: '0.65rem', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)',
          }}>
            {t('seeAll')}
          </Link>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2px', padding: '0 2rem',
        }}>
          {products.slice(4, 7).map(({ node }: any) => (
            <ProductCard key={node.id} product={node} />
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          minHeight: '80vh',
        }}>
          <div style={{
            background: '#e8e8e8', position: 'relative',
            minHeight: '400px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}>
            <span style={{
              fontFamily: "'CenturyGothic', sans-serif",
              fontSize: 'clamp(6rem, 18vw, 16rem)',
              color: 'rgba(0,0,0,0.04)',
              letterSpacing: '0.1em', fontWeight: 900, userSelect: 'none',
            }}>V</span>
            <div style={{
              position: 'absolute', bottom: '2rem', left: '2rem',
              fontSize: '0.55rem', letterSpacing: '0.22em',
              textTransform: 'uppercase', color: 'rgba(0,0,0,0.25)',
            }}>
              {t('est')}
            </div>
          </div>

          <div style={{
            padding: 'clamp(3rem, 6vw, 6rem) clamp(2rem, 5vw, 5rem)',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            background: '#f5f5f5',
          }}>
            <p style={{
              fontSize: '0.58rem', letterSpacing: '0.25em',
              textTransform: 'uppercase', color: 'rgba(0,0,0,0.25)',
              marginBottom: '1.5rem',
            }}>
              {t('aboutTag')}
            </p>
            <h2 style={{
              fontFamily: "'CenturyGothic', sans-serif",
              fontSize: 'clamp(5rem, 5vw, 10rem)',
              fontWeight: 700, lineHeight: 0.88,
              letterSpacing: '0.01em', marginBottom: '2rem', color: '#080808',
              whiteSpace: 'pre-line',
            }}>
              {t('aboutTitle')}
            </h2>
            <p style={{
              fontSize: '0.8rem', lineHeight: 1.9,
              color: 'rgba(0,0,0,0.45)',
              maxWidth: '360px', marginBottom: '3rem',
            }}>
              {t('aboutText')}
            </p>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1.5rem', marginBottom: '3rem',
              paddingBottom: '3rem',
              borderBottom: '1px solid rgba(0,0,0,0.06)',
            }}>
              {[['40+', 'Styles'], ['60+', 'Countries'], ['100%', 'Independent']].map(([num, label]) => (
                <div key={label}>
                  <p style={{
                    fontFamily: "'CenturyGothic', sans-serif",
                    fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                    fontWeight: 700, color: '#080808', lineHeight: 1,
                    marginBottom: '0.4rem',
                  }}>
                    {num}
                  </p>
                  <p style={{
                    fontSize: '0.58rem', letterSpacing: '0.18em',
                    textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)',
                  }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <Link href="/about" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.8rem',
              background: '#080808', color: '#f5f5f5',
              padding: '1rem 2rem', alignSelf: 'flex-start',
              fontSize: '0.62rem', letterSpacing: '0.2em',
              textTransform: 'uppercase', fontWeight: 400,
              fontFamily: "'CenturyGothic', sans-serif",
            }}>
              {t('ourStory')}
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes scrollLine {
          0% { top: -100%; }
          100% { top: 200%; }
        }
      `}</style>

    </div>
  )
}