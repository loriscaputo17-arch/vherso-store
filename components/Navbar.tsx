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

  const Hamburger = ({ onClick }: { onClick: () => void }) => (
    <button onClick={onClick} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '5px', padding: '4px' }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          display: 'block', height: '1.5px', background: '#080808',
          width: i === 1 ? '14px' : '20px', transition: 'all 0.3s',
          transform: menuOpen
            ? i === 0 ? 'rotate(45deg) translate(4px,4px)'
            : i === 2 ? 'rotate(-45deg) translate(4px,-4px)'
            : 'none'
            : 'none',
          opacity: i === 1 ? (menuOpen ? 0 : 1) : 1,
        }} />
      ))}
    </button>
  )

  return (
    <>
      <style>{`
        .nb {
          background: none; border: none; cursor: pointer;
          color: rgba(0,0,0,0.5); font-size: 0.7rem;
          letter-spacing: 0.2em; text-transform: uppercase;
          padding: 0.4rem 0; transition: color 0.2s;
          display: flex; align-items: center; gap: 0.5rem;
          font-family: 'CenturyGothic', sans-serif; font-weight: 400;
        }
        .nb:hover { color: #080808; }

        nav.s {
          height: 50px !important;
          background: rgba(245,245,245,1) !important;
          border-bottom-color: rgba(0,0,0,0.08) !important;
        }

        .sidebar {
          position: fixed; top: 0; left: 0; bottom: 0;
          width: 300px; z-index: 200;
          background: #f5f5f5;
          border-right: 1px solid rgba(0,0,0,0.06);
          display: flex; flex-direction: column;
          padding: 2rem;
          transform: translateX(-100%);
          transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .sidebar.open { transform: translateX(0); }

        .sidebar-overlay {
          position: fixed; inset: 0; z-index: 199;
          background: rgba(0,0,0,0);
          pointer-events: none;
          transition: background 0.4s, backdrop-filter 0.4s;
        }
        .sidebar-overlay.open {
          background: rgba(0,0,0,0.2);
          pointer-events: auto;
          backdrop-filter: blur(2px);
        }

        .slink {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1rem 0;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          font-family: 'CenturyGothic', sans-serif;
          font-size: 1.3rem; font-weight: 700;
          color: #080808; text-decoration: none;
          transition: padding-left 0.2s, color 0.2s;
        }
        .slink:hover { padding-left: 0.5rem; color: rgba(0,0,0,0.4); }

        @media (max-width: 768px) {
          .sidebar { display: none !important; }
          .sidebar-overlay { display: none !important; }
          .hbd { display: none !important; }
          .ns { display: none !important; }
          .hbm { display: flex !important; }
          nav { height: 56px !important; }
          nav.s { height: 50px !important; }
          .mm { display: flex !important; }
        }
        @media (min-width: 769px) {
          .hbm { display: none !important; }
          .mm { display: none !important; }
        }
      `}</style>

      {/* SIDEBAR OVERLAY */}
      <div
        className={`sidebar-overlay ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* SIDEBAR DESKTOP */}
      <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: '3rem', paddingBottom: '1.5rem',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
        }}>
          <img src="/logo.png" alt="VHERSO" style={{ height: '32px', width: 'auto' }} />
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(0,0,0,0.3)', fontSize: '1rem',
              width: '28px', height: '28px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'CenturyGothic',sans-serif",
              transition: 'color 0.2s',
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ flex: 1 }}>
          {links.map(({ label, href }, i) => (
            <Link
              key={href}
              href={href}
              className="slink"
              onClick={() => setMenuOpen(false)}
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateX(0)' : 'translateX(-16px)',
                transition: `opacity 0.4s ${i * 0.06}s, transform 0.4s ${i * 0.06}s cubic-bezier(0.25,0.46,0.45,0.94), padding-left 0.2s`,
              }}
            >
              {label}
              <span style={{ fontSize: '0.8rem', color: 'rgba(0,0,0,0.15)', fontWeight: 300 }}>→</span>
            </Link>
          ))}
        </div>

        <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <button
            onClick={() => { setSearchOpen(true); setMenuOpen(false) }}
            style={{
              padding: '0.9rem', background: 'none',
              border: '1px solid rgba(0,0,0,0.12)', cursor: 'pointer',
              color: 'rgba(0,0,0,0.45)', fontSize: '0.62rem',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              fontFamily: "'CenturyGothic',sans-serif",
            }}
          >
            SEARCH
          </button>
          <button
            onClick={() => { openCart(); setMenuOpen(false) }}
            style={{
              padding: '0.9rem', background: '#080808', border: 'none',
              cursor: 'pointer', color: '#f5f5f5', fontSize: '0.62rem',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              fontFamily: "'CenturyGothic',sans-serif",
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            }}
          >
            BAG {cartCount > 0 && `(${cartCount})`}
          </button>
        </div>
      </div>

      {/* NAV */}
      <nav
        className={scrolled ? 's' : ''}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          height: '68px',
          background: 'rgba(245,245,245,0.96)',
          backdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          transition: 'height 0.4s cubic-bezier(0.25,0.46,0.45,0.94), background 0.4s, border-color 0.4s',
        }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: '100%', padding: '0 2rem', position: 'relative',
        }}>

          {/* LEFT */}
          <div style={{ flexShrink: 0 }}>
            <div className="hbd">
              <Hamburger onClick={() => setMenuOpen(!menuOpen)} />
            </div>
            <div className="hbm">
              <Hamburger onClick={() => setMenuOpen(!menuOpen)} />
            </div>
          </div>

          {/* CENTER — logo */}
          <Link href="/" style={{
            position: 'absolute', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', alignItems: 'center', textDecoration: 'none',
          }}>
            <img
              src="/logo.png"
              alt="VHERSO"
              style={{
                height: scrolled ? '40px' : '60px',
                width: 'auto', display: 'block',
                transition: 'height 0.4s',
              }}
            />
          </Link>

          {/* RIGHT */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', flexShrink: 0 }}>
            <button className="ns nb" onClick={() => setSearchOpen(true)}>SEARCH</button>
            <div className="ns" style={{ width: '1px', height: '12px', background: 'rgba(0,0,0,0.1)' }} />
            <button className="nb" onClick={openCart}>
              BAG
              {cartCount > 0 && (
                <span style={{
                  background: '#080808', color: '#f5f5f5',
                  borderRadius: '50%', width: '16px', height: '16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.5rem', fontWeight: 700,
                }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* MOBILE MENU */}
      <div
        className="mm"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 98, background: '#f5f5f5',
          display: 'none', flexDirection: 'column',
          paddingTop: '80px',
          transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)',
          overflowY: 'auto',
        }}
      >
        <div style={{
          display: 'flex', justifyContent: 'center',
          padding: '0 2rem 2rem',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          marginBottom: '2rem',
        }}>
          <img src="/logo.png" alt="VHERSO" style={{ height: '40px', width: 'auto' }} />
        </div>

        <ul style={{ listStyle: 'none', margin: 0, padding: '0 2rem', flex: 1 }}>
          {links.map(({ label, href }, i) => (
            <li key={href} style={{
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateX(0)' : 'translateX(-20px)',
              transition: `opacity 0.4s ${i * 0.06}s, transform 0.4s ${i * 0.06}s cubic-bezier(0.25,0.46,0.45,0.94)`,
            }}>
              <Link
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '1.1rem 0', borderBottom: '1px solid rgba(0,0,0,0.05)',
                  fontFamily: "'CenturyGothic',sans-serif",
                  fontSize: '1.5rem', fontWeight: 700,
                  color: '#080808', textDecoration: 'none',
                  transition: 'padding-left 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.paddingLeft = '0.5rem')}
                onMouseLeave={e => (e.currentTarget.style.paddingLeft = '0')}
              >
                {label}
                <span style={{ fontSize: '0.9rem', color: 'rgba(0,0,0,0.18)', fontWeight: 300 }}>→</span>
              </Link>
            </li>
          ))}
        </ul>

        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <button
            onClick={() => { setSearchOpen(true); setMenuOpen(false) }}
            style={{
              padding: '0.9rem', background: 'none',
              border: '1px solid rgba(0,0,0,0.12)', cursor: 'pointer',
              color: 'rgba(0,0,0,0.45)', fontSize: '0.62rem',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              fontFamily: "'CenturyGothic',sans-serif",
            }}
          >
            SEARCH
          </button>
          <button
            onClick={() => { openCart(); setMenuOpen(false) }}
            style={{
              padding: '0.9rem', background: '#080808', border: 'none',
              cursor: 'pointer', color: '#f5f5f5', fontSize: '0.62rem',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              fontFamily: "'CenturyGothic',sans-serif",
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            }}
          >
            BAG {cartCount > 0 && `(${cartCount})`}
          </button>
        </div> 
      </div>
    </>
  )
}