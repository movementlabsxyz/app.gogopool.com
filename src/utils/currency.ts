import { CURRENCY_LIST, CURRENCY_SYMBOLS } from '@/constants/coingecko'

export const resolveCurrencySymbol = (currency: string) => {
  const symbol = CURRENCY_SYMBOLS[currency.toUpperCase()]

  return symbol || currency.toUpperCase() + ' '
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatLabel = (price: number, currency: string) => {
  const decimalPlaces = CURRENCY_LIST.includes(currency) ? 2 : 8

  const symbol = CURRENCY_SYMBOLS[currency.toUpperCase()]

  if (!symbol) {
    return `${price.toLocaleString(undefined, {
      maximumFractionDigits: decimalPlaces,
    })} ${currency.toUpperCase()}`
  }

  return `${symbol}${price.toLocaleString(undefined, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  })}`
}

export default formatLabel
