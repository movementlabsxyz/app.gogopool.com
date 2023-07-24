import { utils } from 'ethers'

import { useGetAddress } from '../useStorage'

import MinipoolManager from '@/contracts/MinipoolManager'

const useMinipoolManagerContract = () => {
  const { data } = useGetAddress('MinipoolManager')

  const contractInterface = new utils.Interface(MinipoolManager)

  return {
    address: data,
    contractInterface,
    abi: MinipoolManager,
  }
}

export default useMinipoolManagerContract
