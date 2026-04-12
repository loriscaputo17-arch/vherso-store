'use client'

import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import SearchOverlay from './SearchOverlay'

export default function Navbar() {
  const { cartCount, openCart } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

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
          font-size: 0.58rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.35);
          text-decoration: none;
          padding: 0.5rem 0.9rem;
          transition: color 0.2s;
          font-weight: 400;
          white-space: nowrap;
          font-family: 'CenturyGothic', sans-serif;
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0.9rem; right: 0.9rem;
          height: 1px;
          background: #080808;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .nav-link:hover { color: #080808; }
        .nav-link:hover::after { transform: scaleX(1); }

        .nav-bag {
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(0,0,0,0.5);
          font-size: 0.58rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 0.5rem 0;
          transition: color 0.2s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'CenturyGothic', sans-serif;
          font-weight: 400;
        }
        .nav-bag:hover { color: #080808; }

        nav.scrolled {
          height: 50px !important;
          border-bottom-color: rgba(0,0,0,0.08) !important;
          background: rgba(245,245,245,1) !important;
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
          height: '68px',
          background: 'rgba(245,245,245,0.96)',
          backdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          transition: 'all 0.5s cubic-bezier(0.25,0.46,0.45,0.94)',
        }}
      >

        {/* DEFAULT */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%', padding: '0 2.5rem',
          opacity: scrolled ? 0 : 1,
          transform: scrolled ? 'translateY(-6px)' : 'translateY(0)',
          transition: 'opacity 0.3s, transform 0.3s',
          position: 'absolute', inset: 0,
          pointerEvents: scrolled ? 'none' : 'auto',
        }}>

          {/* LOGO */}
          <Link href="/" style={{
            display: 'flex', alignItems: 'center', gap: '0.7rem',
            textDecoration: 'none', flexShrink: 0,
          }}>
            <img
              src="/logo.png"
              alt="VHERSO"
              style={{ height: '36px', width: 'auto', display: 'block' }}
            />
            <span style={{
              fontFamily: "'CenturyGothic', sans-serif",
              fontSize: '0.95rem',
              color: '#080808', fontWeight: 700,
              textTransform: 'uppercase',
            }}>
              VHERSO
            </span>
          </Link>

          {/* LINKS CENTER */}
          <ul className="nav-desktop" style={{
            display: 'flex', gap: '0',
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

          {/* RIGHT */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexShrink: 0 }}>
            <button
              className="nav-search nav-bag"
              onClick={() => setSearchOpen(true)}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              SEARCH
            </button>
            <div className="nav-search" style={{
              width: '1px', height: '12px', background: 'rgba(0,0,0,0.12)',
            }} />
            <button className="nav-bag" onClick={openCart}>
              BAG
              {cartCount > 0 && (
                <span style={{
                  background: '#080808', color: '#f5f5f5',
                  borderRadius: '50%', width: '16px', height: '16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.52rem', fontWeight: 700,
                }}>
                  {cartCount}
                </span>
              )}
            </button>

            {/* HAMBURGER */}
            <button
              className="hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'none', flexDirection: 'column',
                gap: '4px', padding: '4px',
              }}
            >
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: 'block', height: '1px',
                  background: '#080808', transition: 'all 0.3s',
                  width: i === 1 ? '16px' : '22px',
                  transform: menuOpen
                    ? i === 0 ? 'rotate(45deg) translate(3px, 3px)'
                    : i === 2 ? 'rotate(-45deg) translate(3px, -3px)'
                    : 'none' : 'none',
                  opacity: i === 1 ? (menuOpen ? 0 : 1) : 1,
                }} />
              ))}
            </button>
          </div>
        </div>

        {/* SCROLLED — logo centro */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          height: '100%', padding: '0 2.5rem',
          opacity: scrolled ? 1 : 0,
          transform: scrolled ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 0.3s, transform 0.3s',
          position: 'absolute', inset: 0,
          pointerEvents: scrolled ? 'auto' : 'none',
        }}>
          <Link href="/" style={{
            display: 'flex', alignItems: 'center', gap: '0.6rem',
            textDecoration: 'none',
            position: 'absolute', left: '50%',
            transform: 'translateX(-50%)',
          }}>
            <img
              src="/logo.png"
              alt="VHERSO"
              style={{ height: '28px', width: 'auto', display: 'block' }}
            />
            <span style={{
              fontFamily: "'CenturyGothic', sans-serif",
              fontSize: '0.85rem',
              color: '#080808', fontWeight: 700,
              textTransform: 'uppercase',
            }}>
              VHERSO
            </span>
          </Link>

          <button
            className="nav-bag"
            onClick={openCart}
            style={{ position: 'absolute', right: '2.5rem' }}
          >
            BAG
            {cartCount > 0 && (
              <span style={{
                background: '#080808', color: '#f5f5f5',
                borderRadius: '50%', width: '16px', height: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.52rem', fontWeight: 700,
              }}>
                {cartCount}
              </span>
            )}
          </button>

          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              position: 'absolute', left: '2.5rem',
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'none', flexDirection: 'column',
              gap: '4px', padding: '4px',
            }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', height: '1px',
                background: '#080808', transition: 'all 0.3s',
                width: i === 1 ? '16px' : '22px',
                transform: menuOpen
                  ? i === 0 ? 'rotate(45deg) translate(3px, 3px)'
                  : i === 2 ? 'rotate(-45deg) translate(3px, -3px)'
                  : 'none' : 'none',
                opacity: i === 1 ? (menuOpen ? 0 : 1) : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* MOBILE MENU */}
      <div
        className="mobile-menu"
        style={{
          position: 'fixed', top: '68px', left: 0, right: 0, bottom: 0,
          zIndex: 99, background: '#f5f5f5',
          display: 'flex', flexDirection: 'column',
          padding: '3rem 2.5rem',
          transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)',
        }}
      >
        {/* MOBILE LOGO */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.6rem',
          marginBottom: '3rem', paddingBottom: '2rem',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
        }}>
          <img src="/logo.png" alt="VHERSO" style={{ height: '32px', width: 'auto' }} />
          <span style={{
            fontFamily: "'CenturyGothic', sans-serif",
            fontSize: '0.9rem', letterSpacing: '0.3em',
            color: '#080808', fontWeight: 700,
          }}>
            VHERSO
          </span>
        </div>

        <ul style={{ listStyle: 'none', margin: 0, padding: 0, flex: 1 }}>
          {links.map(({ label, href }, i) => (
            <li key={href} style={{
              transform: menuOpen ? 'translateX(0)' : 'translateX(-24px)',
              opacity: menuOpen ? 1 : 0,
              transition: `transform 0.4s ${i * 0.06}s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.4s ${i * 0.06}s`,
            }}>
              <Link
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1.1rem 0',
                  borderBottom: '1px solid rgba(0,0,0,0.05)',
                  fontFamily: "'CenturyGothic', sans-serif",
                  fontSize: '1.6rem', letterSpacing: '0.04em',
                  fontWeight: 700,
                  color: '#080808', textDecoration: 'none',
                }}
                onMouseEnter={e => (e.currentTarget.style.paddingLeft = '0.5rem')}
                onMouseLeave={e => (e.currentTarget.style.paddingLeft = '0')}
              >
                {label}
                <span style={{ fontSize: '1rem', color: 'rgba(0,0,0,0.2)' }}>→</span>
              </Link>
            </li>
          ))}
        </ul>

        <div style={{
          paddingTop: '2rem',
          display: 'flex', flexDirection: 'column', gap: '1rem',
        }}>
          <button
            onClick={() => setSearchOpen(true)}
            style={{
              width: '100%', padding: '1rem',
              fontSize: '0.65rem', fontFamily: 'CenturyGothic, sans-serif',
              background: 'none',
              border: '1px solid rgba(0,0,0,0.12)',
              cursor: 'pointer', color: 'rgba(0,0,0,0.5)',
              letterSpacing: '0.2em', textTransform: 'uppercase',
            }}
          >
            SEARCH
          </button>
          <button
            onClick={() => { openCart(); setMenuOpen(false) }}
            style={{
              width: '100%', padding: '1rem',
              fontSize: '0.65rem', fontFamily: 'CenturyGothic, sans-serif',
              background: '#080808', border: 'none',
              cursor: 'pointer', color: '#f5f5f5',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '0.5rem',
            }}
          >
            BAG
            {cartCount > 0 && `(${cartCount})`}
          </button>
        </div>
      </div>
    </>
  )
}