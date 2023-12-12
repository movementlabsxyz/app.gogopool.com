import { utils } from 'ethers'

import { useNetwork } from 'wagmi'

import { oonodzWrapper } from '../../constants/contractAddresses'

import Wrapper from '@/contracts/OonodzWrapper'

const useOonodzWrapper = () => {
  const { chain } = useNetwork()
  const data = oonodzWrapper[chain?.id]
  const contractInterface = new utils.Interface(Wrapper)
  return {
    address: data,
    contractInterface,
    abi: Wrapper,
  }
}

export default useOonodzWrapper
