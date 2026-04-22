const COUNTRY_TO_LOCALE: Record<string, string> = {
  IT: 'it', US: 'en', GB: 'en', FR: 'fr', DE: 'de', ES: 'es',
}

function getLocaleClient(): string {
  if (typeof document === 'undefined') return 'en'
  const country = document.cookie
    .split('; ')
    .find(row => row.startsWith('x-country='))
    ?.split('=')[1] ?? 'IT'
  return COUNTRY_TO_LOCALE[country] ?? 'en'
}

const cache: Record<string, any> = {}

export async function getT(namespace: string) {
  const locale = getLocaleClient()
  if (!cache[locale]) {
    cache[locale] = (await import(`../messages/${locale}.json`)).default
  }
  const ns = cache[locale][namespace] ?? {}
  return (key: string) => ns[key] ?? key
}