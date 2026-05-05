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

export function formatPrice(amount: string | number, currencyCode: string, locale?: string): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  const symbol = getCurrencySymbol(currencyCode)
  
  // Paesi che mettono il simbolo dopo il numero
  const symbolAfter = ['SEK', 'NOK', 'DKK', 'PLN', 'HUF', 'CZK', 'RON']
  
  if (symbolAfter.includes(currencyCode)) {
    return `${num.toFixed(2)} ${symbol}`
  }
  
  return `${symbol}${num.toFixed(0)}`
}