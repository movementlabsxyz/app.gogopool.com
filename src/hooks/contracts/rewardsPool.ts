import { utils } from 'ethers'

import { useGetAddress } from '../useStorage'

import RewardsPool from '@/contracts/RewardsPool.json'

const useRewardsPoolContract = () => {
  const { data } = useGetAddress('RewardsPool')
  const contractInterface = new utils.Interface(RewardsPool.abi)
  return {
    address: data,
    contractInterface,
    abi: RewardsPool.abi,
  }
}

export default useRewardsPoolContract
