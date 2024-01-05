import { utils } from 'ethers'

import { useNetwork } from 'wagmi'

import { oonodzNodeIdNFT } from '../../constants/contractAddresses'

import OonodzNodeIdNFT from '@/contracts/OonodzNodeIdNFT'

const useOonodzNodeIdNFT = () => {
  const { chain } = useNetwork()
  const data = oonodzNodeIdNFT[chain?.id]
  const contractInterface = new utils.Interface(OonodzNodeIdNFT)
  return {
    address: data,
    contractInterface,
    abi: OonodzNodeIdNFT,
  }
}

export default useOonodzNodeIdNFT
