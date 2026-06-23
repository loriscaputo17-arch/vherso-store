'use client'

import { useCart } from '@/context/CartContext'
import { useState, useEffect, useMemo, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { getCurrencySymbol } from '@/lib/currency'

type TFunc = (key: string) => string

// 1 random bracelet (accessory upsell) + 2 random tees from the Summer Collection,
// so the upsell shows different models / colours each time the drawer opens.
const BRACELET_HANDLES = [
  'vherso-black-bracelet',
  'vherso-grey-bracelet',
  'vherso-pink-bracelet',
  'vherso-wine-red-bracelet',
  'vherso-bracelets', // light blue
]

const SUMMER_COLLECTION = 'summer-collection'

interface Variant {
  id: string
  title: string
  availableForSale: boolean
  price: { amount: string; currencyCode: string }
}

interface RecProduct {
  id: string
  handle: string
  title: string
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } }
  images: { edges: { node: { url: string; altText?: string } }[] }
  variants: { edges: { node: Variant }[] }
}

// module-level cache so we don't refetch the pool every time the drawer opens
let cachedPool: { bracelets: RecProduct[]; tees: RecProduct[] } | null = null

// Fisher–Yates pick of n random items
function sample<T>(arr: T[], n: number): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a.slice(0, n)
}

export default function CartRecommendations({ t }: { t: TFunc }) {
  const { cart, isOpen, closeCart } = useCart()
  const pathname = usePathname()
  const [pool, setPool] = useState(cachedPool)
  // bumped on every drawer-open to reshuffle the picks
  const [seed, setSeed] = useState(0)

  // fetch the pool once (prices come localised from the API)
  useEffect(() => {
    if (cachedPool) return
    let active = true
    Promise.all([
      ...BRACELET_HANDLES.map(h =>
        fetch(`/api/product/${h}`).then(r => r.json()).catch(() => null)
      ),
      fetch(`/api/collection/${SUMMER_COLLECTION}`).then(r => r.json()).catch(() => null),
    ]).then(results => {
      const collection = results.pop()
      const bracelets = (results.filter(Boolean) as RecProduct[])
      const tees = ((collection?.products?.edges ?? []).map((e: { node: RecProduct }) => e.node))
        // keep only products with at least one buyable variant
        .filter((p: RecProduct) => p.variants.edges.some(({ node }) => node.availableForSale))
      cachedPool = { bracelets, tees }
      if (active) setPool(cachedPool)
    })
    return () => { active = false }
  }, [])

  // reshuffle each time the drawer opens
  const prevOpen = useRef(isOpen)
  useEffect(() => {
    if (isOpen && !prevOpen.current) setSeed(s => s + 1)
    prevOpen.current = isOpen
  }, [isOpen])

  // titles already in the bag — never recommend those
  const inCartKey = (cart?.lines.edges.map(({ node }) => node.merchandise.product.title) ?? []).join('|')
  // product currently being viewed (/products/[handle]) — don't recommend it either
  const currentHandle = pathname?.match(/\/products\/([^/?#]+)/)?.[1] ?? ''

  // 1 random bracelet + 2 random tees, excluding bag items and the current product.
  // Recomputed on open (seed) / bag change / navigation, so it always shows 3 fresh picks.
  const visible = useMemo<RecProduct[]>(() => {
    if (!pool) return []
    const excludeTitles = new Set(inCartKey ? inCartKey.split('|') : [])
    const ok = (p: RecProduct) => !excludeTitles.has(p.title) && p.handle !== currentHandle
    const bracelet = sample(pool.bracelets.filter(ok), 1)
    const tees = sample(pool.tees.filter(ok), 2)
    return [...bracelet, ...tees]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pool, seed, inCartKey, currentHandle])

  if (visible.length === 0) return null

  return (
    <div style={{ padding: '1.75rem 0 0.5rem' }}>
      <p style={{
        fontFamily: "'CenturyGothic', sans-serif",
        fontSize: '0.62rem', letterSpacing: '0.22em',
        textTransform: 'uppercase', color: 'rgba(0,0,0,0.45)',
        marginBottom: '1.1rem',
      }}>
        {t('recommendTitle')}
      </p>

      <div className="rec-scroll" style={{
        display: 'flex', gap: '0.85rem',
        overflowX: 'auto', paddingBottom: '0.5rem',
        margin: '0 -0.25rem', scrollSnapType: 'x mandatory',
      }}>
        {visible.map(p => {
          const symbol = getCurrencySymbol(p.priceRange.minVariantPrice.currencyCode)
          const price = parseFloat(p.priceRange.minVariantPrice.amount).toFixed(2)
          const img = p.images.edges[0]?.node.url

          return (
            <div key={p.id} className="rec-card" style={{
              flex: '0 0 auto', width: '130px',
              scrollSnapAlign: 'start',
            }}>
              <Link href={`/products/${p.handle}`} onClick={closeCart} style={{ textDecoration: 'none' }}>
                <div style={{
                  width: '130px', height: '165px',
                  background: '#e8e8e8', overflow: 'hidden', marginBottom: '0.55rem',
                }}>
                  {img && (
                    <img src={img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
                </div>

                <p style={{
                  color: '#080808', fontSize: '0.66rem', letterSpacing: '0.04em',
                  marginBottom: '0.2rem', overflow: 'hidden',
                  textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {p.title}
                </p>
                <p style={{
                  color: '#080808', fontSize: '0.66rem', letterSpacing: '0.06em',
                  marginBottom: '0.55rem',
                }}>
                  {symbol}{price}
                </p>
              </Link>

              <Link
                href={`/products/${p.handle}`}
                onClick={closeCart}
                className="rec-add-btn"
                style={{
                  display: 'block', textAlign: 'center', textDecoration: 'none',
                  background: 'none', border: '1px solid rgba(0,0,0,0.15)',
                  color: '#080808', padding: '0.5rem 0',
                  fontSize: '0.55rem', letterSpacing: '0.16em', textTransform: 'uppercase',
                  cursor: 'pointer',
                  fontFamily: "'CenturyGothic', sans-serif", transition: 'all 0.2s',
                }}
              >
                {t('select')}
              </Link>
            </div>
          )
        })}
      </div>

      <style>{`
        .rec-add-btn:hover { background: #080808; color: #f5f5f5; border-color: #080808; }
        .rec-scroll::-webkit-scrollbar { height: 3px; }
        .rec-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); }
        .rec-scroll::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </div>
  )
}
