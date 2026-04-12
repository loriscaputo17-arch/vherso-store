'use client'

import { useState, useEffect } from 'react'
import { shopifyFetch } from '@/lib/shopify'
import { GET_PRODUCTS, GET_COLLECTIONS } from '@/lib/queries'
import ProductCard from '@/components/ProductCard'

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([])
  const [collections, setCollections] = useState<any[]>([])
  const [activeFilter, setActiveFilter] = useState('ALL')
  const [sortBy, setSortBy] = useState('default')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [pData, cData] = await Promise.all([
          shopifyFetch(GET_PRODUCTS, { first: 48 }),
          shopifyFetch(GET_COLLECTIONS, { first: 10 }),
        ])
        setProducts(pData?.products?.edges ?? [])
        setCollections(cData?.collections?.edges ?? [])
      } catch (e) {
        console.error('Shop load error')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filters = ['ALL', ...collections.map(({ node }: any) => node.title.toUpperCase())]

  const filtered = products.filter(({ node }: any) => {
    if (activeFilter === 'ALL') return true
    return node.title.toUpperCase().includes(activeFilter.split(' ')[0])
  })

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-asc') return parseFloat(a.node.priceRange.minVariantPrice.amount) - parseFloat(b.node.priceRange.minVariantPrice.amount)
    if (sortBy === 'price-desc') return parseFloat(b.node.priceRange.minVariantPrice.amount) - parseFloat(a.node.priceRange.minVariantPrice.amount)
    return 0
  })

  return (
    <>
      <style>{`
        .shop-page {
          background: #f5f5f5;
          min-height: 100vh;
          color: #080808;
          font-family: 'CenturyGothic', sans-serif;
        }

        .shop-header {
          padding: 8rem 2rem 0;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          background: #efefef;
        }

        .shop-header-bg {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'CenturyGothic', sans-serif;
          font-size: clamp(120px, 22vw, 300px);
          color: rgba(0,0,0,0.03);
          white-space: nowrap;
          user-select: none;
          letter-spacing: 0.05em;
          pointer-events: none;
        }

        .shop-header-content {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding-bottom: 2.5rem;
        }

        .shop-title {
          font-family: 'CenturyGothic', sans-serif;
          font-size: clamp(4rem, 10vw, 10rem);
          font-weight: 400;
          line-height: 0.88;
          letter-spacing: 0.02em;
          color: #080808;
        }

        .shop-meta p {
          font-size: 0.62rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.25);
          text-align: right;
        }

        .filters-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          overflow-x: auto;
          scrollbar-width: none;
          gap: 1rem;
          background: #f5f5f5;
        }

        .filters-bar::-webkit-scrollbar { display: none; }

        .filters-left {
          display: flex;
          gap: 0;
          flex-shrink: 0;
        }

        .filter-btn {
          background: none;
          border: none;
          color: rgba(0,0,0,0.3);
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 1.2rem 1rem;
          cursor: pointer;
          font-family: 'CenturyGothic', sans-serif;
          border-bottom: 2px solid transparent;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .filter-btn.active {
          color: #080808;
          border-bottom-color: #080808;
        }

        .filter-btn:hover { color: #080808; }

        .sort-select {
          background: none;
          border: none;
          color: rgba(0,0,0,0.35);
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          font-family: 'CenturyGothic', sans-serif;
          outline: none;
          padding: 0.5rem 0;
          flex-shrink: 0;
        }

        .sort-select option {
          background: #f5f5f5;
          color: #080808;
        }

        .results-bar {
          padding: 1.2rem 2rem;
          border-bottom: 1px solid rgba(0,0,0,0.04);
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #f5f5f5;
        }

        .results-bar p {
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.25);
        }

        .shop-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2px;
          padding: 2px;
          background: rgba(0,0,0,0.06);
        }

        .skeleton {
          background: #e8e8e8;
          aspect-ratio: 3/4;
          animation: shimmer 1.5s ease infinite;
        }

        @keyframes shimmer {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .shop-empty {
          grid-column: 1 / -1;
          padding: 6rem 2rem;
          text-align: center;
          background: #f5f5f5;
        }

        .shop-empty h3 {
          font-family: 'CenturyGothic', sans-serif;
          font-size: 3rem;
          color: rgba(0,0,0,0.1);
          letter-spacing: 0.1em;
          margin-bottom: 1rem;
        }

        .shop-empty p {
          font-size: 0.72rem;
          color: rgba(0,0,0,0.25);
          letter-spacing: 0.1em;
        }

        @media (max-width: 1024px) {
          .shop-grid { grid-template-columns: repeat(3, 1fr); }
        }

        @media (max-width: 768px) {
          .shop-header { padding: 6rem 1.5rem 0; }
          .shop-header-content { flex-direction: column; align-items: flex-start; gap: 1rem; }
          .shop-meta p { text-align: left; }
          .shop-grid { grid-template-columns: repeat(2, 1fr); }
          .filters-bar { padding: 0 1.5rem; }
          .results-bar { padding: 1rem 1.5rem; }
        }

        @media (max-width: 480px) {
          .shop-grid { grid-template-columns: repeat(2, 1fr); gap: 1px; padding: 1px; }
        }
      `}</style>

      <div className="shop-page">

        <div className="shop-header">
          <div className="shop-header-bg">SHOP</div>
          <div className="shop-header-content">
            <div>
              <p style={{
                fontSize: '0.6rem', letterSpacing: '0.25em',
                textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)',
                marginBottom: '1rem',
              }}>
                VHERSO — All Products
              </p>
              <h1 className="shop-title">
                SHOP<br />
                <span style={{ color: 'rgba(0,0,0,0.18)' }}>ALL</span>
              </h1>
            </div>
            <div className="shop-meta">
              <p>{loading ? '—' : `${sorted.length} styles`}</p>
              <p style={{ marginTop: '0.3rem' }}>SS26 Collection</p>
            </div>
          </div>
        </div>

        <div className="filters-bar">
          <div className="filters-left">
            {filters.slice(0, 6).map(f => (
              <button
                key={f}
                className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <select
            className="sort-select"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
        </div>

        <div className="results-bar">
          <p>{loading ? 'Loading...' : `${sorted.length} results`}</p>
          {activeFilter !== 'ALL' && (
            <button
              onClick={() => setActiveFilter('ALL')}
              style={{
                background: 'none', border: 'none',
                color: 'rgba(0,0,0,0.35)', cursor: 'pointer',
                fontSize: '0.58rem', letterSpacing: '0.15em',
                textTransform: 'uppercase', fontFamily: 'CenturyGothic, sans-serif',
                textDecoration: 'underline', textUnderlineOffset: '3px',
              }}
            >
              Clear filter ✕
            </button>
          )}
        </div>

        <div className="shop-grid">
          {loading ? (
            Array(8).fill(null).map((_, i) => (
              <div key={i} className="skeleton" />
            ))
          ) : sorted.length === 0 ? (
            <div className="shop-empty">
              <h3>NO RESULTS</h3>
              <p>Try a different filter</p>
            </div>
          ) : (
            sorted.map(({ node }: any) => (
              <ProductCard key={node.id} product={node} />
            ))
          )}
        </div>

      </div>
    </>
  )
}