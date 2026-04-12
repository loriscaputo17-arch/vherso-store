'use client'

import { useState } from 'react'
import Link from 'next/link'
import AddToCartButton from '@/components/AddToCartButton'

export default function ProductClient({ product }: { product: any }) {
  if (!product || !product.images || !product.variants) return null

  const images = product.images?.edges?.map((e: any) => e.node) ?? []
  const variants = product.variants?.edges?.map((e: any) => e.node) ?? []
  const [selectedVariant, setSelectedVariant] = useState(variants[0])
  const [activeImage, setActiveImage] = useState(0)
  const [hoveredWishlist, setHoveredWishlist] = useState(false)

  const price = parseFloat(selectedVariant?.price?.amount ?? '0').toFixed(2)
  const isAvailable = selectedVariant?.availableForSale ?? false

  return (
    <>
      <style>{`
        .pdp { background:#f5f5f5; min-height:100vh; font-family:'CenturyGothic',sans-serif; }

        /* DESKTOP LAYOUT */
        .pdp-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: start;
        }

        /* LEFT — DESKTOP: immagini verticali */
        .pdp-left-desktop {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .pdp-img-item {
          position: relative;
          overflow: hidden;
          aspect-ratio: 4/5;
          background: #e8e8e8;
        }

        .pdp-img-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94);
        }

        .pdp-img-item:hover img { transform: scale(1.03); }

        /* LEFT — MOBILE: scroll orizzontale */
        .pdp-left-mobile {
          display: none;
          flex-direction: column;
        }

        .pdp-scroll-wrap {
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          display: flex;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }

        .pdp-scroll-wrap::-webkit-scrollbar { display: none; }

        .pdp-scroll-img {
          flex-shrink: 0;
          width: 100%;
          aspect-ratio: 3/4;
          overflow: hidden;
          scroll-snap-align: start;
          background: #e8e8e8;
        }

        .pdp-scroll-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .pdp-mobile-thumbs {
          display: flex;
          gap: 2px;
          padding: 2px;
          background: #f0f0f0;
          overflow-x: auto;
          scrollbar-width: none;
        }

        .pdp-mobile-thumbs::-webkit-scrollbar { display: none; }

        .pdp-mobile-thumb {
          width: 56px;
          height: 56px;
          flex-shrink: 0;
          overflow: hidden;
          cursor: pointer;
          opacity: 0.4;
          transition: opacity 0.2s;
        }

        .pdp-mobile-thumb.active { opacity: 1; }
        .pdp-mobile-thumb img {
          width: 100%; height: 100%; object-fit: cover; display: block;
        }

        /* RIGHT */
        .pdp-right {
          padding: 4rem 3rem;
          position: sticky;
          top: 60px;
          height: calc(100vh - 60px);
          overflow-y: auto;
          scrollbar-width: none;
          display: flex;
          flex-direction: column;
        }

        .pdp-right::-webkit-scrollbar { display: none; }

        /* SIZE BTNS */
        .size-btn {
          min-width: 52px;
          height: 44px;
          padding: 0 1rem;
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          font-family: 'CenturyGothic', sans-serif;
          transition: all 0.15s;
          border: 1px solid rgba(0,0,0,0.15);
          background: none;
          color: rgba(0,0,0,0.55);
        }

        .size-btn:hover { background: rgba(0,0,0,0.05); color: #080808; }
        .size-btn.selected { background: #080808; color: #f5f5f5; border-color: #080808; }
        .size-btn.unavail { opacity: 0.2; cursor: not-allowed; text-decoration: line-through; }

        /* ACCORDION */
        .acc-header {
          width: 100%;
          background: none;
          border: none;
          color: #080808;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.1rem 0;
          cursor: pointer;
          font-family: 'CenturyGothic', sans-serif;
          font-size: 0.62rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          transition: color 0.2s;
        }

        .acc-header:hover { color: rgba(0,0,0,0.5); }

        .acc-body {
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
        }

        .acc-body p {
          font-size: 0.75rem;
          line-height: 1.85;
          color: rgba(0,0,0,0.5);
          padding: 1rem 0 1.5rem;
          font-family: 'CenturyGothic', sans-serif;
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .pdp-layout {
            grid-template-columns: 1fr;
          }

          .pdp-left-desktop { display: none; }
          .pdp-left-mobile { display: flex; }

          .pdp-right {
            position: relative;
            top: 0;
            height: auto;
            padding: 2rem 1.5rem 4rem;
          }
        }

        @media (max-width: 480px) {
          .pdp-right { padding: 1.5rem 1rem 3rem; }
        }
      `}</style>

      <div className="pdp">
        <div className="pdp-layout">

          {/* LEFT DESKTOP — immagini verticali */}
          <div className="pdp-left-desktop">
            {images.map((img: any, i: number) => (
              <div key={i} className="pdp-img-item">
                <img src={img.url} alt={img.altText ?? product.title} />
                {i === 0 && images.length > 1 && (
                  <div style={{
                    position: 'absolute', bottom: '1rem', right: '1rem',
                    background: 'rgba(255,255,255,0.8)',
                    backdropFilter: 'blur(4px)',
                    padding: '0.3rem 0.7rem',
                    fontSize: '0.55rem', letterSpacing: '0.15em',
                    color: 'rgba(0,0,0,0.5)', textTransform: 'uppercase',
                  }}>
                    {images.length} Photos
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* LEFT MOBILE — scroll orizzontale + miniature */}
          <div className="pdp-left-mobile">
            <div className="pdp-scroll-wrap">
              {images.map((img: any, i: number) => (
                <div
                  key={i}
                  className="pdp-scroll-img"
                  onScroll={() => {}}
                >
                  <img src={img.url} alt={img.altText ?? product.title} />
                </div>
              ))}
            </div>
            {images.length > 1 && (
              <div className="pdp-mobile-thumbs">
                {images.map((img: any, i: number) => (
                  <div
                    key={i}
                    className={`pdp-mobile-thumb ${activeImage === i ? 'active' : ''}`}
                    onClick={() => {
                      setActiveImage(i)
                      const wrap = document.querySelector('.pdp-scroll-wrap')
                      if (wrap) {
                        const scrollTo = (wrap as HTMLElement).offsetWidth * i
                        wrap.scrollTo({ left: scrollTo, behavior: 'smooth' })
                      }
                    }}
                  >
                    <img src={img.url} alt={img.altText ?? product.title} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — INFO */}
          <div className="pdp-right">

            {/* BREADCRUMB */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              marginBottom: '2rem', flexWrap: 'wrap',
            }}>
              {[
                { label: 'Home', href: '/' },
                { label: 'Shop', href: '/shop' },
                { label: product.title, href: '#' },
              ].map(({ label, href }, i, arr) => (
                <span key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Link href={href} style={{
                    fontSize: '0.55rem', letterSpacing: '0.15em',
                    textTransform: 'uppercase', textDecoration: 'none',
                    color: i === arr.length - 1 ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.2)',
                  }}>
                    {label}
                  </Link>
                  {i < arr.length - 1 && (
                    <span style={{ color: 'rgba(0,0,0,0.15)', fontSize: '0.55rem' }}>/</span>
                  )}
                </span>
              ))}
            </div>

            <p style={{
              fontSize: '0.55rem', letterSpacing: '0.25em',
              textTransform: 'uppercase', color: 'rgba(0,0,0,0.22)',
              marginBottom: '0.6rem',
            }}>VHERSO</p>

            <h1 style={{
              fontFamily: "'CenturyGothic', sans-serif",
              fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
              fontWeight: 700, lineHeight: 0.95,
              letterSpacing: '-0.01em', color: '#080808',
              marginBottom: '1.5rem',
            }}>
              {product.title.toUpperCase()}
            </h1>

            <div style={{
              display: 'flex', alignItems: 'baseline', gap: '1rem',
              marginBottom: '2rem', paddingBottom: '2rem',
              borderBottom: '1px solid rgba(0,0,0,0.06)',
            }}>
              <span style={{
                fontFamily: "'CenturyGothic', sans-serif",
                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                fontWeight: 700, color: '#080808',
              }}>
                €{price}
              </span>
              <span style={{
                fontSize: '0.55rem', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)',
              }}>
                EUR — Tax included
              </span>
            </div>

            {variants.length > 1 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                  <p style={{ fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)' }}>Size</p>
                  <p style={{ fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.25)', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Size guide →</p>
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {variants.map((v: any) => (
                    <button
                      key={v.id}
                      className={`size-btn ${selectedVariant?.id === v.id ? 'selected' : ''} ${!v.availableForSale ? 'unavail' : ''}`}
                      onClick={() => v.availableForSale && setSelectedVariant(v)}
                      disabled={!v.availableForSale}
                    >
                      {v.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: isAvailable ? '#16a34a' : '#dc2626', flexShrink: 0 }} />
              <span style={{ fontSize: '0.58rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: isAvailable ? 'rgba(22,163,74,0.8)' : 'rgba(220,38,38,0.8)' }}>
                {isAvailable ? 'In stock' : 'Out of stock'}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.5rem', marginBottom: '2rem' }}>
              <AddToCartButton variantId={selectedVariant?.id} />
              <button
                onMouseEnter={() => setHoveredWishlist(true)}
                onMouseLeave={() => setHoveredWishlist(false)}
                style={{
                  width: '52px', height: '52px', background: 'none',
                  border: `1px solid ${hoveredWishlist ? '#080808' : 'rgba(0,0,0,0.12)'}`,
                  color: hoveredWishlist ? '#080808' : 'rgba(0,0,0,0.35)',
                  cursor: 'pointer', fontSize: '1.1rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s', flexShrink: 0,
                }}
              >♡</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', padding: '1.2rem 1.4rem', background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
              {['Free shipping on orders over €200', 'Free returns within 14 days', 'Secure checkout via Shopify', 'Ships within 24–48 hours'].map(text => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', fontSize: '0.65rem', letterSpacing: '0.04em', color: 'rgba(0,0,0,0.45)', fontFamily: "'CenturyGothic', sans-serif" }}>
                  <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(0,0,0,0.2)', flexShrink: 0 }} />
                  {text}
                </div>
              ))}
            </div>

            <AccordionSection
              items={[
                { label: 'Description', content: product.description || 'Premium quality piece from the VHERSO collection. Designed for those who move with intention.' },
                { label: 'Materials & Care', content: 'High-quality fabric. Machine wash cold, tumble dry low. Do not bleach. Iron on low heat.' },
                { label: 'Shipping & Returns', content: 'We ship worldwide within 24–48 business hours. Free shipping on orders over €200. Returns accepted within 14 days.' },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  )
}

function AccordionSection({ items }: { items: { label: string; content: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
      {items.map((item, i) => (
        <div key={item.label}>
          <button className="acc-header" onClick={() => setOpen(open === i ? null : i)}>
            <span>{item.label.toUpperCase()}</span>
            <span style={{ fontSize: '1rem', color: 'rgba(0,0,0,0.3)', display: 'inline-block', transition: 'transform 0.3s', transform: open === i ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
          </button>
          <div className="acc-body" style={{ maxHeight: open === i ? '300px' : '0' }}>
            <p>{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  )
}