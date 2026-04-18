'use client'

import { useState, useEffect } from 'react'

export default function PageLoader() {
  const [visible, setVisible] = useState(true)
  const [hiding, setHiding] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setHiding(true), 2600)
    const t2 = setTimeout(() => setVisible(false), 3200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (!visible) return null

  return (
    <>
      <style>{`
        @keyframes loaderFadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes loaderLineIn {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes loaderLogoIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes loaderTagIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes loaderCountIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 0.2; transform: translateY(0); }
        }
      `}</style>

      <div style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#f5f5f5',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        animation: hiding ? 'loaderFadeOut 0.6s cubic-bezier(0.25,0.46,0.45,0.94) forwards' : 'none',
      }}>

        {/* LOGO */}
        <div style={{
          animation: 'loaderLogoIn 0.8s cubic-bezier(0.25,0.46,0.45,0.94) 0.2s both',
          marginBottom: '2.5rem',
        }}>
          <img src="/logo.png" alt="VHERSO" style={{ height: '100px', width: 'auto' }} />
        </div>

        {/* PROGRESS BAR */}
        <div style={{
          width: '120px', height: '1px',
          background: 'rgba(0,0,0,0.08)',
          position: 'relative', overflow: 'hidden',
          marginBottom: '2rem',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: '#080808',
            transformOrigin: 'left',
            animation: 'loaderLineIn 2.4s cubic-bezier(0.25,0.46,0.45,0.94) 0.4s both',
          }} />
        </div>

        {/* TAG */}
        <p style={{
          fontFamily: "'CenturyGothic', sans-serif",
          fontSize: '1rem', letterSpacing: '0.28em',
          textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)',
          animation: 'loaderTagIn 0.6s ease 0.8s both',
        }}>
          Club Lifestyle — SS26
        </p>

        {/* BG TEXT */}
        <div style={{
          position: 'absolute',
          fontFamily: "'CenturyGothic', sans-serif",
          fontSize: 'clamp(80px, 18vw, 200px)',
          fontWeight: 900, color: 'rgba(0,0,0,0.1)',
          userSelect: 'none', letterSpacing: '0.05em',
          animation: 'loaderCountIn 0.8s ease 0.3s both',
          pointerEvents: 'none',
        }}>
          VHERSO
        </div>

      </div>
    </>
  )
}