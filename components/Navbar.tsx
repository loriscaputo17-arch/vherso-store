'use client'

import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const { cartCount, openCart } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { label: 'SHOP', href: '/shop' },
    { label: 'AMOUR CLUB', href: '/collections/amour-club' },
    { label: 'SKI', href: '/collections/ski-collection' },
    { label: 'BASICS', href: '/collections/basics-collection' },
    { label: 'CANVAS', href: '/canvas' },
  ]

  return (
    <>
      <style>{`
        .nav-link {
          display: block;
          font-size: 0.62rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.4);
          text-decoration: none;
          padding: 0.5rem 0.8rem;
          transition: color 0.15s;
          font-weight: 300;
          white-space: nowrap;
        }
        .nav-link:hover { color: #080808; }

        .nav-bag {
          background: none;
          border: 1px solid rgba(0,0,0,0.15);
          cursor: pointer;
          color: #080808;
          font-size: 0.62rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 0.45rem 1rem;
          transition: all 0.15s;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: 'DM Sans', sans-serif;
        }
        .nav-bag:hover {
          background: #080808;
          color: #f5f5f5;
          border-color: #080808;
        }

        nav.scrolled {
          height: 52px !important;
          background: rgba(245,245,245,0.99) !important;
          border-bottom-color: rgba(0,0,0,0.08) !important;
        }

        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-search { display: none !important; }
          .hamburger { display: flex !important; }
        }
        @media (min-width: 769px) {
          .hamburger { display: none !important; }
          .mobile-menu { display: none !important; }
        }
      `}</style>

      <nav
        className={scrolled ? 'scrolled' : ''}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          height: '64px',
          background: 'rgba(245,245,245,0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          transition: 'all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
        }}
      >

        {/* DEFAULT — logo sx, links centro, bag dx */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%', padding: '0 2rem',
          opacity: scrolled ? 0 : 1,
          transform: scrolled ? 'translateY(-8px)' : 'translateY(0)',
          transition: 'opacity 0.3s, transform 0.3s',
          position: 'absolute', inset: 0,
          pointerEvents: scrolled ? 'none' : 'auto',
        }}>
          <Link href="/" style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '1.6rem', letterSpacing: '0.15em',
            color: '#080808', textDecoration: 'none', flexShrink: 0,
          }}>
            VHERSO
          </Link>

          <ul className="nav-desktop" style={{
            display: 'flex', gap: '0.2rem',
            listStyle: 'none', margin: 0, padding: 0,
            position: 'absolute', left: '50%',
            transform: 'translateX(-50%)',
          }}>
            {links.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className="nav-link">{label}</Link>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
            <button className="nav-search nav-link" style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif',
            }}>
              SEARCH
            </button>
            <div
              className="nav-search"
              style={{ width: '1px', height: '14px', background: 'rgba(0,0,0,0.1)' }}
            />
            <button className="nav-bag" onClick={openCart}>
              BAG
              {cartCount > 0 && (
                <span style={{
                  background: '#080808', color: '#f5f5f5',
                  borderRadius: '50%', width: '16px', height: '16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.55rem', fontWeight: 600,
                }}>
                  {cartCount}
                </span>
              )}
            </button>

            <button
              className="hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'none', flexDirection: 'column',
                gap: '5px', padding: '4px',
              }}
            >
              {[
                menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
                'none',
                menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
              ].map((transform, i) => (
                <span key={i} style={{
                  display: 'block', width: '22px', height: '1.5px',
                  background: '#080808', transition: 'all 0.3s',
                  transform,
                  opacity: i === 1 ? (menuOpen ? 0 : 1) : 1,
                }} />
              ))}
            </button>
          </div>
        </div>

        {/* SCROLLED — logo centro */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          height: '100%', padding: '0 2rem',
          opacity: scrolled ? 1 : 0,
          transform: scrolled ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.3s, transform 0.3s',
          position: 'absolute', inset: 0,
          pointerEvents: scrolled ? 'auto' : 'none',
        }}>
          <Link href="/" style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '1.4rem', letterSpacing: '0.2em',
            color: '#080808', textDecoration: 'none',
            position: 'absolute', left: '50%',
            transform: 'translateX(-50%)',
          }}>
            VHERSO
          </Link>

          <button
            className="nav-bag"
            onClick={openCart}
            style={{
              position: 'absolute', right: '2rem',
              background: 'none', border: '1px solid rgba(0,0,0,0.15)',
              cursor: 'pointer', color: '#080808',
              fontSize: '0.62rem', letterSpacing: '0.18em',
              textTransform: 'uppercase', padding: '0.45rem 1rem',
              transition: 'all 0.15s', display: 'flex',
              alignItems: 'center', gap: '0.4rem',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            BAG
            {cartCount > 0 && (
              <span style={{
                background: '#080808', color: '#f5f5f5',
                borderRadius: '50%', width: '16px', height: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.55rem', fontWeight: 600,
              }}>
                {cartCount}
              </span>
            )}
          </button>

          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              position: 'absolute', left: '2rem',
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'none', flexDirection: 'column',
              gap: '5px', padding: '4px',
            }}
          >
            {[
              menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
              'none',
              menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
            ].map((transform, i) => (
              <span key={i} style={{
                display: 'block', width: '22px', height: '1.5px',
                background: '#080808', transition: 'all 0.3s',
                transform,
                opacity: i === 1 ? (menuOpen ? 0 : 1) : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className="mobile-menu"
        style={{
          position: 'fixed', top: '64px', left: 0, right: 0, bottom: 0,
          zIndex: 99, background: '#f5f5f5',
          display: 'flex', flexDirection: 'column',
          padding: '2rem',
          transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
        }}
      >
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, flex: 1 }}>
          {links.map(({ label, href }, i) => (
            <li key={href} style={{
              borderBottom: '1px solid rgba(0,0,0,0.06)',
              transform: menuOpen ? 'translateX(0)' : 'translateX(-20px)',
              opacity: menuOpen ? 1 : 0,
              transition: `transform 0.4s ${i * 0.05}s, opacity 0.4s ${i * 0.05}s`,
            }}>
              <Link
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block', padding: '1.2rem 0',
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '2.2rem', letterSpacing: '0.06em',
                  color: '#080808', textDecoration: 'none',
                }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div style={{ paddingTop: '2rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <button
            onClick={() => { openCart(); setMenuOpen(false) }}
            style={{
              width: '100%', justifyContent: 'center',
              padding: '1rem', fontSize: '0.75rem',
              fontFamily: 'DM Sans, sans-serif',
              background: '#080808',
              border: 'none',
              cursor: 'pointer', color: '#f5f5f5',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}
          >
            BAG ({cartCount})
          </button>
        </div>
      </div>
    </>
  )
}