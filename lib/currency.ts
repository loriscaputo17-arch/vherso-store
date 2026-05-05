export const CURRENCY_SYMBOLS: Record<string, string> = {
  EUR: '€', USD: '$', GBP: '£',
  SEK: 'kr', NOK: 'kr', DKK: 'kr',
  PLN: 'zł', CHF: 'CHF', JPY: '¥',
  CAD: 'CA$', AUD: 'A$', BRL: 'R$',
  INR: '₹', HUF: 'Ft', CZK: 'Kč',
  RON: 'lei', BGN: 'лв', TRY: '₺',
  MXN: 'MX$', SGD: 'S$', HKD: 'HK$',
  AED: 'د.إ', SAR: '﷼', ZAR: 'R',
}

export function getCurrencySymbol(currencyCode: string): string {
  return CURRENCY_SYMBOLS[currencyCode] ?? currencyCode
}