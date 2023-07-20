import { utils } from 'ethers'

import { useGetAddress } from '../useStorage'

import ClaimNodeOp from '@/contracts/ClaimNodeOp'

const useClaimNodeOp = () => {
  const { data } = useGetAddress('ClaimNodeOp')
  const contractInterface = new utils.Interface(ClaimNodeOp)
  return {
    address: data,
    contractInterface,
    abi: ClaimNodeOp,
  }
}

export default useClaimNodeOp
