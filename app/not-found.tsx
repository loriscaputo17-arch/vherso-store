import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
      `}</style>
      <div style={{
        background: '#f5f5f5', minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        fontFamily: "'CenturyGothic',sans-serif",
        textAlign: 'center', padding: '2rem',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* BG TEXT */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          fontSize: 'clamp(120px,25vw,300px)',
          color: 'rgba(0,0,0,0.03)', userSelect: 'none',
          fontWeight: 900, letterSpacing: '-0.02em',
          whiteSpace: 'nowrap', pointerEvents: 'none',
        }}>
          404
        </div>

        <div style={{ position: 'relative', zIndex: 2 }}>
          <p style={{ fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.25)', marginBottom: '1.5rem' }}>
            VHERSO — Pagina non trovata
          </p>

          <h1 style={{
            fontSize: 'clamp(4rem,10vw,9rem)', fontWeight: 900,
            lineHeight: 0.88, letterSpacing: '-0.03em',
            color: '#080808', marginBottom: '0.5rem',
            animation: 'float 3s ease-in-out infinite',
          }}>
            LOST<br />
            <span style={{ fontWeight: 300, color: 'rgba(0,0,0,0.2)' }}>PAGE</span>
          </h1>

          <p style={{
            fontSize: '0.78rem', color: 'rgba(0,0,0,0.35)',
            lineHeight: 1.8, maxWidth: '380px', margin: '2rem auto',
            letterSpacing: '0.04em',
          }}>
            La pagina che cerchi non esiste o è stata spostata.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{
              background: '#080808', color: '#f5f5f5',
              padding: '1rem 2.5rem', fontSize: '0.65rem',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              display: 'inline-block', textDecoration: 'none',
            }}>
              Torna alla Home →
            </Link>
            <Link href="/shop" style={{
              background: 'none', color: '#080808',
              border: '1px solid rgba(0,0,0,0.15)',
              padding: '1rem 2.5rem', fontSize: '0.65rem',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              display: 'inline-block', textDecoration: 'none',
            }}>
              Shop →
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}