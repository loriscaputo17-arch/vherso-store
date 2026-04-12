'use client'

import Link from 'next/link'

export default function Footer() {
  const cols = [
    { title: 'SHOP', links: [
      { label: 'New Arrivals', href: '/shop' },
      { label: 'Amour Club', href: '/collections/amour-club' },
      { label: 'Ski Collection', href: '/collections/ski-collection' },
      { label: 'Basics', href: '/collections/basics-collection' },
      { label: 'Canvas', href: '/canvas' },
    ]},
    { title: 'INFO', links: [
      { label: 'About Us', href: '/about' },
      { label: 'Shipping', href: '/shipping' },
      { label: 'Returns', href: '/returns' },
      { label: 'Contact', href: '/contact' },
    ]},
    { title: 'LEGAL', links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Cookies', href: '/cookies' },
    ]},
  ]

  return (
    <>
      <style>{`
        .footer-link { font-size:0.72rem; color:rgba(255,255,255,0.3); letter-spacing:0.06em; text-decoration:none; transition:color 0.2s; font-family:'CenturyGothic',sans-serif; }
        .footer-link:hover { color:rgba(255,255,255,0.8); }
        .social-btn { width:36px; height:36px; border:1px solid rgba(255,255,255,0.12); display:flex; align-items:center; justify-content:center; font-size:0.55rem; letter-spacing:0.12em; color:rgba(255,255,255,0.35); text-decoration:none; transition:all 0.2s; font-family:'CenturyGothic',sans-serif; }
        .social-btn:hover { border-color:rgba(255,255,255,0.5); color:rgba(255,255,255,0.8); }

        @media (max-width:768px) {
          .footer-grid { grid-template-columns:1fr 1fr !important; }
          .footer-brand { grid-column:1/-1 !important; }
          .footer-bottom { flex-direction:column !important; gap:0.5rem !important; align-items:flex-start !important; }
        }
        @media (max-width:480px) {
          .footer-grid { grid-template-columns:1fr !important; }
        }
      `}</style>

      <footer style={{ background: '#080808', borderTop: '1px solid rgba(255,255,255,0.04)' }}>

        {/* TOP MARQUEE */}
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', overflow: 'hidden', height: '48px', display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', animation: 'fticker 20s linear infinite', whiteSpace: 'nowrap' }}>
            {Array(8).fill('VHERSO — CLUB LIFESTYLE — SS26 — FREE SHIPPING +€200 — ').map((t, i) => (
              <span key={i} style={{ fontFamily: "'CenturyGothic',sans-serif", fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.59)', paddingRight: '2rem' }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* MAIN */}
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem', padding: '4rem 2rem 3rem' }}>

          {/* BRAND */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '1.2rem' }}>
              <img src="/logo.png" alt="VHERSO" style={{ height: '48px', width: 'auto', opacity: 0.9 }} />
              <span style={{ fontFamily: "'CenturyGothic',sans-serif", fontSize: '0.9rem', fontWeight: 700, color: '#f5f5f5', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                VHERSO
              </span>
            </div>
            <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.22)', lineHeight: 1.85, maxWidth: '240px', marginBottom: '2rem', fontFamily: "'CenturyGothic',sans-serif" }}>
              Club lifestyle brand. Built for those who move with intention — ski slopes, rooftops, late dinners.
            </p>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <a href="https://www.instagram.com/vhersoo/" target="_blank" rel="noopener noreferrer" className="social-btn">IG</a>
              <a href="https://www.tiktok.com/@vhersoclo" target="_blank" rel="noopener noreferrer" className="social-btn">TK</a>
            </div>
          </div>

          {/* COLS */}
          {cols.map(({ title, links }) => (
            <div key={title}>
              <p style={{ fontFamily: "'CenturyGothic',sans-serif", fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '1.4rem' }}>
                {title}
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="footer-link">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* NEWSLETTER */}
        <div style={{ padding: '2rem', borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <p style={{ fontFamily: "'CenturyGothic',sans-serif", fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '0.3rem' }}>
              NEWSLETTER
            </p>
            <p style={{ fontFamily: "'CenturyGothic',sans-serif", fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.06em' }}>
              Drop alerts & exclusive access
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0', flexWrap: 'wrap' }}>
            <input
              type="email"
              placeholder="Your email"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRight: 'none', color: '#fff', padding: '0.8rem 1.2rem', fontSize: '0.68rem', letterSpacing: '0.06em', fontFamily: "'CenturyGothic',sans-serif", outline: 'none', width: '240px' }}
            />
            <button style={{ background: '#f5f5f5', color: '#080808', border: 'none', padding: '0.8rem 1.5rem', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'CenturyGothic',sans-serif", fontWeight: 700, whiteSpace: 'nowrap' }}>
              SUBSCRIBE
            </button>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="footer-bottom" style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: "'CenturyGothic',sans-serif", fontSize: '0.58rem', color: 'rgba(255,255,255,0.12)', letterSpacing: '0.1em' }}>
            © 2026 VHERSO — All rights reserved
          </span>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {['Privacy', 'Terms', 'Cookies'].map(l => (
              <Link key={l} href={`/${l.toLowerCase()}`} style={{ fontFamily: "'CenturyGothic',sans-serif", fontSize: '0.58rem', color: 'rgba(255,255,255,0.12)', letterSpacing: '0.1em', textDecoration: 'none' }}>
                {l}
              </Link>
            ))}
          </div>
          <span style={{ fontFamily: "'CenturyGothic',sans-serif", fontSize: '0.58rem', color: 'rgba(255,255,255,0.12)', letterSpacing: '0.1em' }}>
            MILAN — ITALY
          </span>
        </div>

      </footer>

      <style>{`
        @keyframes fticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
      `}</style>
    </>
  )
}