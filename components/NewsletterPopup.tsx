'use client'

import { useState, useEffect } from 'react'

type TFunc = (key: string) => string

function useTranslations(namespace: string): TFunc {
  const [t, setT] = useState<TFunc>(() => (k: string) => k)
  useEffect(() => {
    const country = document.cookie.split('; ').find(r => r.startsWith('x-country='))?.split('=')[1] ?? 'IT'
    const locale = ['US', 'GB'].includes(country) ? 'en' : 'it'
    import(`../messages/${locale}.json`).then(m => {
      const ns = m.default?.[namespace] ?? {}
      setT(() => (key: string) => ns[key] ?? key)
    })
  }, [namespace])
  return t
}

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const t = useTranslations('newsletter')

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
        @keyframes nlFadeIn { from{opacity:0} to{opacity:1} }
        @keyframes nlFadeOut { from{opacity:1} to{opacity:0} }
        @keyframes nlSlideUp { from{opacity:0;transform:translateY(32px) scale(0.98)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes nlSlideDown { from{opacity:1;transform:translateY(0) scale(1)} to{opacity:0;transform:translateY(32px) scale(0.98)} }
        .nl-overlay { animation: ${closing ? 'nlFadeOut' : 'nlFadeIn'} 0.4s ease forwards; }
        .nl-box { animation: ${closing ? 'nlSlideDown' : 'nlSlideUp'} 0.4s cubic-bezier(0.25,0.46,0.45,0.94) forwards; }
        .nl-input { width:100%; background:transparent; border:none; border-bottom:1px solid rgba(255,255,255,0.15); color:#fff; font-size:0.82rem; letter-spacing:0.06em; padding:0.9rem 0; outline:none; font-family:'CenturyGothic',sans-serif; transition:border-color 0.2s; }
        .nl-input::placeholder { color:rgba(255,255,255,0.2); }
        .nl-input:focus { border-bottom-color:rgba(255,255,255,0.5); }
        .nl-submit { width:100%; background:#f5f5f5; color:#080808; border:none; padding:1rem; font-size:0.65rem; letter-spacing:0.2em; text-transform:uppercase; font-weight:700; cursor:pointer; font-family:'CenturyGothic',sans-serif; transition:background 0.2s, letter-spacing 0.3s; margin-top:1.2rem; }
        .nl-submit:hover { background:#fff; letter-spacing:0.26em; }
        .nl-close { position:absolute; top:1rem; right:1rem; background:none; border:none; color:rgba(255,255,255,0.3); cursor:pointer; font-size:0.9rem; width:28px; height:28px; display:flex; align-items:center; justify-content:center; transition:color 0.15s; font-family:'CenturyGothic',sans-serif; }
        .nl-close:hover { color:#fff; }
        .nl-grid { display:grid; grid-template-columns:1fr 1fr; }
        .nl-left { background:#111; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:3rem 2rem; border-right:1px solid rgba(255,255,255,0.06); position:relative; overflow:hidden; }
        .nl-right { padding:2.5rem 2rem; position:relative; }
        @media (max-width:600px) {
          .nl-grid { grid-template-columns:1fr; }
          .nl-left { display:none; }
          .nl-right { padding:2.5rem 1.5rem 2rem; }
          .nl-box { margin:0!important; max-width:100%!important; border-radius:0!important; border-left:none!important; border-right:none!important; }
          .nl-overlay { align-items:flex-end!important; padding:0!important; }
        }
      `}</style>

      <div className="nl-overlay" onClick={close} style={{ position:'fixed', inset:0, zIndex:999, background:'rgba(0,0,0,0.65)', backdropFilter:'blur(4px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }}>
        <div className="nl-box" onClick={e => e.stopPropagation()} style={{ position:'relative', background:'#0d0d0d', border:'1px solid rgba(255,255,255,0.08)', maxWidth:'760px', width:'100%', overflow:'hidden' }}>
          <div className="nl-grid">

            {/* LEFT */}
            <div className="nl-left">
              <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'CenturyGothic',sans-serif", fontSize:'9rem', color:'rgba(255,255,255,0.03)', fontWeight:900, userSelect:'none', letterSpacing:'0.05em' }}>V</div>
              <div style={{ position:'relative', zIndex:1, textAlign:'center' }}>
                <img src="/logo.png" alt="VHERSO" style={{ height:'40px', width:'auto', filter:'invert(1)', opacity:0.7, margin:'0 auto 1.5rem' }} />
                <p style={{ fontFamily:"'CenturyGothic',sans-serif", fontSize:'2.8rem', fontWeight:900, color:'#fff', lineHeight:0.9, letterSpacing:'-0.01em', marginBottom:'1rem' }}>
                  {t('leftTitle')}
                </p>
                <p style={{ fontSize:'0.58rem', letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(255,255,255,0.25)' }}>
                  {t('leftSub')}
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="nl-right">
              <button className="nl-close" onClick={close}>✕</button>

              {!submitted ? (
                <>
                  <p style={{ fontSize:'0.55rem', letterSpacing:'0.25em', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:'0.8rem', marginTop:'0.5rem' }}>
                    {t('tag')}
                  </p>
                  <h2 style={{ fontFamily:"'CenturyGothic',sans-serif", fontSize:'clamp(1.8rem, 5vw, 2.6rem)', fontWeight:900, color:'#fff', lineHeight:0.92, letterSpacing:'-0.01em', marginBottom:'1rem' }}>
                    {t('title')}
                  </h2>
                  <p style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.3)', lineHeight:1.75, marginBottom:'1.8rem', letterSpacing:'0.02em', fontFamily:"'CenturyGothic',sans-serif" }}>
                    {t('description')}
                  </p>

                  <form onSubmit={handleSubmit}>
                    <input className="nl-input" type="email" placeholder={t('emailPlaceholder')} value={email} onChange={e => setEmail(e.target.value)} required />
                    <button type="submit" className="nl-submit">{t('subscribe')} →</button>
                  </form>

                  <p style={{ fontSize:'0.55rem', letterSpacing:'0.1em', color:'rgba(255,255,255,0.15)', marginTop:'1rem', textAlign:'center', fontFamily:"'CenturyGothic',sans-serif" }}>
                    {t('noSpam')}
                  </p>
                  <button onClick={close} style={{ display:'block', margin:'0.6rem auto 0', background:'none', border:'none', fontSize:'0.58rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.15)', cursor:'pointer', fontFamily:"'CenturyGothic',sans-serif", textDecoration:'underline', textUnderlineOffset:'3px' }}>
                    {t('noThanks')}
                  </button>
                </>
              ) : (
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'260px', textAlign:'center', gap:'1rem' }}>
                  <div style={{ width:'48px', height:'48px', border:'1px solid rgba(255,255,255,0.2)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.1rem', color:'#fff' }}>✓</div>
                  <h3 style={{ fontFamily:"'CenturyGothic',sans-serif", fontSize:'2rem', fontWeight:900, color:'#fff', letterSpacing:'-0.01em', lineHeight:1 }}>
                    {t('successTitle')}
                  </h3>
                  <p style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.3)', letterSpacing:'0.04em', lineHeight:1.7, fontFamily:"'CenturyGothic',sans-serif" }}>
                    {t('successText')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}