import { shopifyFetch } from '@/lib/shopify'
import { GET_COLLECTION_BY_HANDLE } from '@/lib/queries'
import CanvasGallery from '@/components/CanvasGallery'

export default async function CanvasPage() {
  let canvases: any[] = []

  try {
    const data = await shopifyFetch(GET_COLLECTION_BY_HANDLE, {
      handle: 'canvas',
      first: 10,
    })
    canvases = data?.collection?.products?.edges ?? []
  } catch (e) {
    console.error('Canvas not loaded')
  }

  return <CanvasGallery canvases={canvases} />
}