import { BigNumber, constants } from 'ethers'

import { useAccount } from 'wagmi'

import { useGetAVAXAssigned, useGetGGPPrice, useGetGGPStake } from '@/hooks/useStake'

export const useGetFutureRatio = ({
  additionalAvax = BigNumber.from(0),
  additionalGgp = BigNumber.from(0),
}): BigNumber => {
  const { address } = useAccount()
  const { data: ggpPriceInAvax } = useGetGGPPrice()
  const { data: ggpStake } = useGetGGPStake(address)
  const { data: avaxAssigned } = useGetAVAXAssigned(address)

  if (avaxAssigned.add(additionalAvax).eq(0)) {
    return constants.MaxUint256 // Return Infinity if division by zero would occur
  }

  const ratio = ggpStake
    .add(additionalGgp)
    .mul(ggpPriceInAvax)
    .div(avaxAssigned.add(additionalAvax))
    .mul(BigNumber.from(100))

  return ratio
}
