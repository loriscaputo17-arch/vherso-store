'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { getT } from '@/lib/i18n.client'
import { getCurrencySymbol } from '@/lib/currency'
import { formatPrice } from '@/lib/currency'

interface Product {
  id: string
  title: string
  handle: string
  tags?: string[]
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string }
  }
  images: { edges: { node: { url: string; altText: string | null } }[] }
  variants: {
    edges: {
      node: {
        id: string
        title: string
        availableForSale: boolean
        quantityAvailable?: number
        price: { amount: string; currencyCode: string }
      }
    }[]
  }
}

type TFunc = (key: string) => string

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const [hovered, setHovered] = useState(false)
  const [adding, setAdding] = useState(false)
  const [t, setT] = useState<TFunc>(() => (k: string) => k)

  useEffect(() => {
    setT(() => getT('product'))
  }, [])

  const image1 = product.images.edges[0]?.node.url
  const image2 = product.images.edges[1]?.node.url
  const firstVariant = product.variants.edges[0]?.node
  const currencyCode = product.priceRange.minVariantPrice.currencyCode
  const formattedPrice = formatPrice(product.priceRange.minVariantPrice.amount, currencyCode)

  const isPreorder = product.tags?.includes('preorder') ?? false
  const isWorldCup = product.tags?.includes('worldcup') ?? false

  const qty = firstVariant?.quantityAvailable ?? 0
  const isOutOfStock = qty === 0

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!firstVariant) return
    setAdding(true)
    await addToCart(firstVariant.id)
    setAdding(false)
  }

  return (
    <Link
      href={`/products/${product.handle}`}
      style={{ textDecoration: 'none', display: 'block', background: '#f5f5f5' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        position: 'relative', aspectRatio: '4/4',
        background: '#e8e8e8', overflow: 'hidden',
      }}>
        {image1 && (
          <img
            src={hovered && image2 ? image2 : image1}
            alt={product.title}
            style={{
              width: '100%', height: '100%',
              transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
              display: 'block',
            }}
          />
        )}

        {/* PRE-ORDER BADGE */}
        {isPreorder && isOutOfStock && (
          <div style={{
            position: 'absolute', top: '0.8rem', left: '0.8rem',
            background: '#000', color: '#fff',
            padding: '0.3rem 0.7rem',
            fontSize: '0.52rem', letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontFamily: "'CenturyGothic', sans-serif",
          }}>
            PRE-ORDER
          </div>
        )}

      {isWorldCup && (
        <div style={{
          position: 'absolute', top: '0.8rem', left: '0.8rem',
          background: '#cc0000', color: '#fff',
          padding: '0.3rem 0.7rem',
          fontSize: '0.52rem', letterSpacing: '0.18em',
          textTransform: 'uppercase',
          fontFamily: "'CenturyGothic', sans-serif",
        }}>
          WORLD CUP LIMITED
        </div>
      )}

        <button
          onClick={handleAddToCart}
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: isPreorder && isOutOfStock ? '#000' : '#080808',
            color: '#f5f5f5',
            border: 'none', padding: '0.9rem', cursor: 'pointer',
            fontSize: '0.62rem', letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontFamily: "'CenturyGothic', sans-serif",
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.25s, transform 0.25s',
          }}
        >
          {adding ? t('adding') : isPreorder && isOutOfStock ? 'PRE-ORDER' : t('addToBag')}
        </button>
      </div>

      <div style={{
        padding: '0.9rem 0 1.2rem',
        background: '#f5f5f5',
        margin: '1rem',
      }}>
        <p style={{
          color: '#080808', fontSize: '0.78rem',
          letterSpacing: '0.04em', marginBottom: '0.3rem',
          fontWeight: 400, fontFamily: "'CenturyGothic', sans-serif",
        }}>
          {product.title}
        </p>
        <p style={{
          color: 'rgba(0,0,0,0.4)', fontSize: '0.72rem',
          letterSpacing: '0.04em', fontFamily: "'CenturyGothic', sans-serif",
        }}>
          {formattedPrice}
        </p>
      </div>
    </Link>
  )
}