import { shopifyFetch } from '@/lib/shopify'
import { GET_COLLECTION_BY_HANDLE } from '@/lib/queries'
import { cookies, headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ handle: string }> }
) {
  const { handle } = await params
  const cookieStore = await cookies()
  const headersList = await headers()
  const country = cookieStore.get('x-country')?.value
    ?? headersList.get('x-country')
    ?? 'IT'

  try {
    const data = await shopifyFetch(GET_COLLECTION_BY_HANDLE, { handle, first: 50, country })
    return NextResponse.json(data?.collection ?? null)
  } catch (e) {
    return NextResponse.json(null)
  }
}
