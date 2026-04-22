import { cookies, headers } from 'next/headers'

const COUNTRY_TO_LOCALE: Record<string, string> = {
  IT: 'it', US: 'en', GB: 'en', FR: 'fr', DE: 'de', ES: 'es',
}

export async function getLocale(): Promise<string> {
  const cookieStore = await cookies()
  const headersList = await headers()
  const country = cookieStore.get('x-country')?.value ?? headersList.get('x-country') ?? 'IT'
  return COUNTRY_TO_LOCALE[country] ?? 'en'
}

export async function getT(namespace: string) {
  const locale = await getLocale()
  const messages = (await import(`../messages/${locale}.json`)).default
  const ns = messages[namespace] ?? {}
  return (key: string) => ns[key] ?? key
}