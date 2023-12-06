import { BigNumber } from 'ethers'

import { useContractRead } from 'wagmi'

import useOonodzWrapper from './contracts/oonodzwrapper'

export const useFindBestRateAndPlan = (
  duration: string,
  bestRate = true,
  countryOfResidence: number,
  watch = true,
) => {
  const { abi, address } = useOonodzWrapper()
  const durationNumber = parseInt(duration.match(/\d+/)?.[0] || '0', 10)

  const { data, error, isError, isLoading } = useContractRead({
    address,
    abi,
    functionName: 'findBestRateAndPlan',
    args: [durationNumber, bestRate, countryOfResidence],
    watch,
  })

  // Extract the first value from the data array
  const bestRateInUSD = data && data.length > 0 ? data[0] : BigNumber.from(0)
  return {
    data: bestRateInUSD.toNumber() / 100,
    isLoading,
    isError,
    error,
  }
}
