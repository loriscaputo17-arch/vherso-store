'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { shopifyFetch } from '@/lib/shopify'
import { SEARCH_PRODUCTS } from '@/lib/queries'

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

interface Product {
  id: string
  title: string
  handle: string
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } }
  images: { edges: { node: { url: string; altText: string | null } }[] }
}

export default function SearchOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const t = useTranslations('search')

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 50)
    else { setQuery(''); setResults([]); setLoading(false) }
  }, [isOpen])

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  useEffect(() => {
    if (!query.trim()) { setResults([]); setLoading(false); return }
    setLoading(true)
    const timer = setTimeout(async () => {
      try {
        const country = document.cookie.split('; ').find(r => r.startsWith('x-country='))?.split('=')[1] ?? 'IT'
        const data = await shopifyFetch(SEARCH_PRODUCTS, { query: query.trim(), first: 8, country })
        setResults(data.products.edges.map((e: { node: Product }) => e.node))
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 350)
    return () => clearTimeout(timer)
  }, [query])

  if (!isOpen) return null

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)' }} />

      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 201, background: '#f5f5f5', padding: '1.5rem 2rem 2rem', boxShadow: '0 4px 40px rgba(0,0,0,0.1)' }}>

        {/* INPUT ROW */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '1rem' }}>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t('placeholder')}
            style={{
              flex: 1, background: 'none', border: 'none', outline: 'none',
              fontFamily: "'CenturyGothic', sans-serif", fontSize: '1.4rem',
              fontWeight: 300, letterSpacing: '0.04em', color: '#080808',
            }}
          />
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: "'CenturyGothic', sans-serif", fontSize: '0.8rem',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'rgba(0,0,0,0.6)', padding: '0.5rem 0.8rem', transition: 'color 0.15s',
            }}
            onMouseEnter={e => ((e.target as HTMLButtonElement).style.color = '#080808')}
            onMouseLeave={e => ((e.target as HTMLButtonElement).style.color = 'rgba(0,0,0,0.4)')}
          >
            {t('close')}
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <p style={{ padding: '1.5rem 0', fontFamily: "'CenturyGothic', sans-serif", fontSize: '0.72rem', letterSpacing: '0.1em', color: 'rgba(0,0,0,0.35)' }}>
            {t('searching')}
          </p>
        )}

        {/* NO RESULTS */}
        {!loading && query.trim() !== '' && results.length === 0 && (
          <p style={{ padding: '1.5rem 0', fontFamily: "'CenturyGothic', sans-serif", fontSize: '0.72rem', letterSpacing: '0.04em', color: 'rgba(0,0,0,0.35)' }}>
            {t('noResults')} &ldquo;{query}&rdquo;
          </p>
        )}

        {/* RESULTS */}
        {results.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '1rem', paddingTop: '1.5rem', maxHeight: '60vh', overflowY: 'auto' }}>
            {results.map(p => {
              const img = p.images.edges[0]?.node.url
              const price = parseFloat(p.priceRange.minVariantPrice.amount).toFixed(0)
              const currencySymbol = ({ EUR: '€', USD: '$', GBP: '£' } as Record<string, string>)[p.priceRange.minVariantPrice.currencyCode] ?? '€'
              return (
                <Link key={p.id} href={`/products/${p.handle}`} onClick={onClose} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {img && (
                    <div style={{ aspectRatio: '3/4', background: '#e8e8e8', overflow: 'hidden', marginBottom: '0.6rem' }}>
                      <img src={img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </div>
                  )}
                  <p style={{ fontFamily: "'CenturyGothic', sans-serif", fontSize: '0.72rem', letterSpacing: '0.04em', color: '#080808', marginBottom: '0.2rem' }}>
                    {p.title}
                  </p>
                  <p style={{ fontFamily: "'CenturyGothic', sans-serif", fontSize: '0.68rem', color: 'rgba(0,0,0,0.4)' }}>
                    {currencySymbol}{price}
                  </p>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}