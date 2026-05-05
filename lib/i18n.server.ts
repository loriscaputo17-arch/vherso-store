import { cookies, headers } from 'next/headers'

const COUNTRY_TO_LOCALE: Record<string, string> = {
  IT: 'it',
  US: 'en', GB: 'en', CA: 'en', AU: 'en', NZ: 'en', IE: 'en',
  FR: 'fr', BE: 'fr',
  DE: 'de', AT: 'de', CH: 'de',
  ES: 'es', MX: 'es', AR: 'es', CO: 'es',
  SE: 'sv', NL: 'nl', PT: 'pt', BR: 'pt',
  PL: 'pl', NO: 'en', DK: 'en', FI: 'en',
  CZ: 'en', HU: 'en', RO: 'en', GR: 'en',
  HR: 'en', SK: 'en', SI: 'en', BG: 'en',
  LT: 'en', LV: 'en', EE: 'en', LU: 'en',
  MT: 'en', JP: 'en', KR: 'en', CN: 'en',
  SG: 'en', HK: 'en', AE: 'en', SA: 'en',
  ZA: 'en', IN: 'en',
}

const COUNTRY_TO_LANGUAGE: Record<string, string> = {
  IT: 'IT', FR: 'FR', DE: 'DE', ES: 'ES',
  NL: 'NL', SE: 'SV', PT: 'PT', BR: 'PT', PL: 'PL',
}

export async function getLocale(): Promise<string> {
  const cookieStore = await cookies()
  const headersList = await headers()
  const country = cookieStore.get('x-country')?.value ?? headersList.get('x-country') ?? 'IT'
  return COUNTRY_TO_LOCALE[country] ?? 'en'
}

export async function getLanguage(): Promise<string> {
  const cookieStore = await cookies()
  const headersList = await headers()
  const country = cookieStore.get('x-country')?.value ?? headersList.get('x-country') ?? 'IT'
  return COUNTRY_TO_LANGUAGE[country] ?? 'EN'
}

export async function getT(namespace: string) {
  const locale = await getLocale()
  let messages: any
  try {
    messages = (await import(`../messages/${locale}.json`)).default
  } catch {
    messages = (await import(`../messages/en.json`)).default
  }
  const ns = messages[namespace] ?? {}
  return (key: string) => ns[key] ?? key
}