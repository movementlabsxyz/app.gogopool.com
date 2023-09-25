import { BigNumber, BigNumberish, utils } from 'ethers'

import { formatEther } from 'ethers/lib/utils.js'

// formats a BigNumber to a number with a given number of decimals
export const roundedBigNumber = (num: BigNumberish | undefined, decimals = 4): number => {
  if (!num) {
    return 0
  }
  const value = utils.formatEther(num) as never
  return Math.round(value * 10 ** decimals) / 10 ** decimals
}

export const displayBN = (num: BigNumber, fractionDigits = 2): string => {
  return Number(formatEther(num)).toFixed(fractionDigits)
}
