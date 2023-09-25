import { BigNumber } from 'ethers'

import { parseEther } from 'ethers/lib/utils.js'
import { useAccount } from 'wagmi'

import { useGetAVAXAssigned, useGetGGPPrice, useGetGGPStake } from '@/hooks/useStake'

export const useMaxWithdrawAmount = (): BigNumber => {
  const { address } = useAccount()
  const { data: ggpPriceInAvax } = useGetGGPPrice()
  const { data: ggpStake } = useGetGGPStake(address)
  const { data: avaxAssigned } = useGetAVAXAssigned(address)

  const maxRatio = parseEther('1.500')

  const maxGgpAsAvax = maxRatio.mul(avaxAssigned)
  let maxWithdrawAmount = BigNumber.from(0)
  if (ggpPriceInAvax.gt(0)) {
    maxWithdrawAmount = ggpStake.sub(maxGgpAsAvax.div(ggpPriceInAvax))
  }

  if (maxWithdrawAmount.lt(0)) {
    maxWithdrawAmount = BigNumber.from(0)
  }

  return maxWithdrawAmount
}
