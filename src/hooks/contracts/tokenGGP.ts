import { utils } from 'ethers'

import { useGetAddress } from '../useStorage'

import TokenGGP from '@/contracts/TokenGGP.json'

const useTokenGGPContract = () => {
  const { data } = useGetAddress('TokenGGP')

  const contractInterface = new utils.Interface(TokenGGP.abi)

  return {
    address: data,
    contractInterface,
    abi: TokenGGP.abi,
  }
}

export default useTokenGGPContract
