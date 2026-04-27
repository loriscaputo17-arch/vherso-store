import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email) return NextResponse.json({ success: false }, { status: 400 })

    const mutation = `
      mutation customerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
          customer { id email }
          customerUserErrors { code message field }
        }
      }
    `

    const res = await fetch(
      `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!,
        },
        body: JSON.stringify({
          query: mutation,
          variables: {
            input: {
              email,
              password: Math.random().toString(36).slice(-12) + 'A1!',
              acceptsMarketing: true,
            },
          },
        }),
      }
    )

    const data = await res.json()
    //console.log('Shopify response:', JSON.stringify(data))

    const errors = data?.data?.customerCreate?.customerUserErrors
    if (errors?.length > 0 && errors[0].code !== 'TAKEN') {
      return NextResponse.json({ success: false, error: errors[0].message })
    }

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('Newsletter error:', e)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}