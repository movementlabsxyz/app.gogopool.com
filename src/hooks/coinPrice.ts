import { BigNumber, utils } from 'ethers'

import useSWR from 'swr'

const { parseEther } = utils

import fetcher from '../utils/fetcher'

const useCoinPrice = (
  currencyId: string,
  fiatCurrency = 'usd',
): {
  price: number
  priceBN: BigNumber
  isLoading: boolean
  isError: boolean
  error: unknown
} => {
  const { data, error } = useSWR(
    `https://api.coingecko.com/api/v3/simple/price?ids=${currencyId}&vs_currencies=${fiatCurrency}`,
    fetcher,
  )

  return {
    price: data?.[currencyId]?.[fiatCurrency] ?? 0,
    priceBN: data ? parseEther(String(data[currencyId][fiatCurrency])) : BigNumber.from(0),
    isLoading: !data && !error,
    isError: Boolean(error),
    error,
  }
}

export default useCoinPrice
