import { useContractRead } from 'wagmi'

import useExchangeRate from './ggexchange'
import { useGetStakerCount } from './useStake'

import useTokenggAVAXContract from '@/hooks/contracts/tokenggAVAX'

// gets the liquid staking statistics from the contract
const useLiquidStakingData = () => {
  const { abi: ggAVAXInterface, address: ggAVAXAddr } = useTokenggAVAXContract()

  const { data: ggAvaxExchangeRate, isLoading: isExchangeRateLoading } = useExchangeRate()

  const { data: totalStakedAVAX, isLoading: isStakingBalanceLoading } = useContractRead({
    address: ggAVAXAddr,
    abi: ggAVAXInterface,
    functionName: 'totalReleasedAssets',
  })

  const { data: rewardsCycleLength, isLoading: isRewardsCycleLengthLoading } = useContractRead({
    address: ggAVAXAddr,
    abi: ggAVAXInterface,
    functionName: 'rewardsCycleLength',
    watch: true,
  })

  const { data: stakerCount } = useGetStakerCount()

  const isLoading = isExchangeRateLoading || isStakingBalanceLoading || isRewardsCycleLengthLoading

  return {
    ggAvaxExchangeRate,
    isLoading,
    rewardsCycleLength,
    totalStakedAVAX,
    stakerCount,
  }
}

export default useLiquidStakingData
