import { utils } from 'ethers'

import { useGetAddress } from '../useStorage'

import TokenggAVAX from '@/contracts/TokenggAVAX'

const useTokenggAVAXContract = () => {
  const { data } = useGetAddress('TokenggAVAX')

  const contractInterface = new utils.Interface(TokenggAVAX)

  return {
    address: data,
    contractInterface,
    abi: TokenggAVAX,
  }
}

export default useTokenggAVAXContract
