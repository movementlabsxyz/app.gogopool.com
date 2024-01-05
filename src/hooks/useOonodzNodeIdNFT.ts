import { useContractRead } from 'wagmi'

import { nodeHexToID, nodeIDRemovePrefix } from '../utils/index'
import useOonodzNodeIdNFT from './contracts/oonodzNodeIdNFT'

import { HexString } from '@/types/cryptoGenerics'

export const useIsNodeIdActive = (nodeID: HexString, watch = true) => {
  const { abi, address } = useOonodzNodeIdNFT()

  let nodeIDString = nodeHexToID(nodeID)
  nodeIDString = nodeIDRemovePrefix(nodeIDString)

  const { data, error, isError, isLoading } = useContractRead({
    address,
    abi,
    functionName: 'isNodeIdActive',
    args: [nodeIDString],
    watch,
  })

  // Extract the values from the data array
  const isRegistered = data && data.length > 0 ? data[0] : null
  const isRunning = data && data.length > 0 ? data[1] : null
  return {
    data: { isRegistered, isRunning },
    isLoading,
    isError,
    error,
  }
}
