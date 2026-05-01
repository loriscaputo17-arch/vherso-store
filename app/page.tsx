import { shopifyFetch } from '@/lib/shopify'
import { GET_PRODUCTS, GET_COLLECTIONS,GET_COLLECTION_BY_HANDLE } from '@/lib/queries'
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
    const productsData = await shopifyFetch(GET_COLLECTION_BY_HANDLE, { first: 8, handle: 'summer-collection' }, headersList)
    const collectionsData = await shopifyFetch(GET_COLLECTIONS, { first: 6 }, headersList)
    products = productsData?.collection?.products?.edges ?? []
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
  padding: '2rem',
  background: '#080808',
  overflow: 'hidden',
}}>
  {/* BG IMAGE */}
  <img src="/images/1.jpeg" alt="" style={{
    position: 'absolute', inset: 0,
    width: '100%', height: '100%',
    objectFit: 'cover', objectPosition: 'center top',
    zIndex: 0,
  }} />

  {/* GRADIENT */}
  <div style={{
    position: 'absolute', inset: 0,
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.80) 100%)',
    zIndex: 1,
  }} />

  

  {/* TOP TAG */}
  <div style={{
    position: 'absolute', top: '5.5rem', left: '2rem', zIndex: 3,
    display: 'flex', alignItems: 'center', gap: '0.8rem',
  }}>
    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#fff' }} />
    <span style={{
      fontSize: '0.65rem', letterSpacing: '0.25em',
      textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)',
      fontFamily: "'CenturyGothic', sans-serif",
    }}>
      {th('drop')}
    </span>
  </div>

  {/* MAIN CONTENT — colonna singola su mobile */}
  <div style={{ position: 'relative', zIndex: 3 }}>
    <p style={{
      fontSize: '0.6rem', letterSpacing: '0.3em',
      textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
      marginBottom: '0.6rem', fontFamily: "'CenturyGothic', sans-serif",
    }}>
      New Drop
    </p>
    <h1 style={{
      fontFamily: "'CenturyGothic', sans-serif",
      fontSize: 'clamp(3rem, 12vw, 11rem)',
      fontWeight: 600, lineHeight: 0.88,
      letterSpacing: '-0.02em', color: '#ffffff',
      marginBottom: '0.2rem',
    }}>
      SUMMER
    </h1>
    <h1 style={{
      fontFamily: "'CenturyGothic', sans-serif",
      fontSize: 'clamp(3rem, 12vw, 11rem)',
      fontWeight: 300, lineHeight: 0.88,
      letterSpacing: '-0.02em',
      color: 'rgba(255,255,255,0.65)',
      fontStyle: 'italic',
      marginBottom: '2rem',
    }}>
      Collection
    </h1>

    {/* BOTTONI */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', flexWrap: 'wrap' }}>
      <Link href="/collections/summer-collection" style={{
        background: '#ffffff', color: '#080808',
        padding: '0.95rem 2.2rem',
        fontSize: '0.65rem', letterSpacing: '0.2em',
        textTransform: 'uppercase', fontWeight: 700,
        display: 'inline-block', fontFamily: "'CenturyGothic', sans-serif",
        whiteSpace: 'nowrap',
      }}>
        {th('shopNow')}
      </Link>
      <Link href="/shop" style={{
        fontSize: '0.65rem', letterSpacing: '0.15em',
        textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)',
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        fontFamily: "'CenturyGothic', sans-serif",
        whiteSpace: 'nowrap',
      }}>
        {th('allDrops')} <span style={{ fontSize: '1rem' }}>→</span>
      </Link>
    </div>
  </div>

  {/* SCROLL INDICATOR */}
  <div style={{
    position: 'absolute', bottom: '2rem', left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', gap: '0.4rem', zIndex: 3,
  }}>
    <span style={{
      fontSize: '0.48rem', letterSpacing: '0.3em',
      textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)',
      fontFamily: "'CenturyGothic', sans-serif",
    }}>scroll</span>
    <div style={{
      width: '1px', height: '50px',
      background: 'rgba(255,255,255,0.15)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: 0, width: '100%',
        height: '40%', background: 'rgba(255,255,255,0.6)',
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

      <div className="col-collections" style={{ display: 'flex', flexDirection: 'row', gap: '2px', padding: '0 2rem' }}>
            {collections
              .filter(({ node }: any) => node.handle !== 'frontpage')
              .slice(0, 2)
              .map(({ node }: any, i: number) => (
                <Link key={node.id} href={`/collections/${node.handle}`} style={{
        position: 'relative',
        aspectRatio: '3/4',
        flex: 1,
        background: '#ddd', overflow: 'hidden', display: 'block',
      }}>

                  {/* IMMAGINE CUSTOM da public/images/ */}
                  <img
                    src={`/images/${i + 2}.jpeg`}
                    alt={node.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%)',
                  }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem' }}>
                    <p style={{
                      fontFamily: "'CenturyGothic', sans-serif",
                      fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                      fontWeight: 700,
                      color: '#fff', lineHeight: 1, letterSpacing: '0.02em',
                    }}>
                      {node.title.toUpperCase()}
                    </p>
                    <p style={{
                      fontSize: '0.62rem', letterSpacing: '0.18em',
                      textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)',
                      marginTop: '0.5rem', fontFamily: "'CenturyGothic', sans-serif",
                    }}>
                      {node.products?.edges?.length ?? 0} {t('styles')} →
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
          <Link href="/collections/summer-collection" style={{
            fontSize: '0.65rem', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)',
          }}>
            {t('viewAll')}
          </Link>
        </div>
        <div className="bs-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '2px', padding: '0 2rem',
        }}>
          {products.slice(0, 8).map(({ node }: any) => (
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
  overflow: 'hidden',
}}>
  <img
    src="/images/4.jpeg"
    alt="VHERSO"
    style={{
      width: '100%', height: '100%',
      objectFit: 'cover', objectPosition: 'center',
      display: 'block',
      position: 'absolute', inset: 0,
    }}
  />
  {/* leggero overlay scuro */}
  <div style={{
    position: 'absolute', inset: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)',
  }} />
  <div style={{
    position: 'absolute', bottom: '2rem', left: '2rem',
    fontSize: '0.55rem', letterSpacing: '0.22em',
    textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)',
    zIndex: 2,
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
              fontSize: 'clamp(3rem, 5vw, 10rem)',
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

        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes scrollLine {
          0% { top: -100%; }
          100% { top: 200%; }
        }
        @media (max-width: 768px) {
          .bs-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            padding: 0 !important;
            gap: 1px !important;
          }
        }

        @media (max-width: 768px) {
          .col-collections {
            flex-direction: column !important;
            padding: 0 2rem !important;
          }
          .col-collections a {
            aspect-ratio: 9/16 !important;
            flex: 1 !important;
          }
        }

      `}</style>

    </div>
  )
}