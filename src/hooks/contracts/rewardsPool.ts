import { utils } from 'ethers'

import { useGetAddress } from '../useStorage'

import RewardsPool from '@/contracts/RewardsPool'

const useRewardsPoolContract = () => {
  const { data } = useGetAddress('RewardsPool')
  const contractInterface = new utils.Interface(RewardsPool)
  return {
    address: data,
    contractInterface,
    abi: RewardsPool,
  }
}

export default useRewardsPoolContract
