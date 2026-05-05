'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getT } from '@/lib/i18n.client'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [t, setT] = useState<(k: string) => string>(() => (k: string) => k)

  useEffect(() => {
    setT(() => getT('cookieBanner'))
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie_consent', 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('cookie_consent', 'declined')
    setVisible(false)
  }

  /*const accept = () => {
      localStorage.setItem('cookie_consent', 'accepted')
    setVisible(false)
    // dispatcha evento per caricare i tracking scripts
    window.dispatchEvent(new Event('cookie_accepted'))
  }

  const decline = () => {
    localStorage.setItem('cookie_consent', 'declined')
    setVisible(false)
  }*/

  if (!visible) return null

  return (
    <>
      <style>{`
        @keyframes slideUp { from{transform:translateY(100%);opacity:0} to{transform:translateY(0);opacity:1} }
        .cookie-banner { animation: slideUp 0.4s cubic-bezier(0.25,0.46,0.45,0.94) forwards; }
      `}</style>
      <div className="cookie-banner" style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        zIndex: 999, background: '#080808',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '1.5rem 2rem',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
      }}>
        <div style={{ flex: 1, minWidth: '260px' }}>
          <p style={{
            fontFamily: "'CenturyGothic',sans-serif",
            fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.7, margin: 0,
          }}>
            {t('message')}{' '}
            <Link href="/cookies" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
              {t('policy')}
            </Link>
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.8rem', flexShrink: 0 }}>
          <button onClick={decline} style={{
            background: 'none', border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.4)', padding: '0.7rem 1.5rem',
            fontSize: '0.62rem', letterSpacing: '0.15em',
            textTransform: 'uppercase', cursor: 'pointer',
            fontFamily: "'CenturyGothic',sans-serif", transition: 'all 0.2s',
          }}>
            {t('decline')}
          </button>
          <button onClick={accept} style={{
            background: '#f5f5f5', border: 'none',
            color: '#080808', padding: '0.7rem 1.5rem',
            fontSize: '0.62rem', letterSpacing: '0.15em',
            textTransform: 'uppercase', cursor: 'pointer',
            fontFamily: "'CenturyGothic',sans-serif",
            fontWeight: 700, transition: 'all 0.2s',
          }}>
            {t('accept')}
          </button>
        </div>
      </div>
    </>
  )
}