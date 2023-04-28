import { utils } from 'ethers'

import { useGetAddress } from '../useStorage'

import Oracle from '@/contracts/Oracle.json'
import Staking from '@/contracts/Staking.json'

const useStakingContract = () => {
  const { data } = useGetAddress('Staking')

  const contractInterface = new utils.Interface(Staking.abi)

  return {
    address: data,
    contractInterface,
    abi: Staking.abi,
  }
}

export default useStakingContract

export const useOracleContract = () => {
  const { data } = useGetAddress('Oracle')

  const contractInterface = new utils.Interface(Oracle.abi)

  return {
    address: data,
    contractInterface,
    abi: Oracle.abi,
  }
}
