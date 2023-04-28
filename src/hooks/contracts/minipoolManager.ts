import { utils } from 'ethers'

import { useGetAddress } from '../useStorage'

import MinipoolManager from '@/contracts/MinipoolManager.json'

const useMinipoolManagerContract = () => {
  const { data } = useGetAddress('MinipoolManager')

  const contractInterface = new utils.Interface(MinipoolManager.abi)

  return {
    address: data,
    contractInterface,
    abi: MinipoolManager.abi,
  }
}

export default useMinipoolManagerContract
