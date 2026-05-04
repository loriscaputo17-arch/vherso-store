import { MetadataRoute } from 'next'
import { shopifyFetch } from '@/lib/shopify'

const GET_ALL_PRODUCTS = `
  query {
    products(first: 250) {
      edges {
        node {
          handle
          updatedAt
        }
      }
    }
  }
`

const GET_ALL_COLLECTIONS = `
  query {
    collections(first: 50) {
      edges {
        node {
          handle
          updatedAt
        }
      }
    }
  }
`

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [productsData, collectionsData] = await Promise.all([
    shopifyFetch(GET_ALL_PRODUCTS, {}),
    shopifyFetch(GET_ALL_COLLECTIONS, {}),
  ])

  const products = productsData?.products?.edges ?? []
  const collections = collectionsData?.collections?.edges ?? []

  const productUrls: MetadataRoute.Sitemap = products.map(({ node }: any) => ({
    url: `https://vhersoclo.com/products/${node.handle}`,
    lastModified: new Date(node.updatedAt),
    priority: 0.8,
  }))

  const collectionUrls: MetadataRoute.Sitemap = collections.map(({ node }: any) => ({
    url: `https://vhersoclo.com/collections/${node.handle}`,
    lastModified: new Date(node.updatedAt),
    priority: 0.7,
  }))

  return [
    { url: 'https://vhersoclo.com', lastModified: new Date(), priority: 1 },
    { url: 'https://vhersoclo.com/shop', lastModified: new Date(), priority: 0.9 },
    { url: 'https://vhersoclo.com/canvas', lastModified: new Date(), priority: 0.7 },
    { url: 'https://vhersoclo.com/about', lastModified: new Date(), priority: 0.6 },
    { url: 'https://vhersoclo.com/contact', lastModified: new Date(), priority: 0.6 },
    { url: 'https://vhersoclo.com/size-guide', lastModified: new Date(), priority: 0.5 },
    { url: 'https://vhersoclo.com/privacy', lastModified: new Date(), priority: 0.3 },
    { url: 'https://vhersoclo.com/terms', lastModified: new Date(), priority: 0.3 },
    ...productUrls,
    ...collectionUrls,
  ]
}