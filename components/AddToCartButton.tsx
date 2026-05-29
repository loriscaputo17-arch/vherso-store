'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { getT } from '@/lib/i18n.client'

type TFunc = (key: string) => string

export default function AddToCartButton({ 
  variantId, 
  isPreorder = false 
}: { 
  variantId: string
  isPreorder?: boolean 
}) {
  const { addToCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [added, setAdded] = useState(false)
  const [t, setT] = useState<TFunc>(() => (k: string) => k)

  useEffect(() => {
    setT(() => getT('product'))
  }, [])

  const handleClick = async () => {
    if (!variantId) return
    setLoading(true)
    await addToCart(variantId)
    setLoading(false)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const bgColor = isPreorder ? '#000' : '#080808'
  const label = loading
    ? t('adding')
    : added
    ? t('added')
    : isPreorder
    ? 'PRE-ORDER'
    : t('addToBag')

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      style={{
        width: '100%', height: '52px',
        background: bgColor,
        color: '#f5f5f5', border: 'none',
        fontSize: '0.65rem', letterSpacing: '0.2em',
        textTransform: 'uppercase', cursor: loading ? 'wait' : 'pointer',
        fontFamily: "'CenturyGothic', sans-serif",
        fontWeight: 600, transition: 'background 0.2s',
      }}
    >
      {label}
    </button>
  )
}