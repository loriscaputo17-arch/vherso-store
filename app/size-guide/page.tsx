import Link from 'next/link'
import { getT } from '@/lib/i18n.server'

const sizeData = (t: (k: string) => string) => ({
  tshirts: {
    title: t('tshirtsTitle'),
    headers: ['Size', 'Chest (cm)', 'Length (cm)', 'Shoulder (cm)'],
    rows: [
      ['XS', '86–91', '68', '40'],
      ['S', '91–96', '70', '42'],
      ['M', '96–101', '72', '44'],
      ['L', '101–106', '74', '46'],
      ['XL', '106–111', '76', '48'],
      ['XXL', '111–116', '78', '50'],
    ],
  },
  hoodies: {
    title: t('hoodiesTitle'),
    headers: ['Size', 'Chest (cm)', 'Length (cm)', 'Sleeve (cm)'],
    rows: [
      ['XS', '88–93', '64', '60'],
      ['S', '93–98', '66', '62'],
      ['M', '98–103', '68', '64'],
      ['L', '103–108', '70', '66'],
      ['XL', '108–113', '72', '68'],
      ['XXL', '113–118', '74', '70'],
    ],
  },
  pants: {
    title: t('pantsTitle'),
    headers: ['Size', 'Waist (cm)', 'Hip (cm)', 'Inseam (cm)'],
    rows: [
      ['XS', '68–72', '88–92', '78'],
      ['S', '72–76', '92–96', '79'],
      ['M', '76–80', '96–100', '80'],
      ['L', '80–84', '100–104', '81'],
      ['XL', '84–88', '104–108', '82'],
      ['XXL', '88–92', '108–112', '83'],
    ],
  },
})

export default async function SizeGuidePage() {
  const t = await getT('sizeGuide')
  const tables = sizeData(t)

  return (
    <>
      <style>{`
        .sg-table { width:100%; border-collapse:collapse; font-family:'CenturyGothic',sans-serif; }
        .sg-table th { font-size:0.58rem; letter-spacing:0.2em; text-transform:uppercase; color:rgba(0,0,0,0.35); padding:0.8rem 1rem; border-bottom:1px solid rgba(0,0,0,0.08); text-align:left; font-weight:400; }
        .sg-table td { font-size:0.78rem; padding:0.9rem 1rem; border-bottom:1px solid rgba(0,0,0,0.04); color:#080808; letter-spacing:0.04em; }
        .sg-table tr:last-child td { border-bottom:none; }
        .sg-table tr:hover td { background:rgba(0,0,0,0.02); }
        .sg-table td:first-child { font-weight:700; font-size:0.72rem; letter-spacing:0.12em; }
        @media (max-width:768px) {
          .sg-grid { grid-template-columns:1fr !important; }
          .sg-hero { padding:6rem 1.5rem 3rem !important; }
          .sg-content { padding:3rem 1.5rem !important; }
        }
      `}</style>

      <div style={{ background: '#f5f5f5', minHeight: '100vh' }}>

        {/* HEADER */}
        <div className="sg-hero" style={{
          padding: '8rem 2rem 3rem',
          background: '#efefef',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            fontFamily: "'CenturyGothic',sans-serif",
            fontSize: 'clamp(60px,14vw,180px)',
            color: 'rgba(0,0,0,0.03)', userSelect: 'none',
            whiteSpace: 'nowrap', letterSpacing: '0.05em',
            pointerEvents: 'none',
          }}>
            SIZE GUIDE
          </div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <p style={{ fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)', marginBottom: '0.8rem', fontFamily: "'CenturyGothic',sans-serif" }}>
              {t('tag')}
            </p>
            <h1 style={{
              fontFamily: "'CenturyGothic',sans-serif",
              fontSize: 'clamp(3rem, 7vw, 7rem)',
              fontWeight: 900, lineHeight: 0.9,
              letterSpacing: '-0.02em', color: '#080808',
            }}>
              {t('title')}<br />
              <span style={{ fontWeight: 300, color: 'rgba(0,0,0,0.35)' }}>{t('titleSub')}</span>
            </h1>
          </div>
        </div>

        <div className="sg-content" style={{ padding: '4rem 2rem', maxWidth: '900px', margin: '0 auto' }}>

          {/* HOW TO MEASURE */}
          <div style={{ marginBottom: '4rem', padding: '2rem', background: '#080808', color: '#f5f5f5' }}>
            <p style={{ fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '1rem', fontFamily: "'CenturyGothic',sans-serif" }}>
              {t('measureTitle')}
            </p>
            <div className="sg-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem' }}>
              {[
                { label: t('chest'), desc: t('chestDesc') },
                { label: t('waist'), desc: t('waistDesc') },
                { label: t('hips'), desc: t('hipsDesc') },
              ].map(({ label, desc }) => (
                <div key={label}>
                  <p style={{ fontFamily: "'CenturyGothic',sans-serif", fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem', color: '#fff' }}>
                    {label}
                  </p>
                  <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, fontFamily: "'CenturyGothic',sans-serif" }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* TABLES */}
          {Object.values(tables).map(({ title, headers, rows }) => (
            <div key={title} style={{ marginBottom: '3rem' }}>
              <h2 style={{
                fontFamily: "'CenturyGothic',sans-serif",
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                fontWeight: 700, color: '#080808',
                marginBottom: '1.5rem', letterSpacing: '-0.01em',
              }}>
                {title}
              </h2>
              <div style={{ border: '1px solid rgba(0,0,0,0.06)', background: '#fff', overflow: 'hidden' }}>
                <table className="sg-table">
                  <thead>
                    <tr style={{ background: 'rgba(0,0,0,0.02)' }}>
                      {headers.map(h => <th key={h}>{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map(row => (
                      <tr key={row[0]}>
                        {row.map((cell, i) => <td key={i}>{cell}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          {/* NOTE */}
          <div style={{ padding: '1.5rem', border: '1px solid rgba(0,0,0,0.06)', background: '#fff', marginBottom: '3rem' }}>
            <p style={{ fontSize: '0.65rem', color: 'rgba(0,0,0,0.4)', lineHeight: 1.8, fontFamily: "'CenturyGothic',sans-serif", letterSpacing: '0.04em' }}>
              {t('note')}
            </p>
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/shop" style={{
              background: '#080808', color: '#f5f5f5',
              padding: '1rem 2.5rem', fontSize: '0.65rem',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              display: 'inline-block', fontFamily: "'CenturyGothic',sans-serif",
            }}>
              {t('shopNow')}
            </Link>
            <Link href="/contact" style={{
              background: 'none', color: '#080808',
              border: '1px solid rgba(0,0,0,0.15)',
              padding: '1rem 2.5rem', fontSize: '0.65rem',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              display: 'inline-block', fontFamily: "'CenturyGothic',sans-serif",
            }}>
              {t('contact')}
            </Link>
          </div>

        </div>
      </div>
    </>
  )
}