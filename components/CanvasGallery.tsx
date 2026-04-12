'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

const FALLBACK_CANVASES = [
  { id: '1', title: 'Ferrari F40 Alpine Drive', handle: 'ferrari-f40-alpine-drive-canvas', price: '50.00', image: null, desc: 'Oil on canvas — Limited edition' },
  { id: '2', title: 'Alpine Descent', handle: 'alpine-descent-canvas', price: '50.00', image: null, desc: 'Mixed media — 2024' },
  { id: '3', title: 'Silent Refuge', handle: 'silent-refuge-canvas', price: '50.00', image: null, desc: 'Acrylic — Original' },
  { id: '4', title: 'Midnight Slopes', handle: 'midnight-slopes-canvas', price: '50.00', image: null, desc: 'Digital print — Series' },
]

export default function CanvasGallery({ canvases }: { canvases: any[] }) {
  const { addToCart } = useCart()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [cursorVisible, setCursorVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const items = canvases.length > 0
    ? canvases.map(({ node }: any) => ({
        id: node.id,
        title: node.title,
        handle: node.handle,
        price: node.priceRange?.minVariantPrice?.amount ?? '50.00',
        image: node.images?.edges?.[0]?.node?.url ?? null,
        variantId: node.variants?.edges?.[0]?.node?.id ?? null,
        desc: node.description || 'Original artwork — Limited edition',
      }))
    : FALLBACK_CANVASES.map(c => ({ ...c, variantId: null }))

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&family=DM+Serif+Display:ital@0;1&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .canvas-page {
          background: #f5f0e8;
          min-height: 100vh;
          color: #1a1a1a;
          font-family: 'DM Sans', sans-serif;
        }

        .custom-cursor {
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: multiply;
          transition: transform 0.15s ease, opacity 0.2s;
        }

        /* HERO */
        .canvas-hero {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 4rem 3rem;
          position: relative;
          overflow: hidden;
          background: #0d0d0d;
        }

        .canvas-hero-bg-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'DM Serif Display', serif;
          font-size: clamp(120px, 22vw, 320px);
          color: rgba(255,255,255,0.025);
          white-space: nowrap;
          user-select: none;
          font-style: italic;
          letter-spacing: -0.03em;
          line-height: 1;
        }

        .canvas-hero-content {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .canvas-hero h1 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(4rem, 10vw, 10rem);
          font-weight: 400;
          line-height: 0.88;
          color: #f5f0e8;
          letter-spacing: -0.02em;
          font-style: italic;
        }

        .canvas-hero-meta {
          text-align: right;
          max-width: 220px;
        }

        .canvas-hero-meta p {
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.4);
          line-height: 1.8;
        }

        /* INTRO */
        .canvas-intro {
          background: #f5f0e8;
          padding: 6rem 3rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          border-bottom: 1px solid rgba(0,0,0,0.08);
        }

        .canvas-intro h2 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2.5rem, 5vw, 5rem);
          font-weight: 400;
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: #1a1a1a;
        }

        .canvas-intro h2 em {
          font-style: italic;
          color: #5a4a3a;
        }

        .canvas-intro p {
          font-size: 0.85rem;
          line-height: 1.9;
          color: rgba(26,26,26,0.5);
          max-width: 380px;
        }

        /* MAIN GALLERY — FULLWIDTH ALTERNATING */
        .gallery-section {
          background: #f5f0e8;
        }

        .gallery-item {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 90vh;
          border-bottom: 1px solid rgba(0,0,0,0.08);
          cursor: none;
        }

        .gallery-item.reverse {
          direction: rtl;
        }

        .gallery-item.reverse > * {
          direction: ltr;
        }

        .gallery-image-wrap {
          position: relative;
          overflow: hidden;
          background: #e8e0d0;
        }

        .gallery-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1.2s cubic-bezier(0.25,0.46,0.45,0.94);
          display: block;
        }

        .gallery-item:hover .gallery-image-wrap img {
          transform: scale(1.04);
        }

        .gallery-image-placeholder {
          width: 100%;
          height: 100%;
          min-height: 600px;
          background: #e0d8c8;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .gallery-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 5rem 4rem;
          background: #f5f0e8;
        }

        .gallery-number {
          font-family: 'DM Serif Display', serif;
          font-size: 6rem;
          color: rgba(0,0,0,0.05);
          line-height: 1;
          margin-bottom: 2rem;
          font-style: italic;
        }

        .gallery-tag {
          font-size: 0.58rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(26,26,26,0.35);
          margin-bottom: 1.2rem;
        }

        .gallery-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 400;
          line-height: 1.05;
          color: #1a1a1a;
          letter-spacing: -0.02em;
          margin-bottom: 1.5rem;
        }

        .gallery-title em {
          font-style: italic;
          color: #5a4a3a;
        }

        .gallery-desc {
          font-size: 0.78rem;
          line-height: 1.85;
          color: rgba(26,26,26,0.45);
          max-width: 320px;
          margin-bottom: 2.5rem;
        }

        .gallery-price {
          font-family: 'DM Serif Display', serif;
          font-size: 2rem;
          color: #1a1a1a;
          margin-bottom: 2rem;
          font-style: italic;
        }

        .gallery-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .btn-dark {
          background: #1a1a1a;
          color: #f5f0e8;
          border: none;
          padding: 1rem 2rem;
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.2s;
          text-decoration: none;
          display: inline-block;
        }

        .btn-dark:hover { background: #2d2d2d; }

        .btn-outline-dark {
          background: transparent;
          color: #1a1a1a;
          border: 1px solid rgba(26,26,26,0.2);
          padding: 1rem 2rem;
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s;
          text-decoration: none;
          display: inline-block;
        }

        .btn-outline-dark:hover {
          background: #1a1a1a;
          color: #f5f0e8;
        }

        /* FULL WIDTH FEATURE */
        .feature-full {
          position: relative;
          height: 80vh;
          overflow: hidden;
          background: #1a1a1a;
          display: flex;
          align-items: flex-end;
          padding: 4rem 3rem;
        }

        .feature-full-text {
          position: relative;
          z-index: 2;
          max-width: 600px;
        }

        .feature-full-text h3 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(3rem, 7vw, 7rem);
          font-weight: 400;
          color: #f5f0e8;
          line-height: 0.9;
          font-style: italic;
          letter-spacing: -0.02em;
          margin-bottom: 1.5rem;
        }

        /* GRID SECTION */
        .canvas-grid-section {
          background: #f5f0e8;
          padding: 6rem 3rem;
        }

        .canvas-grid-section h2 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2rem, 4vw, 4rem);
          font-style: italic;
          color: #1a1a1a;
          margin-bottom: 3rem;
          letter-spacing: -0.02em;
        }

        .canvas-masonry {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
        }

        .masonry-item {
          position: relative;
          overflow: hidden;
          background: #e0d8c8;
          cursor: pointer;
        }

        .masonry-item:nth-child(2) {
          grid-row: span 2;
        }

        .masonry-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94);
        }

        .masonry-item:hover img { transform: scale(1.05); }

        .masonry-placeholder {
          min-height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .masonry-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0);
          transition: background 0.4s;
          display: flex;
          align-items: flex-end;
          padding: 1.5rem;
        }

        .masonry-item:hover .masonry-overlay {
          background: rgba(0,0,0,0.4);
        }

        .masonry-label {
          opacity: 0;
          transition: opacity 0.3s;
          color: #f5f0e8;
        }

        .masonry-item:hover .masonry-label { opacity: 1; }

        .masonry-label p {
          font-family: 'DM Serif Display', serif;
          font-size: 1.3rem;
          font-style: italic;
        }

        .masonry-label span {
          font-size: 0.62rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          opacity: 0.6;
        }

        /* PHILOSOPHY */
        .philosophy {
          background: #1a1a1a;
          padding: 8rem 3rem;
          text-align: center;
        }

        .philosophy p.small {
          font-size: 0.62rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.3);
          margin-bottom: 2rem;
        }

        .philosophy blockquote {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2rem, 5vw, 5rem);
          color: #f5f0e8;
          font-style: italic;
          line-height: 1.1;
          max-width: 900px;
          margin: 0 auto 3rem;
          letter-spacing: -0.02em;
        }

        .philosophy .author {
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.25);
        }

        /* FOOTER CTA */
        .canvas-footer-cta {
          background: #f5f0e8;
          padding: 6rem 3rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid rgba(0,0,0,0.08);
        }

        .canvas-footer-cta h3 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2rem, 4vw, 4rem);
          font-style: italic;
          color: #1a1a1a;
          letter-spacing: -0.02em;
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .canvas-hero { padding: 2rem 1.5rem; }
          .canvas-hero-bg-text { font-size: 18vw; }
          .canvas-hero-meta { display: none; }
          .canvas-intro {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 4rem 1.5rem;
          }
          .gallery-item {
            grid-template-columns: 1fr;
            min-height: auto;
            direction: ltr !important;
          }
          .gallery-item.reverse { direction: ltr; }
          .gallery-image-wrap { min-height: 60vw; }
          .gallery-info { padding: 2.5rem 1.5rem; }
          .gallery-number { font-size: 4rem; margin-bottom: 1rem; }
          .canvas-masonry { grid-template-columns: 1fr 1fr; }
          .masonry-item:nth-child(2) { grid-row: span 1; }
          .philosophy { padding: 5rem 1.5rem; }
          .canvas-footer-cta {
            flex-direction: column;
            gap: 2rem;
            text-align: center;
            padding: 4rem 1.5rem;
          }
          .canvas-grid-section { padding: 4rem 1.5rem; }
          .feature-full { height: 60vh; padding: 2rem 1.5rem; }
        }
      `}</style>

      <div className="canvas-page">

        {/* CUSTOM CURSOR */}
        {cursorVisible && (
          <div
            className="custom-cursor"
            style={{
              left: cursorPos.x - 40,
              top: cursorPos.y - 40,
              width: '80px', height: '80px',
              background: '#1a1a1a',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <span style={{
              fontSize: '0.52rem', letterSpacing: '0.15em',
              textTransform: 'uppercase', color: '#f5f0e8',
            }}>
              VIEW
            </span>
          </div>
        )}

        {/* HERO */}
        <section className="canvas-hero">
          <div className="canvas-hero-bg-text">Gallery</div>
          <div className="canvas-hero-content">
            <div>
              <p style={{
                fontSize: '0.6rem', letterSpacing: '0.25em',
                textTransform: 'uppercase', color: 'rgba(245,240,232,0.35)',
                marginBottom: '1.5rem',
              }}>
                VHERSO — Art Collection
              </p>
              <h1>
                Canvas<br />
                <em style={{ color: 'rgba(245,240,232,0.5)' }}>Works</em>
              </h1>
            </div>
            <div className="canvas-hero-meta">
              <p>Original artwork<br />& limited editions<br />for your space</p>
            </div>
          </div>

          {/* SCROLL LINE */}
          <div style={{
            position: 'absolute', bottom: '2.5rem', left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
          }}>
            <div style={{
              width: '1px', height: '60px',
              background: 'rgba(245,240,232,0.15)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, width: '100%', height: '40%',
                background: 'rgba(245,240,232,0.6)',
                animation: 'scrollLine 1.8s ease infinite',
              }} />
            </div>
          </div>
        </section>

        {/* INTRO */}
        <div className="canvas-intro">
          <h2>
            Art that lives<br />
            <em>on your walls.</em>
          </h2>
          <p>
            Ogni canvas VHERSO nasce da un momento, un luogo, un'atmosfera. Pezzi originali e serie limitate pensati per chi vuole portare il club lifestyle anche nello spazio in cui vive.
          </p>
        </div>

        {/* MAIN GALLERY — ALTERNATING */}
        <section className="gallery-section">
          {items.map((item, i) => (
            <div
              key={item.id}
              className={`gallery-item ${i % 2 === 1 ? 'reverse' : ''}`}
              onMouseEnter={() => { setActiveIndex(i); setCursorVisible(true) }}
              onMouseLeave={() => { setActiveIndex(null); setCursorVisible(false) }}
            >
              {/* IMAGE */}
              <div className="gallery-image-wrap">
                {item.image ? (
                  <img src={item.image} alt={item.title} />
                ) : (
                  <div className="gallery-image-placeholder">
                    <span style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: '8rem', color: 'rgba(0,0,0,0.06)',
                      fontStyle: 'italic',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                )}
              </div>

              {/* INFO */}
              <div className="gallery-info">
                <div className="gallery-number">{String(i + 1).padStart(2, '0')}</div>
                <p className="gallery-tag">Original Artwork — Limited Edition</p>
                <h2 className="gallery-title">
                  {item.title.split(' ').slice(0, -1).join(' ')}{' '}
                  <em>{item.title.split(' ').slice(-1)}</em>
                </h2>
                <p className="gallery-desc">{item.desc}</p>
                <div className="gallery-price">
                  From €{parseFloat(item.price).toFixed(0)}
                </div>
                <div className="gallery-actions">
                  {item.variantId && (
                    <button
                      className="btn-dark"
                      onClick={() => addToCart(item.variantId)}
                    >
                      Add to Bag
                    </button>
                  )}
                  <Link href={`/products/${item.handle}`} className="btn-outline-dark">
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* FULL WIDTH FEATURE */}
        <div className="feature-full">
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 60%)',
            zIndex: 1,
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 0,
          }}>
            <span style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(8rem, 20vw, 25rem)',
              color: 'rgba(255,255,255,0.03)',
              fontStyle: 'italic',
              userSelect: 'none',
            }}>
              Art
            </span>
          </div>
          <div className="feature-full-text">
            <h3>Every piece<br />tells a story.</h3>
            <p style={{
              fontSize: '0.75rem', letterSpacing: '0.08em',
              color: 'rgba(245,240,232,0.4)', lineHeight: 1.8,
              maxWidth: '320px', marginBottom: '2rem',
            }}>
              From alpine drives to midnight slopes — scenari che conosci, trasformati in arte da appendere.
            </p>
            <Link href="/shop" className="btn-dark" style={{
              background: '#f5f0e8', color: '#1a1a1a',
            }}>
              Explore All →
            </Link>
          </div>
        </div>

        {/* MASONRY GRID */}
        {items.length > 1 && (
          <div className="canvas-grid-section">
            <h2>The Collection</h2>
            <div className="canvas-masonry">
              {items.slice(0, 3).map((item, i) => (
                <Link
                  key={item.id}
                  href={`/products/${item.handle}`}
                  className="masonry-item"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ minHeight: i === 1 ? '600px' : '300px' }}
                    />
                  ) : (
                    <div className="masonry-placeholder" style={{
                      minHeight: i === 1 ? '600px' : '300px',
                      background: i === 0 ? '#ddd5c5' : i === 1 ? '#c8bfaf' : '#d5ccbc',
                    }}>
                      <span style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: '5rem', color: 'rgba(0,0,0,0.06)',
                        fontStyle: 'italic',
                      }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                  )}
                  <div className="masonry-overlay">
                    <div className="masonry-label">
                      <p>{item.title}</p>
                      <span>From €{parseFloat(item.price).toFixed(0)} →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* PHILOSOPHY */}
        <div className="philosophy">
          <p className="small">VHERSO Canvas — Philosophy</p>
          <blockquote>
            "Art is the space between who you are and who you want to become."
          </blockquote>
          <p className="author">— VHERSO, Est. 2024</p>
        </div>

        {/* FOOTER CTA */}
        <div className="canvas-footer-cta">
          <h3>Own a piece<br />of the culture.</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/shop" className="btn-dark">
              Shop All Canvas →
            </Link>
            <Link href="/shop" className="btn-outline-dark">
              Back to Store
            </Link>
          </div>
        </div>

        <style>{`
          @keyframes scrollLine {
            0% { top: -100%; }
            100% { top: 200%; }
          }
        `}</style>
      </div>
    </>
  )
}