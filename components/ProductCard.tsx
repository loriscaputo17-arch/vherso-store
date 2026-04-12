'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'

interface Product {
  id: string
  title: string
  handle: string
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
        price: { amount: string; currencyCode: string }
      }
    }[]
  }
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const [hovered, setHovered] = useState(false)
  const [adding, setAdding] = useState(false)

  const image1 = product.images.edges[0]?.node.url
  const image2 = product.images.edges[1]?.node.url
  const firstVariant = product.variants.edges[0]?.node
  const price = parseFloat(product.priceRange.minVariantPrice.amount).toFixed(0)

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
      {/* IMAGE */}
      <div style={{
        position: 'relative', aspectRatio: '3/4',
        background: '#e8e8e8', overflow: 'hidden',
      }}>
        {image1 && (
          <img
            src={hovered && image2 ? image2 : image1}
            alt={product.title}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
              display: 'block',
            }}
          />
        )}

        {/* ADD TO BAG */}
        <button
          onClick={handleAddToCart}
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: '#080808', color: '#f5f5f5',
            border: 'none', padding: '0.9rem',
            cursor: 'pointer',
            fontSize: '0.62rem', letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontFamily: "'DM Sans', sans-serif",
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.25s, transform 0.25s',
          }}
        >
          {adding ? 'Adding...' : 'Add to Bag'}
        </button>
      </div>

      {/* INFO */}
      <div style={{
        padding: '0.9rem 0 1.2rem',
        background: '#f5f5f5',
        margin: '1rem'
      }}>
        <p style={{
          color: '#080808',
          fontSize: '0.78rem',
          letterSpacing: '0.04em',
          marginBottom: '0.3rem',
          fontWeight: 400,
          fontFamily: "'DM Sans', sans-serif",
        }}>
          {product.title}
        </p>
        <p style={{
          color: 'rgba(0,0,0,0.4)',
          fontSize: '0.72rem',
          letterSpacing: '0.04em',
          fontFamily: "'DM Sans', sans-serif",
        }}>
          €{price}
        </p>
      </div>
    </Link>
  )
}