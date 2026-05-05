'use client'

import { useEffect } from 'react'
import Script from 'next/script'

export default function TrackingScripts() {
  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (consent === 'accepted') {
      loadScripts()
    }
    
    window.addEventListener('cookie_accepted', loadScripts)
    return () => window.removeEventListener('cookie_accepted', loadScripts)
  }, [])

  return null
}

function loadScripts() {
  // Google Analytics
  if (!(window as any).gtag) {
    const gaScript = document.createElement('script')
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-JGL1PE8TZY'
    gaScript.async = true
    document.head.appendChild(gaScript)
    
    gaScript.onload = () => {
      ;(window as any).dataLayer = (window as any).dataLayer || []
      function gtag(...args: any[]) { (window as any).dataLayer.push(args) }
      ;(window as any).gtag = gtag
      gtag('js', new Date())
      gtag('config', 'G-JGL1PE8TZY')
    }
  }

  // Meta Pixel
  if (!(window as any).fbq) {
    const fbScript = document.createElement('script')
    fbScript.src = 'https://connect.facebook.net/en_US/fbevents.js'
    fbScript.async = true
    document.head.appendChild(fbScript)
    
    fbScript.onload = () => {
      ;(function(f: any, b: any, e: any, v: any) {
        if (f.fbq) return
        const n: any = f.fbq = function() {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        }
        if (!f._fbq) f._fbq = n
        n.push = n; n.loaded = true; n.version = '2.0'; n.queue = []
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
      
      ;(window as any).fbq('init', '2053948174983095')
      ;(window as any).fbq('track', 'PageView')
    }
  }
}