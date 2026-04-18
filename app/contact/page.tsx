'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ nome: '', cognome: '', email: '', problema: '' })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [msg, setMsg] = useState('')

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit(e: any) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
        setForm({ nome: '', cognome: '', email: '', problema: '' })
      } else {
        setMsg('Errore nell\'invio. Riprova.')
      }
    } catch {
      setMsg('Errore di rete. Riprova.')
    }
    setLoading(false)
  }

  return (
    <>
      <style>{`
        .contact-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(0,0,0,0.12);
          padding: 1rem 0;
          font-size: 0.85rem;
          font-family: 'CenturyGothic', sans-serif;
          color: #080808;
          outline: none;
          transition: border-color 0.2s;
          letter-spacing: 0.04em;
        }
        .contact-input::placeholder { color: rgba(0,0,0,0.25); }
        .contact-input:focus { border-bottom-color: #080808; }

        .contact-textarea {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(0,0,0,0.12);
          padding: 1rem 0;
          font-size: 0.85rem;
          font-family: 'CenturyGothic', sans-serif;
          color: #080808;
          outline: none;
          transition: border-color 0.2s;
          letter-spacing: 0.04em;
          resize: none;
          height: 120px;
        }
        .contact-textarea::placeholder { color: rgba(0,0,0,0.25); }
        .contact-textarea:focus { border-bottom-color: #080808; }

        .submit-btn {
          background: #080808;
          color: #f5f5f5;
          border: none;
          padding: 1.1rem 3rem;
          font-size: 0.65rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          font-family: 'CenturyGothic', sans-serif;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, letter-spacing 0.3s;
          align-self: flex-start;
        }
        .submit-btn:hover { background: #1a1a1a; letter-spacing: 0.3em; }
        .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .contact-right { padding: 3rem 1.5rem !important; }
          .contact-left { padding: 4rem 1.5rem 3rem !important; min-height: auto !important; }
        }
      `}</style>

      <main style={{ minHeight: '100vh', background: '#f5f5f5', paddingTop: '0px' }}>
        <div className="contact-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          minHeight: 'calc(100vh - 68px)',
        }}>

          {/* LEFT */}
          <div className="contact-left" style={{
            background: '#080808',
            padding: '6rem 5rem',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* BG TEXT */}
            <div style={{
              position: 'absolute', bottom: '-2rem', left: '-1rem',
              fontFamily: "'CenturyGothic', sans-serif",
              fontSize: 'clamp(6rem, 14vw, 14rem)',
              fontWeight: 900, color: 'rgba(255,255,255,0.03)',
              lineHeight: 1, userSelect: 'none', letterSpacing: '0.02em',
              pointerEvents: 'none',
            }}>
              TALK
            </div>

            <div>
              <p style={{
                fontFamily: "'CenturyGothic', sans-serif",
                fontSize: '0.55rem', letterSpacing: '0.28em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
                marginBottom: '2rem',
              }}>
                VHERSO — Get in touch
              </p>
              <h1 style={{
                fontFamily: "'CenturyGothic', sans-serif",
                fontSize: 'clamp(2.5rem, 4vw, 4.5rem)',
                fontWeight: 900, lineHeight: 0.92,
                color: '#f5f5f5', letterSpacing: '-0.01em',
                marginBottom: '2rem',
              }}>
                WRITE<br />TO US.
              </h1>
              <p style={{
                fontFamily: "'CenturyGothic', sans-serif",
                fontSize: '0.78rem', lineHeight: 1.9,
                color: 'rgba(255,255,255,0.35)',
                maxWidth: '280px',
              }}>
                Hai domande su ordini, spedizioni, resi o collaborazioni? Siamo qui.
              </p>
            </div>

            {/* INFO */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { label: 'Email', value: 'vhersoclohelp@gmail.com' },
                { label: 'Instagram', value: '@vhersoo' },
                { label: 'TikTok', value: '@vhersoclo' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p style={{
                    fontFamily: "'CenturyGothic', sans-serif",
                    fontSize: '0.52rem', letterSpacing: '0.22em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)',
                    marginBottom: '0.3rem',
                  }}>
                    {label}
                  </p>
                  <p style={{
                    fontFamily: "'CenturyGothic', sans-serif",
                    fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)',
                    letterSpacing: '0.04em',
                  }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="contact-right" style={{
            padding: '6rem 5rem',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            background: '#f5f5f5',
          }}>

            {submitted ? (
              <div style={{
                animation: 'fadeUp 0.6s cubic-bezier(0.25,0.46,0.45,0.94) both',
                display: 'flex', flexDirection: 'column', gap: '1.5rem',
              }}>
                <div style={{
                  width: '52px', height: '52px',
                  border: '1px solid rgba(0,0,0,0.12)',
                  borderRadius: '50%', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.2rem', color: '#080808',
                }}>
                  ✓
                </div>
                <h2 style={{
                  fontFamily: "'CenturyGothic', sans-serif",
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 900, color: '#080808',
                  lineHeight: 0.95, letterSpacing: '-0.01em',
                }}>
                  MESSAGGIO<br />INVIATO
                </h2>
                <p style={{
                  fontFamily: "'CenturyGothic', sans-serif",
                  fontSize: '0.78rem', color: 'rgba(0,0,0,0.4)',
                  lineHeight: 1.8, maxWidth: '300px',
                }}>
                  Ti risponderemo entro 24–48 ore lavorative. Grazie per averci scritto.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: "'CenturyGothic', sans-serif",
                    fontSize: '0.62rem', letterSpacing: '0.2em',
                    textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)',
                    padding: 0, textDecoration: 'underline',
                    textUnderlineOffset: '3px', alignSelf: 'flex-start',
                  }}
                >
                  Invia un altro messaggio
                </button>
              </div>
            ) : (
              <>
                <p style={{
                  fontFamily: "'CenturyGothic', sans-serif",
                  fontSize: '0.55rem', letterSpacing: '0.28em',
                  textTransform: 'uppercase', color: 'rgba(0,0,0,0.9)',
                  marginBottom: '3rem',
                }}>
                  Il tuo messaggio
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>

                  {/* NOME + COGNOME */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div>
                      <label style={{
                        fontFamily: "'CenturyGothic', sans-serif",
                        fontSize: '0.52rem', letterSpacing: '0.2em',
                        textTransform: 'uppercase', color: 'rgba(0,0,0,0.9)',
                        display: 'block', marginBottom: '0.5rem',
                      }}>Nome</label>
                      <input
                        className="contact-input"
                        placeholder="Mario"
                        value={form.nome}
                        onChange={e => set('nome', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label style={{
                        fontFamily: "'CenturyGothic', sans-serif",
                        fontSize: '0.52rem', letterSpacing: '0.2em',
                        textTransform: 'uppercase', color: 'rgba(0,0,0,0.9)',
                        display: 'block', marginBottom: '0.5rem',
                      }}>Cognome</label>
                      <input
                        className="contact-input"
                        placeholder="Rossi"
                        value={form.cognome}
                        onChange={e => set('cognome', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label style={{
                      fontFamily: "'CenturyGothic', sans-serif",
                      fontSize: '0.52rem', letterSpacing: '0.2em',
                      textTransform: 'uppercase', color: 'rgba(0,0,0,0.9)',
                      display: 'block', marginBottom: '0.5rem',
                    }}>Email</label>
                    <input
                      className="contact-input"
                      type="email"
                      placeholder="mario@email.com"
                      value={form.email}
                      onChange={e => set('email', e.target.value)}
                      required
                    />
                  </div>

                  {/* MESSAGGIO */}
                  <div>
                    <label style={{
                      fontFamily: "'CenturyGothic', sans-serif",
                      fontSize: '0.52rem', letterSpacing: '0.2em',
                      textTransform: 'uppercase', color: 'rgba(0,0,0,0.9)',
                      display: 'block', marginBottom: '0.5rem',
                    }}>Messaggio</label>
                    <textarea
                      className="contact-textarea"
                      placeholder="Descrivi il tuo problema o la tua richiesta..."
                      value={form.problema}
                      onChange={e => set('problema', e.target.value)}
                      required
                    />
                  </div>

                  {msg && (
                    <p style={{
                      fontFamily: "'CenturyGothic', sans-serif",
                      fontSize: '0.72rem', color: '#dc2626',
                      letterSpacing: '0.04em',
                    }}>
                      {msg}
                    </p>
                  )}

                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? '...' : 'INVIA MESSAGGIO →'}
                  </button>

                </form>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  )
}