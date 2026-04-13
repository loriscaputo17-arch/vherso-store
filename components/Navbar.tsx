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

  return (
    <>
      <style>{`
        .nl { display:block; font-size:0.58rem; letter-spacing:0.2em; text-transform:uppercase; color:rgba(0,0,0,0.35); text-decoration:none; padding:0.5rem 0.9rem; transition:color 0.2s; font-weight:400; white-space:nowrap; font-family:'CenturyGothic',sans-serif; position:relative; }
        .nl::after { content:''; position:absolute; bottom:0; left:0.9rem; right:0.9rem; height:1px; background:#080808; transform:scaleX(0); transform-origin:left; transition:transform 0.25s cubic-bezier(0.25,0.46,0.45,0.94); }
        .nl:hover { color:#080808; }
        .nl:hover::after { transform:scaleX(1); }

        .nb { background:none; border:none; cursor:pointer; color:rgba(0,0,0,0.45); font-size:0.58rem; letter-spacing:0.2em; text-transform:uppercase; padding:0.4rem 0; transition:color 0.2s; display:flex; align-items:center; gap:0.5rem; font-family:'CenturyGothic',sans-serif; font-weight:400; }
        .nb:hover { color:#080808; }

        nav.s { height:50px !important; background:rgba(245,245,245,1) !important; border-bottom-color:rgba(0,0,0,0.08) !important; }

        @media (max-width:768px) {
          .nd { display:none !important; }
          .ns { display:none !important; }
          .hb { display:flex !important; }
          nav { height:56px !important; }
          nav.s { height:50px !important; }
        }
        @media (min-width:769px) {
          .hb { display:none !important; }
          .mm { display:none !important; }
        }
      `}</style>

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

        {/* DEFAULT */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: '100%', padding: '0 2rem',
          position: 'absolute', inset: 0,
          opacity: scrolled ? 0 : 1,
          transform: scrolled ? 'translateY(-6px)' : 'translateY(0)',
          transition: 'opacity 0.3s, transform 0.3s',
          pointerEvents: scrolled ? 'none' : 'auto',
        }}>

          {/* LOGO */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
            <img src="/logo.png" alt="VHERSO" style={{ height: '34px', width: 'auto', display: 'block' }} />
          </Link>

          {/* LINKS CENTER */}
          <ul className="nd" style={{
            display: 'flex', listStyle: 'none', margin: 0, padding: 0,
            position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          }}>
            {links.map(({ label, href }) => (
              <li key={href}><Link href={href} className="nl">{label}</Link></li>
            ))}
          </ul>

          {/* RIGHT */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', flexShrink: 0 }}>
            <button className="ns nb" onClick={() => setSearchOpen(true)}>SEARCH</button>
            <div className="ns" style={{ width: '1px', height: '12px', background: 'rgba(0,0,0,0.1)' }} />
            <button className="nb" onClick={openCart}>
              BAG
              {cartCount > 0 && (
                <span style={{ background: '#080808', color: '#f5f5f5', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.5rem', fontWeight: 700 }}>
                  {cartCount}
                </span>
              )}
            </button>
            <button className="hb" onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none', flexDirection: 'column', gap: '5px', padding: '2px' }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: 'block', height: '1.5px', background: '#080808',
                  width: i === 1 ? '14px' : '20px', transition: 'all 0.3s',
                  transform: menuOpen ? (i === 0 ? 'rotate(45deg) translate(4px,4px)' : i === 2 ? 'rotate(-45deg) translate(4px,-4px)' : 'none') : 'none',
                  opacity: i === 1 ? (menuOpen ? 0 : 1) : 1,
                }} />
              ))}
            </button>
          </div>
        </div>

        {/* SCROLLED */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          height: '100%', padding: '0 2rem',
          position: 'absolute', inset: 0,
          opacity: scrolled ? 1 : 0,
          transform: scrolled ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 0.3s, transform 0.3s',
          pointerEvents: scrolled ? 'auto' : 'none',
        }}>
          {/* LOGO CENTER */}
          <Link href="/" style={{
            display: 'flex', alignItems: 'center', textDecoration: 'none',
            position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          }}>
            <img src="/logo.png" alt="VHERSO" style={{ height: '26px', width: 'auto', display: 'block' }} />
          </Link>

          <button className="nb" onClick={openCart} style={{ position: 'absolute', right: '2rem' }}>
            BAG
            {cartCount > 0 && (
              <span style={{ background: '#080808', color: '#f5f5f5', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.5rem', fontWeight: 700 }}>
                {cartCount}
              </span>
            )}
          </button>

          <button className="hb" onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none', flexDirection: 'column', gap: '5px', padding: '2px', position: 'absolute', left: '2rem' }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', height: '1.5px', background: '#080808',
                width: i === 1 ? '14px' : '20px', transition: 'all 0.3s',
                transform: menuOpen ? (i === 0 ? 'rotate(45deg) translate(4px,4px)' : i === 2 ? 'rotate(-45deg) translate(4px,-4px)' : 'none') : 'none',
                opacity: i === 1 ? (menuOpen ? 0 : 1) : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* MOBILE MENU */}
      <div className="mm" style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 98, background: '#f5f5f5',
        display: 'flex', flexDirection: 'column',
        paddingTop: '80px',
        transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)',
        overflowY: 'auto',
      }}>

        {/* LOGO CENTRATO */}
        <div style={{
          display: 'flex', justifyContent: 'center',
          padding: '0 2rem 2rem',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          marginBottom: '2rem',
        }}>
          <img src="/logo.png" alt="VHERSO" style={{ height: '40px', width: 'auto' }} />
        </div>

        {/* LINKS */}
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
                  padding: '1.1rem 0',
                  borderBottom: '1px solid rgba(0,0,0,0.05)',
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

        {/* BOTTOM */}
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <button onClick={() => { setSearchOpen(true); setMenuOpen(false) }} style={{
            padding: '0.9rem', background: 'none',
            border: '1px solid rgba(0,0,0,0.12)', cursor: 'pointer',
            color: 'rgba(0,0,0,0.45)', fontSize: '0.62rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            fontFamily: "'CenturyGothic',sans-serif",
          }}>
            SEARCH
          </button>
          <button onClick={() => { openCart(); setMenuOpen(false) }} style={{
            padding: '0.9rem', background: '#080808', border: 'none',
            cursor: 'pointer', color: '#f5f5f5', fontSize: '0.62rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            fontFamily: "'CenturyGothic',sans-serif",
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
          }}>
            BAG {cartCount > 0 && `(${cartCount})`}
          </button>
        </div>
      </div>
    </>
  )
}