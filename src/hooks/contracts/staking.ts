import { utils } from 'ethers'

import { useGetAddress } from '../useStorage'

import Oracle from '@/contracts/Oracle'
import Staking from '@/contracts/Staking'

const useStakingContract = () => {
  const { data } = useGetAddress('Staking')

  const contractInterface = new utils.Interface(Staking)

  return {
    address: data,
    contractInterface,
    abi: Staking,
  }
}

export default useStakingContract

export const useOracleContract = () => {
  const { data } = useGetAddress('Oracle')

  const contractInterface = new utils.Interface(Oracle)

  return {
    address: data,
    contractInterface,
    abi: Oracle,
  }
}
