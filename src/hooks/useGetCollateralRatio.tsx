import { useAccount } from 'wagmi'

import { useGetAVAXAssigned, useGetGGPPrice, useGetGGPStake } from '@/hooks/useStake'

export const useGetCollateralRatio = ({ avaxAmount = 0, ggpAmount = 0 }) => {
  const { address } = useAccount()
  const { data: ggpPrice } = useGetGGPPrice()
  const { data: ggpStake } = useGetGGPStake(address)
  const { data: avaxAssigned } = useGetAVAXAssigned(address)

  if (avaxAssigned + avaxAmount === 0) {
    return Infinity // Return Infinity if division by zero would occur
  }

  const ratio = (((ggpStake + ggpAmount) * ggpPrice) / (avaxAssigned + avaxAmount)) * 100

  return ratio
}
