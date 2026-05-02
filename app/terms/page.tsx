import Link from 'next/link'

export const metadata = {
  title: 'Terms & Conditions — VHERSO',
  description: 'Termini e condizioni di vendita di VHERSO.',
}

export default function TermsPage() {
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
            TERMS
          </div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <p style={{ fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)', marginBottom: '0.8rem', fontFamily: "'CenturyGothic',sans-serif" }}>
              VHERSO — Legal
            </p>
            <h1 style={{ fontFamily: "'CenturyGothic',sans-serif", fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.02em', color: '#080808' }}>
              TERMS &<br />
              <span style={{ fontWeight: 300, color: 'rgba(0,0,0,0.35)' }}>CONDITIONS</span>
            </h1>
            <p style={{ fontSize: '0.62rem', letterSpacing: '0.1em', color: 'rgba(0,0,0,0.3)', marginTop: '1rem', fontFamily: "'CenturyGothic',sans-serif" }}>
              Ultimo aggiornamento: Maggio 2026
            </p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="legal-content" style={{ maxWidth: '720px', margin: '0 auto', padding: '4rem 2rem 6rem' }}>

          <p>I presenti Termini e Condizioni regolano l'utilizzo del sito <strong>vhersoclo.com</strong> e l'acquisto di prodotti VHERSO. Utilizzando il sito accetti integralmente questi termini.</p>

          <h2>1. Informazioni sul venditore</h2>
          <p>VHERSO<br />
          Milan — Italy<br />
          P.IVA 04057240790<br />
          Email: <a href="mailto:vhersoclohelp@gmail.com">vhersoclohelp@gmail.com</a></p>

          <h2>2. Prodotti e prezzi</h2>
          <p>Tutti i prezzi sono espressi in Euro (€) e includono l'IVA applicabile. Ci riserviamo il diritto di modificare i prezzi in qualsiasi momento. Il prezzo applicato all'ordine è quello vigente al momento della conferma dell'acquisto.</p>
          <p>Le immagini dei prodotti sono indicative. Potrebbero esserci lievi variazioni di colore dovute alle impostazioni del monitor.</p>

          <h2>3. Ordini e pagamenti</h2>
          <p>Gli ordini vengono accettati tramite il sito. Il pagamento avviene in modo sicuro tramite Shopify Payments. Accettiamo:</p>
          <ul>
            <li>Carte di credito e debito (Visa, Mastercard, Amex)</li>
            <li>PayPal</li>
            <li>Shop Pay</li>
          </ul>
          <p>La conferma d'ordine viene inviata via email entro pochi minuti dall'acquisto.</p>

          <h2>4. Spedizioni</h2>
          <p>Spediamo in tutto il mondo. I tempi di consegna sono:</p>
          <ul>
            <li><strong>Italia:</strong> 2–4 giorni lavorativi</li>
            <li><strong>Europa:</strong> 3–7 giorni lavorativi</li>
            <li><strong>Resto del mondo:</strong> 7–14 giorni lavorativi</li>
          </ul>
          <p>La spedizione è gratuita. Per ordini inferiori verrà calcolata al checkout in base alla destinazione.</p>

          <h2>5. Resi e rimborsi</h2>
          <p>Accettiamo resi entro <strong>14 giorni</strong> dalla ricezione dell'ordine. Il prodotto deve essere:</p>
          <ul>
            <li>Non indossato e nelle condizioni originali</li>
            <li>Con tutti i tag attaccati</li>
            <li>Nell'imballaggio originale</li>
          </ul>
          <p>Per avviare un reso contatta <a href="mailto:vhersoclohelp@gmail.com">vhersoclohelp@gmail.com</a> con il numero d'ordine. Il rimborso verrà processato entro 5–10 giorni lavorativi dalla ricezione del reso.</p>
          <p>Le spese di reso sono a carico del cliente, salvo in caso di prodotto difettoso o errato.</p>

          <h2>6. Prodotti difettosi</h2>
          <p>In caso di prodotto difettoso o errato, contattaci entro 48 ore dalla ricezione con foto del difetto. Provvederemo alla sostituzione o al rimborso completo senza spese aggiuntive.</p>

          <h2>7. Proprietà intellettuale</h2>
          <p>Tutti i contenuti del sito (loghi, immagini, testi, design) sono di proprietà esclusiva di VHERSO e protetti da copyright. È vietata la riproduzione senza autorizzazione scritta.</p>

          <h2>8. Limitazione di responsabilità</h2>
          <p>VHERSO non è responsabile per ritardi dovuti a cause di forza maggiore, problemi dei corrieri o eventi al di fuori del nostro controllo.</p>

          <h2>9. Legge applicabile</h2>
          <p>I presenti Termini sono regolati dalla legge italiana. Per qualsiasi controversia è competente il Tribunale di Milano.</p>

          <h2>10. Contatti</h2>
          <p>Per qualsiasi domanda: <a href="mailto:vhersoclohelp@gmail.com">vhersoclohelp@gmail.com</a></p>

          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/privacy" style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', textDecoration: 'none' }}>
              Privacy Policy →
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