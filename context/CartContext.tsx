'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { shopifyFetch } from '@/lib/shopify'
import { CREATE_CART, ADD_TO_CART } from '@/lib/queries'

const REMOVE_FROM_CART = `
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        checkoutUrl
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
  ... on ProductVariant {
    id
    title
    image {
      url
      altText
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      images(first: 1) {
        edges {
          node {
            url
          }
        }
      }
    }
  }
}
            }
          }
        }
        cost { totalAmount { amount currencyCode } }
      }
    }
  }
`

interface CartLine {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    image?: { url: string; altText?: string }
    price: { amount: string; currencyCode: string }
    product: {
      title: string
      images: { edges: { node: { url: string } }[] }
    }
  }
}

interface Cart {
  id: string
  checkoutUrl: string
  lines: { edges: { node: CartLine }[] }
  cost: { totalAmount: { amount: string; currencyCode: string } }
}

interface CartContextType {
  cart: Cart | null
  cartCount: number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addToCart: (variantId: string, quantity?: number) => Promise<void>
  removeFromCart: (lineId: string) => Promise<void>
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const cartCount = cart?.lines.edges.reduce(
    (acc, { node }) => acc + node.quantity, 0
  ) ?? 0

  const addToCart = async (variantId: string, quantity = 1) => {
  const lines = [{ merchandiseId: variantId, quantity }]
  let newCart: Cart
  if (!cart) {
    const data = await shopifyFetch(CREATE_CART, { lines })
    newCart = data.cartCreate.cart
  } else {
    const data = await shopifyFetch(ADD_TO_CART, { cartId: cart.id, lines })
    newCart = data.cartLinesAdd.cart
  }
  setCart(newCart)
  setIsOpen(true)

  // Facebook Pixel — AddToCart
  if (typeof window !== 'undefined' && (window as any).fbq) {
    const addedLine = newCart.lines.edges.find(
      ({ node }) => node.merchandise.id === variantId
    )
    ;(window as any).fbq('track', 'AddToCart', {
      content_ids: [variantId],
      content_type: 'product',
      value: parseFloat(addedLine?.node.merchandise.price.amount ?? '0'),
      currency: addedLine?.node.merchandise.price.currencyCode ?? 'EUR',
    })
  }
}

  const removeFromCart = async (lineId: string) => {
    if (!cart) return
    const data = await shopifyFetch(REMOVE_FROM_CART, {
      cartId: cart.id,
      lineIds: [lineId],
    })
    setCart(data.cartLinesRemove.cart)
  }

  return (
    <CartContext.Provider value={{
      cart, cartCount, isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addToCart,
      removeFromCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}