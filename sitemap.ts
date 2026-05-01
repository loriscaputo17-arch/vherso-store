import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://vhersoclo.com', lastModified: new Date(), priority: 1 },
    { url: 'https://vhersoclo.com/shop', lastModified: new Date(), priority: 0.9 },
    { url: 'https://vhersoclo.com/about', lastModified: new Date(), priority: 0.7 },
    { url: 'https://vhersoclo.com/contact', lastModified: new Date(), priority: 0.6 },
    { url: 'https://vhersoclo.com/canvas', lastModified: new Date(), priority: 0.7 },
    { url: 'https://vhersoclo.com/collections/summer-collection', lastModified: new Date(), priority: 0.8 },
    { url: 'https://vhersoclo.com/collections/allproducts', lastModified: new Date(), priority: 0.8 },
    { url: 'https://vhersoclo.com/collections/women-collection-ss25', lastModified: new Date(), priority: 0.8 },
  ]
}