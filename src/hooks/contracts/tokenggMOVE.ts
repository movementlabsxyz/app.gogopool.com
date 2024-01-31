import { utils } from 'ethers'

import { useGetAddress } from '../useStorage'

import TokenggMOVE from '@/contracts/TokenggMOVE'

const useTokenggMOVEContract = () => {
  const { data } = useGetAddress('TokenggMOVE')

  const contractInterface = new utils.Interface(TokenggMOVE)

  return {
    address: data,
    contractInterface,
    abi: TokenggMOVE,
  }
}

export default useTokenggMOVEContract
