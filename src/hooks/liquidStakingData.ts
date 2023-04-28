import { BigNumber } from 'ethers'

import { useContractRead } from 'wagmi'

import useExchangeRate from './ggexchange'
import { useGetStakerCount } from './useStake'

import useTokenggAVAXContract from '@/hooks/contracts/tokenggAVAX'
import { roundedBigNumber } from '@/utils/numberFormatter'

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

  const apr =
    1 - (ggAvaxExchangeRate instanceof BigNumber ? roundedBigNumber(ggAvaxExchangeRate, 4) : 0)

  const { data: stakerCount } = useGetStakerCount()

  const isLoading = isExchangeRateLoading || isStakingBalanceLoading || isRewardsCycleLengthLoading

  return {
    ggAvaxExchangeRate,
    isLoading,
    rewardsCycleLength,
    totalStakedAVAX,
    apr,
    stakerCount,
  }
}

export default useLiquidStakingData
