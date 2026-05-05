export const COUNTRY_TO_LOCALE_FORMAT: Record<string, string> = {
  IT: 'it-IT', FR: 'fr-FR', DE: 'de-DE', ES: 'es-ES',
  US: 'en-US', GB: 'en-GB', CA: 'en-CA', AU: 'en-AU',
  SE: 'sv-SE', NL: 'nl-NL', PT: 'pt-PT', BR: 'pt-BR',
  PL: 'pl-PL', CH: 'de-CH', AT: 'de-AT', BE: 'fr-BE',
  NO: 'nb-NO', DK: 'da-DK', FI: 'fi-FI', JP: 'ja-JP',
}

export function getLocaleFormat(country: string): string {
  return COUNTRY_TO_LOCALE_FORMAT[country] ?? 'en-US'
}