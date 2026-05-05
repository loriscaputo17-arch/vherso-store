import { shopifyFetch } from '@/lib/shopify'
import { GET_COLLECTION_BY_HANDLE } from '@/lib/queries'
import CanvasGallery from '@/components/CanvasGallery'
import { cookies, headers } from 'next/headers'

export default async function CanvasPage() {
  const cookieStore = await cookies()
  const headersList = await headers()
  const country = cookieStore.get('x-country')?.value 
    ?? headersList.get('x-country') 
    ?? 'IT'

  let canvases: any[] = []

  try {
    const data = await shopifyFetch(GET_COLLECTION_BY_HANDLE, {
      handle: 'canvas',
      first: 10,
      country,
    })
    canvases = data?.collection?.products?.edges ?? []
  } catch (e) {
    console.error('Canvas not loaded')
  }

  return <CanvasGallery canvases={canvases} />
}