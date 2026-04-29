'use client'

import { useState, useEffect } from 'react'
import { shopifyFetch } from '@/lib/shopify'
import { GET_PRODUCT_BY_HANDLE } from '@/lib/queries'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'

export default function WishlistPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handles: string[] = JSON.parse(localStorage.getItem('vherso_wishlist') ?? '[]')
    if (handles.length === 0) { setLoading(false); return }
    const country = document.cookie.split('; ').find(r => r.startsWith('x-country='))?.split('=')[1] ?? 'IT'
    Promise.all(
      handles.map(handle =>
        shopifyFetch(GET_PRODUCT_BY_HANDLE, { handle, country })
          .then(d => d?.product)
          .catch(() => null)
      )
    ).then(results => {
      setProducts(results.filter(Boolean))
      setLoading(false)
    })
  }, [])

  const removeFromWishlist = (handle: string) => {
    const wishlist: string[] = JSON.parse(localStorage.getItem('vherso_wishlist') ?? '[]')
    const next = wishlist.filter(h => h !== handle)
    localStorage.setItem('vherso_wishlist', JSON.stringify(next))
    setProducts(prev => prev.filter(p => p.handle !== handle))
  }

  return (
    <>
      <style>{`
        .wl-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:2px; }
        .wl-card { position:relative; }
        .wl-remove { position:absolute; top:0.8rem; right:0.8rem; z-index:10; background:rgba(255,255,255,0.9); border:none; width:32px; height:32px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:0.7rem; color:rgba(0,0,0,0.4); transition:all 0.2s; backdrop-filter:blur(4px); }
        .wl-remove:hover { background:#080808; color:#fff; }
        @media (max-width:768px) { .wl-grid { grid-template-columns:repeat(2,1fr); } }
        @media (max-width:480px) { .wl-grid { grid-template-columns:repeat(2,1fr); gap:1px; } }
      `}</style>

      <div style={{ background: '#f5f5f5', minHeight: '100vh' }}>

        {/* HEADER */}
        <div style={{
          padding: '8rem 2rem 3rem',
          background: '#efefef',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            fontFamily: "'CenturyGothic',sans-serif",
            fontSize: 'clamp(80px,18vw,220px)',
            color: 'rgba(0,0,0,0.03)', userSelect: 'none',
            whiteSpace: 'nowrap', letterSpacing: '0.05em',
            pointerEvents: 'none',
          }}>
            WISHLIST
          </div>
          <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p style={{ fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)', marginBottom: '0.8rem', fontFamily: "'CenturyGothic',sans-serif" }}>
                VHERSO — I tuoi preferiti
              </p>
              <h1 style={{
                fontFamily: "'CenturyGothic',sans-serif",
                fontSize: 'clamp(3rem, 8vw, 7rem)',
                fontWeight: 900, lineHeight: 0.9,
                letterSpacing: '-0.02em', color: '#080808',
              }}>
                WISH<br />
                <span style={{ fontWeight: 300, color: 'rgba(0,0,0,0.35)' }}>LIST</span>
              </h1>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.25)', fontFamily: "'CenturyGothic',sans-serif" }}>
                {loading ? '—' : `${products.length} items`}
              </p>
            </div>
          </div>
        </div>

        {/* RESULTS BAR */}
        <div style={{ padding: '1.2rem 2rem', borderBottom: '1px solid rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f5f5f5' }}>
          <p style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.25)', fontFamily: "'CenturyGothic',sans-serif" }}>
            {loading ? 'Caricamento...' : `${products.length} prodotti salvati`}
          </p>
          <Link href="/shop" style={{ fontSize: '0.58rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)', textDecoration: 'none', fontFamily: "'CenturyGothic',sans-serif" }}>
            ← Continua a fare shopping
          </Link>
        </div>

        {/* CONTENT */}
        <div style={{ padding: '2px' }}>
          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '2px' }}>
              {Array(3).fill(null).map((_, i) => (
                <div key={i} style={{ aspectRatio: '3/4', background: '#e8e8e8', animation: 'shimmer 1.5s ease infinite' }} />
              ))}
              <style>{`@keyframes shimmer { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
            </div>
          ) : products.length === 0 ? (
            <div style={{ padding: '8rem 2rem', textAlign: 'center' }}>
              <p style={{
                fontFamily: "'CenturyGothic',sans-serif",
                fontSize: '4rem', color: 'rgba(0,0,0,0.06)',
                letterSpacing: '0.1em', marginBottom: '1.5rem',
              }}>♡</p>
              <p style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.25)', marginBottom: '2rem', fontFamily: "'CenturyGothic',sans-serif" }}>
                Nessun prodotto nei preferiti
              </p>
              <Link href="/shop" style={{
                background: '#080808', color: '#f5f5f5',
                padding: '1rem 2.5rem', fontSize: '0.65rem',
                letterSpacing: '0.2em', textTransform: 'uppercase',
                display: 'inline-block', fontFamily: "'CenturyGothic',sans-serif",
              }}>
                Scopri i prodotti →
              </Link>
            </div>
          ) : (
            <div className="wl-grid">
              {products.map(p => (
                <div key={p.id} className="wl-card">
                  <button
                    className="wl-remove"
                    onClick={() => removeFromWishlist(p.handle)}
                    title="Rimuovi dai preferiti"
                  >
                    ✕
                  </button>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </>
  )
}