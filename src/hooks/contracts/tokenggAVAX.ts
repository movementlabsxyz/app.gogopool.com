import { utils } from 'ethers'

import { useGetAddress } from '../useStorage'

import TokenggAVAX from '@/contracts/TokenggAVAX.json'

const useTokenggAVAXContract = () => {
  const { data } = useGetAddress('TokenggAVAX')

  const contractInterface = new utils.Interface(TokenggAVAX.abi)

  return {
    address: data,
    contractInterface,
    abi: TokenggAVAX.abi,
  }
}

export default useTokenggAVAXContract
