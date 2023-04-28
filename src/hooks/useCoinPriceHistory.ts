import useSWR from 'swr'

import fetcher from '../utils/fetcher'

export type PriceHistoryEntry = {
  price: number
  date: Date
}

export type PriceHistory = PriceHistoryEntry[]

const useCoinPriceHistory = (
  currencyId: string,
  fiatCurrency = 'usd',
  days = 7,
): {
  data: PriceHistory
  isLoading: boolean
  isError: boolean
  error: unknown
} => {
  const { data, error } = useSWR(
    `https://api.coingecko.com/api/v3/coins/${currencyId}/market_chart?vs_currency=${fiatCurrency}&days=${days}`,
    fetcher,
  )

  return {
    data:
      data?.prices.map(([timestamp, price]) => ({
        price,
        date: new Date(timestamp),
      })) ?? [],
    isLoading: !data && !error,
    isError: Boolean(error),
    error,
  }
}

export default useCoinPriceHistory
