'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Footer() {

  return (
    <footer style={{
        borderTop: '1px solid rgba(0,0,0,0.08)',
        background: '#080808',
        padding: '4rem 2rem 2rem',
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr',
        gap: '3rem',
      }}>
        <div>
          <div style={{
            fontFamily: "'CenturyGothic', sans-serif",
            fontSize: '3rem', letterSpacing: '0.1em',
            marginBottom: '1rem', color: '#f5f5f5',
          }}>
            VHERSO
          </div>
          <p style={{
            fontSize: '0.72rem', color: 'rgba(255,255,255,0.25)',
            lineHeight: 1.8, maxWidth: '240px',
          }}>
            Club lifestyle brand. Built for those who move with intention.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            {[
              { label: 'IG', href: 'https://www.instagram.com/vhersoo/' },
              { label: 'TK', href: 'https://www.tiktok.com/@vhersoclo' }
            ].map(s => (
              <a 
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '36px', height: '36px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)',
                  cursor: 'pointer',
                  textDecoration: 'none'
                }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
        {[
          { title: 'SHOP', links: [
            { label: 'New Arrivals', href: '/shop' },
            { label: 'Amour Club', href: '/collections/amour-club' },
            { label: 'Ski Collection', href: '/collections/ski-collection' },
            { label: 'Basics', href: '/collections/basics-collection' },
            { label: 'Canvas', href: '/collections/canvas' },
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
        ].map(({ title, links }) => (
          <div key={title}>
            <h4 style={{
              fontFamily: "'CenturyGothic', sans-serif",
              fontSize: '1.1rem', letterSpacing: '0.1em',
              color: '#f5f5f5', marginBottom: '1.2rem',
            }}>
              {title}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {links.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} style={{
                    fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)',
                    letterSpacing: '0.04em',
                  }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          gridColumn: '1 / -1', paddingTop: '1.5rem',
          display: 'flex', justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.15)', letterSpacing: '0.1em' }}>
            © 2026 VHERSO
          </span>
          <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.15)', letterSpacing: '0.1em' }}>
            MILAN — ITALY
          </span>
        </div>
      </footer>
  )
}