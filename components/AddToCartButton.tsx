'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'

type TFunc = (key: string) => string

export default function AddToCartButton({ variantId }: { variantId: string }) {
  const { addToCart } = useCart()
  const [adding, setAdding] = useState(false)
  const [added, setAdded] = useState(false)
  const [t, setT] = useState<TFunc>(() => (k: string) => k)

  useEffect(() => {
    const country = document.cookie.split('; ').find(r => r.startsWith('x-country='))?.split('=')[1] ?? 'IT'
    const locale = ['US', 'GB'].includes(country) ? 'en' : 'it'
    import(`../messages/${locale}.json`).then(m => {
      const ns = m.default?.product ?? {}
      setT(() => (key: string) => ns[key] ?? key)
    })
  }, [])

  const handleClick = async () => {
    if (!variantId) return
    setAdding(true)
    await addToCart(variantId)
    setAdding(false)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <button
      onClick={handleClick}
      disabled={adding}
      style={{
        width: '100%', padding: '1.2rem',
        background: added ? '#1a1a1a' : '#080808',
        color: '#f5f5f5',
        border: 'none', cursor: 'pointer',
        fontSize: '0.72rem', letterSpacing: '0.22em',
        textTransform: 'uppercase', fontWeight: 500,
        fontFamily: "'CenturyGothic', sans-serif",
        transition: 'background 0.2s',
      }}
    >
      {adding ? t('adding') : added ? t('added') : t('addToBag')}
    </button>
  )
}