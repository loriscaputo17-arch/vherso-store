import en from '../messages/en.json'
import it from '../messages/it.json'
import fr from '../messages/fr.json'
import de from '../messages/de.json'
import es from '../messages/es.json'

const messages: Record<string, any> = { en, it, fr, de, es }

const countryMap: Record<string, string> = {
  IT: 'it', US: 'en', GB: 'en', CA: 'en', AU: 'en', NZ: 'en', IE: 'en',
  FR: 'fr', BE: 'fr', CH: 'fr',
  DE: 'de', AT: 'de',
  ES: 'es', MX: 'es', AR: 'es', CO: 'es',
}

export function getLocaleClient(): string {
  if (typeof document === 'undefined') return 'en'
  const country = document.cookie.split('; ').find(r => r.startsWith('x-country='))?.split('=')[1] ?? 'IT'
  return countryMap[country] ?? 'en'
}

export function getT(namespace: string): (key: string) => string {
  const locale = getLocaleClient()
  const msgs = messages[locale] ?? messages['en']
  const ns = msgs[namespace] ?? {}
  return (key: string) => ns[key] ?? key
}