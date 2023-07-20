import { useContractRead } from 'wagmi'

import useProtocolDaoContract from './contracts/protocolDAO'
import useRewardsPoolContract from './contracts/rewardsPool'

// this gets the start time of the last interval
// If we have gone past an interval and someone calls syncRewards
// then we start the new period
export const useRewardCycleStartTime = (watch = true) => {
  const { abi, address } = useRewardsPoolContract()

  return useContractRead({
    address,
    abi,
    functionName: 'getRewardsCycleStartTime',
    watch,
  })
}

export const useGetRewardCycleLength = (watch = true) => {
  const { abi, address } = useProtocolDaoContract()

  return useContractRead({
    address,
    abi,
    functionName: 'getRewardsCycleSeconds',
    watch,
  })
}
