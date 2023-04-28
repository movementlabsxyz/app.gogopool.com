import { BigNumberish, utils } from 'ethers'

// formats a BigNumber to a string with a given number of decimals
export const formatEtherFixed = (input: BigNumberish, decimals = 2): string => {
  const value = parseInt(utils.formatEther(input))
  return value.toFixed(decimals)
}
