import { utils } from 'ethers'

import { useGetAddress } from '../useStorage'

import ClaimNodeOp from '@/contracts/ClaimNodeOp.json'

const useClaimNodeOp = () => {
  const { data } = useGetAddress('ClaimNodeOp')
  const contractInterface = new utils.Interface(ClaimNodeOp.abi)
  return {
    address: data,
    contractInterface,
    abi: ClaimNodeOp.abi,
  }
}

export default useClaimNodeOp
