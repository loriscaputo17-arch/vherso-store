'use client'

import { useCart } from '@/context/CartContext'
import { useState, useEffect } from 'react'

type TFunc = (key: string) => string

const defaultT: TFunc = (k) => k

export default function Cart() {
  const { cart, isOpen, closeCart, cartCount } = useCart()
  const [t, setT] = useState<TFunc>(() => defaultT)

  useEffect(() => {
    const locale = document.cookie
      .split('; ')
      .find(row => row.startsWith('x-country='))
      ?.split('=')[1] === 'US' ? 'en' : 'it'

    import(`../messages/${locale}.json`).then(m => {
      const ns = m.default?.cart ?? {}
      setT(() => (key: string) => ns[key] ?? key)
    })
  }, [])

  const total = cart?.cost.totalAmount
  const lines = cart?.lines.edges ?? []
  const currencySymbol = { EUR: '€', USD: '$', GBP: '£' }[total?.currencyCode ?? 'EUR'] ?? '€'
  const threshold = 200

  return (
    <>
      <style>{`
        .cart-drawer {
          position: fixed; top: 0; right: 0; bottom: 0;
          width: 420px; z-index: 201;
          background: #f5f5f5;
          border-left: 1px solid rgba(0,0,0,0.06);
          display: flex; flex-direction: column;
          transform: translateX(${isOpen ? '0' : '100%'});
          transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .cart-overlay {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(0,0,0,0); pointer-events: none;
          transition: background 0.4s;
        }
        .cart-overlay.open {
          background: rgba(0,0,0,0.35); pointer-events: auto;
          backdrop-filter: blur(4px);
        }
        .cart-line {
          display: flex; gap: 1rem; padding: 1.5rem 0;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          transition: opacity 0.2s;
        }
        .cart-line:hover { opacity: 0.75; }
        .cart-line:last-child { border-bottom: none; }
        .checkout-btn {
          display: block; text-align: center;
          background: #080808; color: #f5f5f5; padding: 1.1rem;
          text-decoration: none; font-size: 0.68rem;
          letter-spacing: 0.22em; text-transform: uppercase;
          font-weight: 500; font-family: 'CenturyGothic', sans-serif;
          transition: background 0.2s, letter-spacing 0.3s;
          cursor: pointer; border: none; width: 100%;
        }
        .checkout-btn:hover { background: #1a1a1a; letter-spacing: 0.28em; }
        .cart-empty-icon {
          width: 60px; height: 60px;
          border: 1px solid rgba(0,0,0,0.1); border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1.5rem;
        }
        .cart-close-btn {
          background: none; border: 1px solid rgba(0,0,0,0.1);
          color: rgba(0,0,0,0.35); cursor: pointer;
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.8rem; transition: all 0.2s;
          font-family: 'CenturyGothic', sans-serif;
        }
        .cart-close-btn:hover { background: #080808; color: #f5f5f5; border-color: #080808; }
        .cart-continue-btn {
          background: none; border: 1px solid rgba(0,0,0,0.12);
          color: rgba(0,0,0,0.4); padding: 0.8rem 1.8rem;
          font-size: 0.62rem; letter-spacing: 0.2em;
          text-transform: uppercase; cursor: pointer;
          font-family: 'CenturyGothic', sans-serif; transition: all 0.2s;
        }
        .cart-continue-btn:hover { background: #080808; color: #f5f5f5; border-color: #080808; }
        @media (max-width: 480px) { .cart-drawer { width: 100vw !important; } }
      `}</style>

      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={closeCart} />

      <div className="cart-drawer">

        {/* HEADER */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', padding: '1.5rem 2rem',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <span style={{
              fontFamily: "'CenturyGothic', sans-serif",
              fontSize: '1.4rem', letterSpacing: '0.1em', color: '#080808',
            }}>
              {t('yourBag')}
            </span>
            {cartCount > 0 && (
              <span style={{
                background: '#080808', color: '#f5f5f5',
                borderRadius: '50%', width: '20px', height: '20px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.6rem', fontWeight: 600,
              }}>
                {cartCount}
              </span>
            )}
          </div>
          <button className="cart-close-btn" onClick={closeCart}>✕</button>
        </div>

        {/* FREE SHIPPING BAR */}
        {cartCount > 0 && (
          <div style={{
            padding: '0.8rem 2rem',
            borderBottom: '1px solid rgba(0,0,0,0.05)',
            background: 'rgba(0,0,0,0.02)',
          }}>
            {parseFloat(total?.amount ?? '0') >= threshold ? (
              <p style={{
                fontSize: '0.6rem', letterSpacing: '0.15em',
                textTransform: 'uppercase', color: 'rgba(0,0,0,0.45)',
                textAlign: 'center',
              }}>
                {t('freeShippingQualified')}
              </p>
            ) : (
              <>
                <p style={{
                  fontSize: '0.6rem', letterSpacing: '0.12em',
                  textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)',
                  marginBottom: '0.5rem',
                }}>
                  {currencySymbol}{(threshold - parseFloat(total?.amount ?? '0')).toFixed(0)} {t('freeShippingAway')}
                </p>
                <div style={{ height: '2px', background: 'rgba(0,0,0,0.08)', borderRadius: '2px' }}>
                  <div style={{
                    height: '100%',
                    width: `${Math.min((parseFloat(total?.amount ?? '0') / threshold) * 100, 100)}%`,
                    background: '#080808', borderRadius: '2px',
                    transition: 'width 0.5s ease',
                  }} />
                </div>
              </>
            )}
          </div>
        )}

        {/* LINES */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 2rem' }}>
          {lines.length === 0 ? (
            <div style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', height: '100%',
            }}>
              <div className="cart-empty-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
              </div>
              <p style={{
                fontFamily: "'CenturyGothic', sans-serif",
                fontSize: '1.6rem', letterSpacing: '0.08em',
                color: 'rgba(0,0,0,0.15)', marginBottom: '0.5rem',
              }}>
                {t('empty')}
              </p>
              <p style={{
                fontSize: '0.7rem', color: 'rgba(0,0,0,0.25)',
                letterSpacing: '0.08em', marginBottom: '2rem',
              }}>
                {t('addSomething')}
              </p>
              <button className="cart-continue-btn" onClick={closeCart}>
                {t('continueShopping')}
              </button>
            </div>
          ) : (
            <div style={{ paddingTop: '1rem' }}>
              {lines.map(({ node }) => {
                const lineSymbol = { EUR: '€', USD: '$', GBP: '£' }[node.merchandise.price.currencyCode] ?? '€'
                return (
                  <div key={node.id} className="cart-line">
                    <div style={{
                      width: '75px', height: '95px', flexShrink: 0,
                      background: '#e8e8e8', overflow: 'hidden',
                    }}>
                      {node.merchandise.product.images.edges[0] ? (
                        <img
                          src={node.merchandise.product.images.edges[0].node.url}
                          alt={node.merchandise.product.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <div style={{
                          width: '100%', height: '100%',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <span style={{ fontFamily: "'CenturyGothic', sans-serif", fontSize: '1.5rem', color: 'rgba(0,0,0,0.08)' }}>V</span>
                        </div>
                      )}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{
                        color: '#080808', fontSize: '0.75rem',
                        letterSpacing: '0.04em', marginBottom: '0.25rem',
                        fontWeight: 400, overflow: 'hidden',
                        textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>
                        {node.merchandise.product.title}
                      </p>
                      <p style={{
                        color: 'rgba(0,0,0,0.35)', fontSize: '0.65rem',
                        letterSpacing: '0.08em', marginBottom: '0.8rem',
                        textTransform: 'uppercase',
                      }}>
                        {node.merchandise.title !== 'Default Title' ? node.merchandise.title : ''}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{
                          border: '1px solid rgba(0,0,0,0.1)',
                          height: '28px', display: 'flex', alignItems: 'center',
                        }}>
                          <span style={{ padding: '0 0.8rem', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'rgba(0,0,0,0.4)' }}>
                            {t('qty')} {node.quantity}
                          </span>
                        </div>
                        <p style={{ color: '#080808', fontSize: '0.78rem', letterSpacing: '0.06em', fontWeight: 400 }}>
                          {lineSymbol}{parseFloat(node.merchandise.price.amount).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* FOOTER */}
        {lines.length > 0 && (
          <div style={{
            padding: '1.5rem 2rem 2rem',
            borderTop: '1px solid rgba(0,0,0,0.06)',
            background: '#f5f5f5',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'baseline', marginBottom: '0.5rem',
            }}>
              <span style={{
                fontSize: '0.6rem', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)',
              }}>
                {t('subtotal')}
              </span>
              <span style={{
                fontFamily: "'CenturyGothic', sans-serif",
                fontSize: '1.6rem', color: '#080808', letterSpacing: '0.05em',
              }}>
                {currencySymbol}{parseFloat(total?.amount ?? '0').toFixed(2)}
              </span>
            </div>
            <p style={{
              fontSize: '0.58rem', letterSpacing: '0.1em',
              color: 'rgba(0,0,0,0.2)', marginBottom: '1.5rem',
            }}>
              {t('taxShipping')}
            </p>

            <a href={cart?.checkoutUrl} className="checkout-btn">
              {t('checkout')}
            </a>

            <div style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '0.5rem', marginTop: '1rem',
            }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
              <span style={{
                fontSize: '0.55rem', letterSpacing: '0.12em',
                color: 'rgba(0,0,0,0.2)', textTransform: 'uppercase',
              }}>
                {t('secure')}
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  )
}