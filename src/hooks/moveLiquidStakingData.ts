import { useContractRead } from 'wagmi'

import useExchangeRate from './ggexchange'
import { useGetStakerCount } from './useStake'

import useTokenggMOVEContract from '@/hooks/contracts/tokenggMOVE'

// gets the liquid staking statistics from the contract
const useLiquidStakingData = () => {
  const { abi: ggMOVEInterface, address: ggMOVEAddr } = useTokenggMOVEContract()

  const { data: ggAvaxExchangeRate, isLoading: isExchangeRateLoading } = useExchangeRate()

  const { data: totalStakedMOVE, isLoading: isStakingBalanceLoading } = useContractRead({
    address: ggMOVEAddr,
    abi: ggMOVEInterface,
    functionName: 'totalReleasedAssets',
  })

  const { data: rewardsCycleLength, isLoading: isRewardsCycleLengthLoading } = useContractRead({
    address: ggMOVEAddr,
    abi: ggMOVEInterface,
    functionName: 'rewardsCycleLength',
    watch: true,
  })

  const { data: stakerCount } = useGetStakerCount()

  const isLoading = isExchangeRateLoading || isStakingBalanceLoading || isRewardsCycleLengthLoading

  return {
    ggAvaxExchangeRate,
    isLoading,
    rewardsCycleLength,
    totalStakedMOVE,
    stakerCount,
  }
}

export default useLiquidStakingData
