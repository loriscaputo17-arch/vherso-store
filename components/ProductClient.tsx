'use client'

import { useState } from 'react'
import AddToCartButton from '@/components/AddToCartButton'

export default function ProductClient({ product }: { product: any }) {
  const images = product.images?.edges?.map((e: any) => e.node) ?? []
  const variants = product.variants?.edges?.map((e: any) => e.node) ?? []
  const [selectedVariant, setSelectedVariant] = useState(variants[0])
  const [hoveredImg, setHoveredImg] = useState<number | null>(null)
  const [hoveredSize, setHoveredSize] = useState<string | null>(null)
  const [hoveredWishlist, setHoveredWishlist] = useState(false)

  const price = parseFloat(selectedVariant?.price?.amount ?? '0').toFixed(2)
  const isAvailable = selectedVariant?.availableForSale ?? false

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', fontFamily: "'CenturyGothic', sans-serif" }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        minHeight: '100vh',
      }}>

        {/* LEFT — IMAGES */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {images.map((img: any, i: number) => (
            <div key={i} style={{
              aspectRatio: '4/5', background: '#e8e8e8',
              overflow: 'hidden', position: 'relative',
            }}>
              <img
                src={img.url}
                alt={img.altText ?? product.title}
                style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  transition: 'transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)',
                  transform: hoveredImg === i ? 'scale(1.03)' : 'scale(1)',
                  display: 'block',
                }}
                onMouseEnter={() => setHoveredImg(i)}
                onMouseLeave={() => setHoveredImg(null)}
              />
              {i === 0 && images.length > 1 && (
                <div style={{
                  position: 'absolute', bottom: '1rem', right: '1rem',
                  fontSize: '0.55rem', letterSpacing: '0.15em',
                  color: 'rgba(0,0,0,0.5)',
                  background: 'rgba(255,255,255,0.8)',
                  padding: '0.3rem 0.7rem',
                  backdropFilter: 'blur(4px)',
                  textTransform: 'uppercase',
                }}>
                  {images.length} Photos
                </div>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT — INFO */}
        <div style={{
          padding: '5rem 3.5rem',
          position: 'sticky', top: '60px',
          alignSelf: 'start',
          height: 'calc(100vh - 60px)',
          overflowY: 'auto',
          scrollbarWidth: 'none' as any,
          background: '#f5f5f5',
        }}>

          {/* BREADCRUMB */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            marginBottom: '2.5rem',
          }}>
            {['Home', 'Shop', product.title].map((crumb, i, arr) => (
              <span key={crumb} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{
                  fontSize: '0.58rem', letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: i === arr.length - 1
                    ? 'rgba(0,0,0,0.5)'
                    : 'rgba(0,0,0,0.25)',
                }}>
                  {crumb}
                </span>
                {i < arr.length - 1 && (
                  <span style={{ color: 'rgba(0,0,0,0.15)', fontSize: '0.6rem' }}>/</span>
                )}
              </span>
            ))}
          </div>

          {/* BRAND */}
          <p style={{
            fontSize: '0.58rem', letterSpacing: '0.25em',
            textTransform: 'uppercase', color: 'rgba(0,0,0,0.25)',
            marginBottom: '0.8rem',
          }}>VHERSO</p>

          {/* TITLE */}
          <h1 style={{
            fontFamily: "'CenturyGothic', sans-serif",
            fontSize: 'clamp(2.5rem, 4vw, 4.5rem)',
            fontWeight: 400, lineHeight: 0.92,
            letterSpacing: '0.02em', color: '#080808',
            marginBottom: '1.5rem',
          }}>
            {product.title.toUpperCase()}
          </h1>

          {/* PRICE */}
          <div style={{
            display: 'flex', alignItems: 'baseline', gap: '1rem',
            marginBottom: '2.5rem', paddingBottom: '2.5rem',
            borderBottom: '1px solid rgba(0,0,0,0.06)',
          }}>
            <span style={{
              fontFamily: "'CenturyGothic', sans-serif",
              fontSize: '2.5rem', color: '#080808', letterSpacing: '0.04em',
            }}>€{price}</span>
            <span style={{
              fontSize: '0.58rem', letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)',
            }}>EUR — Tax included</span>
          </div>

          {/* VARIANTS */}
          {variants.length > 1 && (
            <div style={{ marginBottom: '2rem' }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                marginBottom: '1rem',
              }}>
                <p style={{
                  fontSize: '0.58rem', letterSpacing: '0.22em',
                  textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)',
                }}>Size</p>
                <p style={{
                  fontSize: '0.58rem', letterSpacing: '0.15em',
                  textTransform: 'uppercase', color: 'rgba(0,0,0,0.25)',
                  cursor: 'pointer', textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                }}>Size guide →</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {variants.map((v: any) => (
                  <button
                    key={v.id}
                    onClick={() => v.availableForSale && setSelectedVariant(v)}
                    onMouseEnter={() => setHoveredSize(v.id)}
                    onMouseLeave={() => setHoveredSize(null)}
                    disabled={!v.availableForSale}
                    style={{
                      minWidth: '52px', height: '44px',
                      padding: '0 1rem',
                      fontSize: '0.65rem', letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      cursor: v.availableForSale ? 'pointer' : 'not-allowed',
                      fontFamily: "'CenturyGothic', sans-serif",
                      transition: 'all 0.15s',
                      textDecoration: v.availableForSale ? 'none' : 'line-through',
                      background: selectedVariant?.id === v.id
                        ? '#080808'
                        : hoveredSize === v.id && v.availableForSale
                        ? 'rgba(0,0,0,0.06)'
                        : 'none',
                      color: selectedVariant?.id === v.id
                        ? '#f5f5f5'
                        : v.availableForSale
                        ? 'rgba(0,0,0,0.6)'
                        : 'rgba(0,0,0,0.2)',
                      border: `1px solid ${
                        selectedVariant?.id === v.id
                          ? '#080808'
                          : v.availableForSale
                          ? 'rgba(0,0,0,0.15)'
                          : 'rgba(0,0,0,0.06)'
                      }`,
                    }}
                  >
                    {v.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STOCK */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            marginBottom: '1.5rem',
          }}>
            <div style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: isAvailable ? '#16a34a' : '#dc2626',
            }} />
            <span style={{
              fontSize: '0.6rem', letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: isAvailable ? 'rgba(22,163,74,0.8)' : 'rgba(220,38,38,0.8)',
            }}>
              {isAvailable ? 'In stock' : 'Out of stock'}
            </span>
          </div>

          {/* ADD TO CART */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr auto',
            gap: '0.5rem', marginBottom: '2.5rem',
          }}>
            <AddToCartButton variantId={selectedVariant?.id} />
            <button
              onMouseEnter={() => setHoveredWishlist(true)}
              onMouseLeave={() => setHoveredWishlist(false)}
              style={{
                width: '52px', height: '52px',
                background: hoveredWishlist ? '#080808' : 'none',
                border: `1px solid ${hoveredWishlist ? '#080808' : 'rgba(0,0,0,0.12)'}`,
                color: hoveredWishlist ? '#f5f5f5' : 'rgba(0,0,0,0.4)',
                cursor: 'pointer', fontSize: '1.1rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s',
              }}
            >♡</button>
          </div>

          {/* PERKS */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: '0.8rem',
            padding: '1.5rem',
            background: 'rgba(0,0,0,0.02)',
            border: '1px solid rgba(0,0,0,0.06)',
            marginBottom: '2rem',
          }}>
            {[
              'Free shipping on orders over €200',
              'Free returns within 14 days',
              'Secure checkout via Shopify',
              'Ships within 24–48 business hours',
            ].map(text => (
              <div key={text} style={{
                display: 'flex', alignItems: 'center', gap: '0.8rem',
                fontSize: '0.68rem', letterSpacing: '0.06em',
                color: 'rgba(0,0,0,0.45)',
              }}>
                <div style={{
                  width: '4px', height: '4px', borderRadius: '50%',
                  background: 'rgba(0,0,0,0.2)', flexShrink: 0,
                }} />
                {text}
              </div>
            ))}
          </div>

          {/* DESCRIPTION */}
          <div style={{
            borderTop: '1px solid rgba(0,0,0,0.06)',
            paddingTop: '1.5rem',
          }}>
            <p style={{
              fontSize: '0.58rem', letterSpacing: '0.22em',
              textTransform: 'uppercase', color: 'rgba(0,0,0,0.25)',
              marginBottom: '1rem',
            }}>Description</p>
            <p style={{
              fontSize: '0.78rem', lineHeight: 1.85,
              color: 'rgba(0,0,0,0.5)',
            }}>
              {product.description || 'Premium quality piece from the VHERSO collection. Designed for those who move with intention.'}
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}