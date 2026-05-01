import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy — VHERSO',
  description: 'Privacy policy di VHERSO. Come raccogliamo e utilizziamo i tuoi dati.',
}

export default function PrivacyPage() {
  return (
    <>
      <style>{`
        .legal-content h2 { font-family:'CenturyGothic',sans-serif; font-size:1.2rem; font-weight:700; color:#080808; margin:2.5rem 0 0.8rem; letter-spacing:0.04em; }
        .legal-content p { font-size:0.85rem; line-height:1.9; color:rgba(0,0,0,0.55); margin:0 0 1rem; }
        .legal-content ul { font-size:0.85rem; line-height:1.9; color:rgba(0,0,0,0.55); padding-left:1.5rem; margin:0 0 1rem; }
        .legal-content li { margin-bottom:0.4rem; }
        .legal-content a { color:#080808; }
      `}</style>

      <div style={{ background: '#f5f5f5', minHeight: '100vh' }}>

        {/* HEADER */}
        <div style={{
          padding: '8rem 2rem 3rem',
          background: '#efefef',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            fontFamily: "'CenturyGothic',sans-serif",
            fontSize: 'clamp(60px,12vw,160px)',
            color: 'rgba(0,0,0,0.03)', userSelect: 'none',
            whiteSpace: 'nowrap', pointerEvents: 'none',
          }}>
            PRIVACY
          </div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <p style={{ fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)', marginBottom: '0.8rem', fontFamily: "'CenturyGothic',sans-serif" }}>
              VHERSO — Legal
            </p>
            <h1 style={{ fontFamily: "'CenturyGothic',sans-serif", fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.02em', color: '#080808' }}>
              PRIVACY<br />
              <span style={{ fontWeight: 300, color: 'rgba(0,0,0,0.35)' }}>POLICY</span>
            </h1>
            <p style={{ fontSize: '0.62rem', letterSpacing: '0.1em', color: 'rgba(0,0,0,0.3)', marginTop: '1rem', fontFamily: "'CenturyGothic',sans-serif" }}>
              Ultimo aggiornamento: Maggio 2026
            </p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="legal-content" style={{ maxWidth: '720px', margin: '0 auto', padding: '4rem 2rem 6rem' }}>

          <p>La presente Privacy Policy descrive come VHERSO ("noi", "nostro") raccoglie, utilizza e protegge le informazioni personali degli utenti che visitano il sito <strong>vhersoclo.com</strong>.</p>

          <h2>1. Titolare del trattamento</h2>
          <p>VHERSO<br />
          Milan — Italy<br />
          P.IVA 04057240790<br />
          Email: <a href="mailto:vhersoclohelp@gmail.com">vhersoclohelp@gmail.com</a></p>

          <h2>2. Dati raccolti</h2>
          <p>Raccogliamo i seguenti tipi di dati:</p>
          <ul>
            <li><strong>Dati di navigazione:</strong> indirizzo IP, browser, pagine visitate, durata della sessione.</li>
            <li><strong>Dati forniti volontariamente:</strong> nome, email, indirizzo di spedizione al momento dell'acquisto o dell'iscrizione alla newsletter.</li>
            <li><strong>Dati di pagamento:</strong> gestiti in modo sicuro da Shopify Payments. Non conserviamo i dati della carta di credito.</li>
            <li><strong>Cookie:</strong> utilizziamo cookie tecnici e analitici (Google Analytics). Vedi la nostra <Link href="/cookies">Cookie Policy</Link>.</li>
          </ul>

          <h2>3. Finalità del trattamento</h2>
          <p>Utilizziamo i tuoi dati per:</p>
          <ul>
            <li>Elaborare e gestire gli ordini</li>
            <li>Inviare comunicazioni relative all'ordine (conferma, spedizione)</li>
            <li>Inviare newsletter e offerte promozionali (solo con consenso)</li>
            <li>Migliorare l'esperienza utente tramite analytics</li>
            <li>Adempiere agli obblighi legali e fiscali</li>
          </ul>

          <h2>4. Base giuridica</h2>
          <p>Il trattamento dei dati si basa su:</p>
          <ul>
            <li>Esecuzione del contratto (gestione ordini)</li>
            <li>Consenso dell'utente (newsletter, cookie analytics)</li>
            <li>Legittimo interesse (sicurezza, prevenzione frodi)</li>
            <li>Obbligo legale (fatturazione, contabilità)</li>
          </ul>

          <h2>5. Conservazione dei dati</h2>
          <p>I dati relativi agli ordini vengono conservati per 10 anni come richiesto dalla normativa fiscale italiana. I dati per la newsletter vengono conservati fino alla cancellazione dell'iscrizione.</p>

          <h2>6. Condivisione con terze parti</h2>
          <p>Non vendiamo i tuoi dati. Li condividiamo solo con:</p>
          <ul>
            <li><strong>Shopify Inc.</strong> — gestione e-commerce e pagamenti</li>
            <li><strong>Google Analytics</strong> — analisi del traffico (dati anonimizzati)</li>
            <li><strong>Corrieri</strong> — per la consegna degli ordini</li>
          </ul>

          <h2>7. I tuoi diritti</h2>
          <p>Ai sensi del GDPR hai diritto a:</p>
          <ul>
            <li>Accedere ai tuoi dati personali</li>
            <li>Richiedere la rettifica o cancellazione</li>
            <li>Opporti al trattamento</li>
            <li>Richiedere la portabilità dei dati</li>
            <li>Revocare il consenso in qualsiasi momento</li>
          </ul>
          <p>Per esercitare i tuoi diritti contattaci a <a href="mailto:vhersoclohelp@gmail.com">vhersoclohelp@gmail.com</a>.</p>

          <h2>8. Cookie</h2>
          <p>Per informazioni dettagliate sull'uso dei cookie visita la nostra <Link href="/cookies" style={{ color: '#080808' }}>Cookie Policy</Link>.</p>

          <h2>9. Modifiche</h2>
          <p>Ci riserviamo il diritto di aggiornare questa Privacy Policy. Le modifiche saranno pubblicate su questa pagina con la data di aggiornamento.</p>

          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/terms" style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', textDecoration: 'none' }}>
              Terms & Conditions →
            </Link>
            <Link href="/cookies" style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', textDecoration: 'none' }}>
              Cookie Policy →
            </Link>
            <Link href="/contact" style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', textDecoration: 'none' }}>
              Contattaci →
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}