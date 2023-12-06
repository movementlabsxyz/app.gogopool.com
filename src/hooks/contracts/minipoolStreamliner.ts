import { utils } from 'ethers'

import { useNetwork } from 'wagmi'

import { minipoolStreamliner } from '../../constants/contractAddresses'

import MinipoolStreamliner from '@/contracts/MinipoolStreamliner'

const useMinipoolStreamlinerContract = () => {
  const { chain } = useNetwork()
  const data = minipoolStreamliner[chain?.id]

  const contractInterface = new utils.Interface(MinipoolStreamliner)
  return {
    address: data,
    contractInterface,
    abi: MinipoolStreamliner,
  }
}

export default useMinipoolStreamlinerContract
