import { utils } from 'ethers'

import { useGetAddress } from '../useStorage'

import ProtocolDAO from '@/contracts/ProtocolDAO'

const useProtocolDaoContract = () => {
  const { data } = useGetAddress('ProtocolDAO')
  const contractInterface = new utils.Interface(ProtocolDAO)
  return {
    address: data,
    contractInterface,
    abi: ProtocolDAO,
  }
}

export default useProtocolDaoContract
