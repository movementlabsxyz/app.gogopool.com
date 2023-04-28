import { useAccount } from 'wagmi'

import useCoinPrice from '@/hooks/coinPrice'
import { useGetAVAXStake, useGetGGPStake } from '@/hooks/useStake'

export const useCalculateTotalValue = (subGGP = 0) => {
  const { address } = useAccount()
  const { price: AVAXPrice } = useCoinPrice('avalanche-2', 'usd')
  const { price: GGPPrice } = useCoinPrice('rocket-pool', 'usd')
  const { data: avaxAmt } = useGetAVAXStake(address)
  const { data: GGPAmt } = useGetGGPStake(address)

  const avaxValue = avaxAmt * AVAXPrice
  const ggpValue = (GGPAmt - subGGP) * GGPPrice
  const ratio = (ggpValue / avaxValue || 0) * 100

  return { totalValue: avaxValue + ggpValue, avaxValue, ggpValue, ratio }
}
