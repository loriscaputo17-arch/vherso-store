import Link from 'next/link'

export const metadata = {
  title: 'Cookie Policy — VHERSO',
}

export default function CookiesPage() {
  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ padding: '8rem 2rem 3rem', background: '#efefef', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <p style={{ fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)', marginBottom: '0.8rem', fontFamily: "'CenturyGothic',sans-serif" }}>
          VHERSO — Legal
        </p>
        <h1 style={{ fontFamily: "'CenturyGothic',sans-serif", fontSize: 'clamp(2.5rem,6vw,5rem)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.02em', color: '#080808' }}>
          COOKIE<br /><span style={{ fontWeight: 300, color: 'rgba(0,0,0,0.35)' }}>POLICY</span>
        </h1>
        <p style={{ fontSize: '0.62rem', color: 'rgba(0,0,0,0.3)', marginTop: '1rem', fontFamily: "'CenturyGothic',sans-serif" }}>
          Ultimo aggiornamento: Maggio 2026
        </p>
      </div>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '4rem 2rem 6rem', fontFamily: "'CenturyGothic',sans-serif" }}>
        <p style={{ fontSize: '0.85rem', lineHeight: 1.9, color: 'rgba(0,0,0,0.55)', marginBottom: '1rem' }}>
          Questo sito utilizza cookie per garantire il corretto funzionamento e migliorare la tua esperienza di navigazione.
        </p>

        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#080808', margin: '2.5rem 0 0.8rem' }}>Cosa sono i cookie</h2>
        <p style={{ fontSize: '0.85rem', lineHeight: 1.9, color: 'rgba(0,0,0,0.55)', marginBottom: '1rem' }}>
          I cookie sono piccoli file di testo salvati sul tuo dispositivo quando visiti un sito web. Permettono al sito di ricordare le tue preferenze e migliorare la tua esperienza.
        </p>

        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#080808', margin: '2.5rem 0 0.8rem' }}>Cookie che utilizziamo</h2>
        <p style={{ fontSize: '0.85rem', lineHeight: 1.9, color: 'rgba(0,0,0,0.55)', marginBottom: '1rem' }}>
          <strong style={{ color: '#080808' }}>Cookie tecnici (necessari)</strong> — Essenziali per il funzionamento del sito: carrello, sessione, preferenze lingua. Non richiedono consenso.
        </p>
        <p style={{ fontSize: '0.85rem', lineHeight: 1.9, color: 'rgba(0,0,0,0.55)', marginBottom: '1rem' }}>
          <strong style={{ color: '#080808' }}>Google Analytics</strong> — Raccogliamo dati anonimi sul traffico (pagine visitate, durata sessione, provenienza). Puoi disabilitarlo dalle impostazioni del browser.
        </p>
        <p style={{ fontSize: '0.85rem', lineHeight: 1.9, color: 'rgba(0,0,0,0.55)', marginBottom: '1rem' }}>
          <strong style={{ color: '#080808' }}>Meta Pixel (Facebook)</strong> — Traccia le conversioni delle nostre campagne pubblicitarie. Puoi gestirlo dalle impostazioni di Facebook o tramite il banner cookie.
        </p>

        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#080808', margin: '2.5rem 0 0.8rem' }}>Come gestire i cookie</h2>
        <p style={{ fontSize: '0.85rem', lineHeight: 1.9, color: 'rgba(0,0,0,0.55)', marginBottom: '1rem' }}>
          Puoi accettare o rifiutare i cookie tramite il banner che appare alla prima visita. Puoi anche gestirli dalle impostazioni del tuo browser o visitare <a href="https://www.youronlinechoices.eu" target="_blank" rel="noopener noreferrer" style={{ color: '#080808' }}>youronlinechoices.eu</a>.
        </p>

        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#080808', margin: '2.5rem 0 0.8rem' }}>Contatti</h2>
        <p style={{ fontSize: '0.85rem', lineHeight: 1.9, color: 'rgba(0,0,0,0.55)', marginBottom: '1rem' }}>
          Per qualsiasi domanda: <a href="mailto:vhersoclohelp@gmail.com" style={{ color: '#080808' }}>vhersoclohelp@gmail.com</a>
        </p>

        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/privacy" style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', textDecoration: 'none' }}>Privacy Policy →</Link>
          <Link href="/terms" style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', textDecoration: 'none' }}>Terms →</Link>
        </div>
      </div>
    </div>
  )
}