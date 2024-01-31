import { utils } from 'ethers'

import { useGetAddress } from '../useStorage'

import TokenggMOVE from '@/contracts/TokenggMOVE'

const useTokenggMOVEContract = () => {
  // TODO: can we add TokenggMOVE to AllContracts?
  const { data } = useGetAddress('TokenggAVAX')

  const contractInterface = new utils.Interface(TokenggMOVE)

  return {
    address: data,
    contractInterface,
    abi: TokenggMOVE,
  }
}

export default useTokenggMOVEContract
