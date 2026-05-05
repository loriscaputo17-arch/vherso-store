import en from '../messages/en.json'
import it from '../messages/it.json'
import fr from '../messages/fr.json'
import de from '../messages/de.json'
import es from '../messages/es.json'
import sv from '../messages/sv.json'
import nl from '../messages/nl.json'
import pt from '../messages/pt.json'
import pl from '../messages/pl.json'

const messages: Record<string, any> = { en, it, fr, de, es, sv, nl, pt, pl }

const countryMap: Record<string, string> = {
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