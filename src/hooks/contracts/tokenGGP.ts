import { utils } from 'ethers'

import { useGetAddress } from '../useStorage'

import TokenGGP from '@/contracts/TokenGGP'

const useTokenGGPContract = () => {
  const { data } = useGetAddress('TokenGGP')

  const contractInterface = new utils.Interface(TokenGGP)

  return {
    address: data,
    contractInterface,
    abi: TokenGGP,
  }
}

export default useTokenGGPContract
