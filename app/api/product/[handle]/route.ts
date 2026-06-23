import { shopifyFetch } from '@/lib/shopify'
import { GET_PRODUCT_BY_HANDLE } from '@/lib/queries'
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
    const data = await shopifyFetch(GET_PRODUCT_BY_HANDLE, { handle, country })
    return NextResponse.json(data?.product ?? null)
  } catch (e) {
    return NextResponse.json(null)
  }
}