import { cookies, headers } from 'next/headers'

const COUNTRY_TO_LOCALE: Record<string, string> = {
  IT: 'it',
  US: 'en', GB: 'en', CA: 'en', AU: 'en', NZ: 'en', IE: 'en',
  FR: 'fr', BE: 'fr', CH: 'fr',
  DE: 'de', AT: 'de',
  ES: 'es', MX: 'es', AR: 'es', CO: 'es',
}

export async function getLocale(): Promise<string> {
  const cookieStore = await cookies()
  const headersList = await headers()
  const country = cookieStore.get('x-country')?.value ?? headersList.get('x-country') ?? 'IT'
  return COUNTRY_TO_LOCALE[country] ?? 'en'
}

export async function getT(namespace: string) {
  const locale = await getLocale()
  
  let messages: any
  try {
    messages = (await import(`../messages/${locale}.json`)).default
  } catch {
    // fallback a inglese se il file non esiste
    messages = (await import(`../messages/en.json`)).default
  }
  
  const ns = messages[namespace] ?? {}
  return (key: string) => ns[key] ?? key
}