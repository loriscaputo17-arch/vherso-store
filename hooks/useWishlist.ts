import { useState, useEffect } from 'react'

export function useWishlist(productHandle: string) {
  const [isWished, setIsWished] = useState(false)

  useEffect(() => {
    if (!productHandle) return
    const wishlist = JSON.parse(localStorage.getItem('vherso_wishlist') ?? '[]')
    setIsWished(wishlist.includes(productHandle))
  }, [productHandle])

  const toggle = () => {
    if (!productHandle) return
    const wishlist: string[] = JSON.parse(localStorage.getItem('vherso_wishlist') ?? '[]')
    const already = wishlist.includes(productHandle)
    const next = already ? wishlist.filter(h => h !== productHandle) : [...wishlist, productHandle]
    localStorage.setItem('vherso_wishlist', JSON.stringify(next))
    setIsWished(!already)
  }

  return { isWished, toggle }
}