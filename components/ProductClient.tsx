'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import AddToCartButton from '@/components/AddToCartButton'
import { useWishlist } from '@/hooks/useWishlist'
import { getT } from '@/lib/i18n.client'

type TFunc = (key: string) => string

function useTranslations(namespace: string): TFunc {
  const [t, setT] = useState<TFunc>(() => (k: string) => k)
  useEffect(() => {
    setT(() => getT(namespace))
  }, [namespace])
  return t
}

export default function ProductClient({ product }: { product: any }) {
  if (!product || !product.images || !product.variants) return null

  const images = product.images?.edges?.map((e: any) => e.node) ?? []
  const variants = product.variants?.edges?.map((e: any) => e.node) ?? []
  const [selectedVariant, setSelectedVariant] = useState(variants[0])
  const [activeImage, setActiveImage] = useState(0)
  const [hoveredWishlist, setHoveredWishlist] = useState(false)
  const t = useTranslations('product')

  const price = parseFloat(selectedVariant?.price?.amount ?? '0').toFixed(2)
  const isAvailable = selectedVariant?.availableForSale ?? false
  const currencyCode = selectedVariant?.price?.currencyCode ?? 'EUR'
  const currencySymbol = ({ EUR: '€', USD: '$', GBP: '£' } as Record<string, string>)[currencyCode] ?? '€'

  return (
    <>
      <style>{`
        .pdp { background:#f5f5f5; min-height:100vh; font-family:'CenturyGothic',sans-serif; }

        /* DESKTOP LAYOUT */
        .pdp-desktop {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 100vh;
        }
        .pdp-left-desktop {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .pdp-img-item { position:relative; overflow:hidden; aspect-ratio:4/5; background:#e8e8e8; }
        .pdp-img-item img { width:100%; height:100%; object-fit:cover; display:block; transition:transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94); }
        .pdp-img-item:hover img { transform:scale(1.03); }
        .pdp-right-desktop {
          padding: 4rem 3rem;
          position: sticky;
          top: 68px;
          height: calc(100vh - 68px);
          overflow-y: auto;
          scrollbar-width: none;
          display: flex;
          flex-direction: column;
          align-self: start;
        }
        .pdp-right-desktop::-webkit-scrollbar { display:none; }

        /* MOBILE LAYOUT */
        .pdp-mobile { display:none; flex-direction:column; }
        .pdp-mobile-thumbs-wrap {
          display: flex;
          gap: 4px;
          padding: 4px;
          overflow-x: auto;
          scrollbar-width: none;
          background: #ebebeb;
        }
        .pdp-mobile-thumbs-wrap::-webkit-scrollbar { display:none; }

        /* SIZE BTNS */
        .size-btn { min-width:52px; height:44px; padding:0 1rem; font-size:0.65rem; letter-spacing:0.1em; text-transform:uppercase; cursor:pointer; font-family:'CenturyGothic',sans-serif; transition:all 0.15s; border:1px solid rgba(0,0,0,0.15); background:none; color:rgba(0,0,0,0.55); }
        .size-btn:hover { background:rgba(0,0,0,0.05); color:#080808; }
        .size-btn.selected { background:#080808; color:#f5f5f5; border-color:#080808; }
        .size-btn.unavail { opacity:0.2; cursor:not-allowed; text-decoration:line-through; }

        /* ACCORDION */
        .acc-header { width:100%; background:none; border:none; color:#080808; display:flex; justify-content:space-between; align-items:center; padding:1.1rem 0; cursor:pointer; font-family:'CenturyGothic',sans-serif; font-size:0.62rem; letter-spacing:0.18em; text-transform:uppercase; border-bottom:1px solid rgba(0,0,0,0.06); transition:color 0.2s; }
        .acc-header:hover { color:rgba(0,0,0,0.5); }
        .acc-body { overflow:hidden; transition:max-height 0.4s cubic-bezier(0.25,0.46,0.45,0.94); }
        .acc-body p { font-size:0.75rem; line-height:1.85; color:rgba(0,0,0,0.5); padding:1rem 0 1.5rem; font-family:'CenturyGothic',sans-serif; }

        @media (max-width:768px) {
          .pdp-desktop { display:none !important; }
          .pdp-mobile { display:flex !important; }
        }
        @media (min-width:769px) {
          .pdp-mobile { display:none !important; }
        }
      `}</style>

      <div className="pdp">

        {/* ===== DESKTOP ===== */}
        <div className="pdp-desktop">
          {/* LEFT — immagini verticali scrollabili */}
          <div className="pdp-left-desktop">
            {images.map((img: any, i: number) => (
              <div key={i} className="pdp-img-item">
                <img src={img.url} alt={img.altText ?? product.title} />
                {i === 0 && images.length > 1 && (
                  <div style={{
                    position: 'absolute', bottom: '1rem', right: '1rem',
                    background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(4px)',
                    padding: '0.3rem 0.7rem', fontSize: '0.55rem',
                    letterSpacing: '0.15em', color: 'rgba(0,0,0,0.5)', textTransform: 'uppercase',
                  }}>
                    {images.length} {t('photos')}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* RIGHT — sticky */}
          <div className="pdp-right-desktop">
            <ProductInfo
              product={product} variants={variants} selectedVariant={selectedVariant}
              setSelectedVariant={setSelectedVariant} hoveredWishlist={hoveredWishlist}
              setHoveredWishlist={setHoveredWishlist} price={price}
              currencySymbol={currencySymbol} isAvailable={isAvailable} t={t}
            />
          </div>
        </div>

        {/* ===== MOBILE ===== */}
        <div className="pdp-mobile">
          {/* IMMAGINE PRINCIPALE */}
          <div style={{ position: 'relative', width: '100%', aspectRatio: 'auto', overflow: 'hidden', background: '#e8e8e8' }}>
            <img
              src={images[activeImage]?.url}
              alt={images[activeImage]?.altText ?? product.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            {images.length > 1 && (
              <div style={{
                position: 'absolute', bottom: '0.8rem', right: '0.8rem',
                background: 'rgba(0,0,0,0.5)', padding: '0.25rem 0.6rem',
                fontSize: '0.55rem', letterSpacing: '0.15em', color: '#fff',
              }}>
                {activeImage + 1} / {images.length}
              </div>
            )}
          </div>

          {/* THUMBNAILS */}
          {images.length > 1 && (
            <div className="pdp-mobile-thumbs-wrap">
              {images.map((img: any, i: number) => (
                <div
                  key={i}
                  onClick={() => setActiveImage(i)}
                  style={{
                    width: '88px', height: '88px', flexShrink: 0,
                    overflow: 'hidden', cursor: 'pointer',
                    opacity: activeImage === i ? 1 : 0.4,
                    transition: 'opacity 0.2s',
                    outline: activeImage === i ? '2px solid #080808' : 'none',
                    outlineOffset: '-2px',
                  }}
                >
                  <img src={img.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              ))}
            </div>
          )}

          {/* INFO */}
          <div style={{ padding: '2rem 1.2rem 4rem' }}>
            <ProductInfo
              product={product} variants={variants} selectedVariant={selectedVariant}
              setSelectedVariant={setSelectedVariant} hoveredWishlist={hoveredWishlist}
              setHoveredWishlist={setHoveredWishlist} price={price}
              currencySymbol={currencySymbol} isAvailable={isAvailable} t={t}
            />
          </div>
        </div>

      </div>
    </>
  )
}

function ProductInfo({ product, variants, selectedVariant, setSelectedVariant, hoveredWishlist, setHoveredWishlist, price, currencySymbol, isAvailable, t }: any) {
  const { isWished, toggle } = useWishlist(product.handle)

  return (
    <>
      {/* BREADCRUMB */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
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
            {i < arr.length - 1 && <span style={{ color: 'rgba(0,0,0,0.15)', fontSize: '0.55rem' }}>/</span>}
          </span>
        ))}
      </div>

      <p style={{ fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.22)', marginBottom: '0.6rem' }}>
        VHERSO
      </p>

      <h1 style={{
        fontFamily: "'CenturyGothic', sans-serif",
        fontSize: 'clamp(1.6rem, 3vw, 3rem)',
        fontWeight: 700, lineHeight: 1,
        letterSpacing: '-0.01em', color: '#080808', marginBottom: '1.5rem',
        wordBreak: 'break-word',
      }}>
        {product.title.toUpperCase()}
      </h1>

      <div style={{
        display: 'flex', alignItems: 'baseline', gap: '1rem',
        marginBottom: '2rem', paddingBottom: '2rem',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}>
        <span style={{ fontFamily: "'CenturyGothic', sans-serif", fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 700, color: '#080808' }}>
          {currencySymbol}{price}
        </span>
        <span style={{ fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)' }}>
          {t('taxIncluded')}
        </span>
      </div>

      {variants.length > 1 && (
  <div style={{ marginBottom: '1.5rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
      <p style={{ fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)' }}>
        {t('size')}
        {selectedVariant?.title && (
          <span style={{ color: '#080808', marginLeft: '0.5rem' }}>— {selectedVariant.title}</span>
        )}
      </p>
      <a href="/size-guide" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.25)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
        {t('sizeGuide')}
      </a>
    </div>
    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
      {variants.map((v: any) => {
        const isColor = v.selectedOptions?.some((o: any) =>
          ['color', 'colour', 'colore', 'color'].includes(o.name.toLowerCase())
        )
        const colorValue = v.selectedOptions?.find((o: any) =>
          ['color', 'colour', 'colore'].includes(o.name.toLowerCase())
        )?.value

        if (isColor && colorValue) {
          return (
            <button
              key={v.id}
              onClick={() => v.availableForSale && setSelectedVariant(v)}
              disabled={!v.availableForSale}
              title={v.title}
              style={{
                width: '32px', height: '32px',
                borderRadius: '50%',
                background: colorValue.toLowerCase(),
                border: selectedVariant?.id === v.id
                  ? '2px solid #080808'
                  : '2px solid transparent',
                outline: selectedVariant?.id === v.id
                  ? '1px solid #080808'
                  : '1px solid rgba(0,0,0,0.15)',
                outlineOffset: '2px',
                cursor: v.availableForSale ? 'pointer' : 'not-allowed',
                opacity: v.availableForSale ? 1 : 0.3,
                transition: 'all 0.15s',
                position: 'relative',
              }}
            >
              {!v.availableForSale && (
                <span style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="20" height="20" viewBox="0 0 20 20">
                    <line x1="2" y1="2" x2="18" y2="18" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5"/>
                  </svg>
                </span>
              )}
            </button>
          )
        }

        return (
          <button
            key={v.id}
            className={`size-btn ${selectedVariant?.id === v.id ? 'selected' : ''} ${!v.availableForSale ? 'unavail' : ''}`}
            onClick={() => v.availableForSale && setSelectedVariant(v)}
            disabled={!v.availableForSale}
          >
            {v.title}
          </button>
        )
      })}
    </div>
  </div>
)}

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: isAvailable ? '#16a34a' : '#dc2626', flexShrink: 0 }} />
        <span style={{ fontSize: '0.58rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: isAvailable ? 'rgba(22,163,74,0.8)' : 'rgba(220,38,38,0.8)' }}>
          {isAvailable ? t('inStock') : t('outOfStock')}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.5rem', marginBottom: '2rem' }}>
        <AddToCartButton variantId={selectedVariant?.id} />
        <button
          onClick={toggle}
          style={{
            width: '52px', height: '52px', background: 'none',
            border: `1px solid ${isWished ? '#080808' : 'rgba(0,0,0,0.12)'}`,
            color: isWished ? '#080808' : 'rgba(0,0,0,0.35)',
            cursor: 'pointer', fontSize: '1.1rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s', flexShrink: 0,
          }}
        >
          {isWished ? '♥' : '♡'}
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', padding: '1.2rem 1.4rem', background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
        {[t('freeReturns'), t('secureCheckout'), t('shipsWithin')].map(text => (
          <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', fontSize: '0.65rem', letterSpacing: '0.04em', color: 'rgba(0,0,0,0.45)', fontFamily: "'CenturyGothic', sans-serif" }}>
            <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(0,0,0,0.2)', flexShrink: 0 }} />
            {text}
          </div>
        ))}
      </div>

      <AccordionSection
        items={[
          { label: t('description'), content: product.description || 'Premium quality piece from the VHERSO collection. Designed for those who move with intention.' },
          { label: t('materials'), content: 'High-quality fabric. Machine wash cold, tumble dry low. Do not bleach. Iron on low heat.' },
          { label: t('shipping'), content: 'We ship worldwide within 24–48 business hours. Free shipping on orders over €200. Returns accepted within 14 days.' },
        ]}
      />
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