'use client'

import { useState, useEffect } from 'react'

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const dismissed = sessionStorage.getItem('newsletter_dismissed')
    if (dismissed) return
    const timer = setTimeout(() => setVisible(true), 2500)
    return () => clearTimeout(timer)
  }, [])

  const close = () => {
    setClosing(true)
    setTimeout(() => {
      setVisible(false)
      setClosing(false)
      sessionStorage.setItem('newsletter_dismissed', '1')
    }, 400)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    setTimeout(close, 2000)
  }

  if (!visible) return null

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes slideDown {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to { opacity: 0; transform: translateY(40px) scale(0.97); }
        }
        .popup-overlay {
          animation: ${closing ? 'fadeOut' : 'fadeIn'} 0.4s ease forwards;
        }
        .popup-box {
          animation: ${closing ? 'slideDown' : 'slideUp'} 0.4s cubic-bezier(0.25,0.46,0.45,0.94) forwards;
        }
        .nl-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255,255,255,0.2);
          color: #fff;
          font-size: 0.82rem;
          letter-spacing: 0.06em;
          padding: 0.8rem 0;
          outline: none;
          font-family: 'DM Sans', sans-serif;
          transition: border-color 0.2s;
        }
        .nl-input::placeholder { color: rgba(255,255,255,0.25); }
        .nl-input:focus { border-bottom-color: rgba(255,255,255,0.6); }
        .nl-btn {
          width: 100%;
          background: #fff;
          color: #000;
          border: none;
          padding: 1rem;
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 500;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.2s;
          margin-top: 1.5rem;
        }
        .nl-btn:hover { background: rgba(255,255,255,0.88); }
        .close-btn {
          position: absolute;
          top: 1.2rem;
          right: 1.2rem;
          background: none;
          border: none;
          color: rgba(255,255,255,0.35);
          cursor: pointer;
          font-size: 1.1rem;
          line-height: 1;
          padding: 0.3rem;
          transition: color 0.15s;
          font-family: 'DM Sans', sans-serif;
        }
        .close-btn:hover { color: #fff; }

        @media (max-width: 480px) {
          .popup-box {
            margin: 1rem !important;
            max-width: calc(100vw - 2rem) !important;
            padding: 2rem 1.5rem !important;
          }
          .popup-left {
            display: none !important;
          }
        }
      `}</style>

      {/* OVERLAY */}
      <div
        className="popup-overlay"
        onClick={close}
        style={{
          position: 'fixed', inset: 0, zIndex: 999,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1rem',
        }}
      >
        {/* BOX */}
        <div
          className="popup-box"
          onClick={e => e.stopPropagation()}
          style={{
            position: 'relative',
            background: '#0d0d0d',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            maxWidth: '780px',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          {/* LEFT — visual */}
          <div
            className="popup-left"
            style={{
              background: '#111',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              padding: '3rem 2rem',
              borderRight: '1px solid rgba(255,255,255,0.06)',
              position: 'relative', overflow: 'hidden',
            }}
          >
            {/* BG text */}
            <div style={{
              position: 'absolute',
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '10rem', color: 'rgba(255,255,255,0.03)',
              lineHeight: 1, userSelect: 'none',
              letterSpacing: '0.05em',
            }}>
              VHS
            </div>
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <p style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '3.5rem', color: '#fff',
                lineHeight: 0.9, letterSpacing: '0.04em',
                marginBottom: '1rem',
              }}>
                JOIN<br />THE<br />CLUB
              </p>
              <p style={{
                fontSize: '0.62rem', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
              }}>
                EST. 2024
              </p>
            </div>
          </div>

          {/* RIGHT — form */}
          <div style={{ padding: '3rem 2.5rem' }}>
            <button className="close-btn" onClick={close}>✕</button>

            {!submitted ? (
              <>
                <p style={{
                  fontSize: '0.6rem', letterSpacing: '0.22em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
                  marginBottom: '1rem',
                }}>
                  VHERSO Newsletter
                </p>
                <h2 style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '2.8rem', color: '#fff',
                  lineHeight: 0.9, letterSpacing: '0.03em',
                  marginBottom: '1rem',
                }}>
                  GET EARLY<br />ACCESS
                </h2>
                <p style={{
                  fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)',
                  lineHeight: 1.7, marginBottom: '2rem',
                  letterSpacing: '0.03em',
                }}>
                  Drop alerts, exclusive offers e accesso anticipato alle nuove collezioni.
                </p>

                <form onSubmit={handleSubmit}>
                  <input
                    className="nl-input"
                    type="email"
                    placeholder="La tua email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="nl-btn">
                    SUBSCRIBE →
                  </button>
                </form>

                <p style={{
                  fontSize: '0.58rem', letterSpacing: '0.1em',
                  color: 'rgba(255,255,255,0.2)',
                  marginTop: '1rem', textAlign: 'center',
                }}>
                  No spam. Unsubscribe anytime.
                </p>

                <button
                  onClick={close}
                  style={{
                    display: 'block', margin: '0.8rem auto 0',
                    background: 'none', border: 'none',
                    fontSize: '0.62rem', letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.2)',
                    cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                    textDecoration: 'underline',
                    textUnderlineOffset: '3px',
                  }}
                >
                  No thanks
                </button>
              </>
            ) : (
              <div style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                height: '100%', textAlign: 'center', gap: '1rem',
              }}>
                <div style={{
                  width: '48px', height: '48px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '50%', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.2rem', marginBottom: '0.5rem',
                }}>
                  ✓
                </div>
                <h3 style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '2.5rem', color: '#fff',
                  letterSpacing: '0.04em', lineHeight: 1,
                }}>
                  YOU'RE IN
                </h3>
                <p style={{
                  fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)',
                  letterSpacing: '0.06em', lineHeight: 1.6,
                }}>
                  Welcome to the club.<br />Check your inbox.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}