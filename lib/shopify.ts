import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers'

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!

const COUNTRY_TO_LANGUAGE: Record<string, string> = {
  IT: 'IT', US: 'EN', GB: 'EN', CA: 'EN', AU: 'EN', NZ: 'EN', IE: 'EN',
  FR: 'FR', BE: 'FR',
  DE: 'DE', AT: 'DE', CH: 'DE',
  ES: 'ES', MX: 'ES', AR: 'ES', CO: 'ES',
  NL: 'NL', SE: 'SV', PT: 'PT', BR: 'PT', PL: 'PL',
}

export async function shopifyFetch(
  query: string,
  variables: Record<string, any> = {},
  reqHeaders?: ReadonlyHeaders
) {
  // prendi country da: 1) variables dirette, 2) headers server, 3) fallback
  const country = variables.country ?? reqHeaders?.get('x-country') ?? 'IT'
  const language = COUNTRY_TO_LANGUAGE[country] ?? COUNTRY_TO_LANGUAGE['default']

  // rimuovi country dalle variables per non duplicarlo
  const { country: _c, ...restVariables } = variables

  const response = await fetch(
    `https://${domain}/api/2024-01/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
      },
      body: JSON.stringify({
        query,
        variables: {
          ...restVariables,
          country,
          language,
        },
      }),
    }
  )

  const data = await response.json()
  return data.data
}