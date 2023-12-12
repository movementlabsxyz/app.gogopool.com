import { BigNumber, ethers } from 'ethers'

import { useToast } from '@chakra-ui/react'
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit'
import { formatEther } from 'ethers/lib/utils'
import { useContractWrite, useNetwork, usePrepareContractWrite } from 'wagmi'

import useMinipoolStreamlinerContract from './contracts/minipoolStreamliner'

import { HexString } from '@/types/cryptoGenerics'
import { nodeHexToID } from '@/utils'
import { DECODED_ERRORS } from '@/utils/consts'

export interface StreamlinedMinipool {
  nodeID: HexString // Node ID formatted as a HexString
  duration: BigNumber
  countryOfResidence: number
  avaxForMinipool: BigNumber
  avaxForGGP: BigNumber
  minGGPAmountOut: BigNumber
  avaxForNodeRental: BigNumber
  minUSDCAmountOut: BigNumber
  bestRate: boolean
  withdrawalRightWaiver: boolean
}

const handleErrors = (error, toast) => {
  Object.keys(DECODED_ERRORS).forEach((key) => {
    if (error?.message.includes(key)) {
      toast({
        position: 'top',
        title: 'Error during streamlined minipool creation',
        description: DECODED_ERRORS[key],
        status: 'error',
        duration: 20000,
        isClosable: true,
      })
    }
  })
}

export const useCreateStreamlinedMinipool = (
  newMinipool: StreamlinedMinipool,
  onTransactionSuccess: (transactionData: { nodeID: string; hash: string }) => void,
) => {
  const { avaxForGGP, avaxForMinipool, avaxForNodeRental } = newMinipool
  const { chain } = useNetwork()
  const toast = useToast()
  const addRecentTransaction = useAddRecentTransaction()
  const { abi, address } = useMinipoolStreamlinerContract()

  const amountBeingSent =
    chain?.id == null ? 0 : avaxForMinipool.add(avaxForNodeRental).add(avaxForGGP)

  const { config, error } = usePrepareContractWrite({
    address,
    abi,
    onError: (err) => handleErrors(err, toast),
    functionName: 'createStreamlinedMinipool',
    args: [newMinipool],
    overrides: {
      value: amountBeingSent,
      gasLimit: BigNumber.from('15000000'),
    },
  })

  const resp = useContractWrite({
    ...config,
    async onSuccess(data) {
      const receipt = await data.wait() // wait for the transaction to be mined
      const eventTopic = new ethers.utils.Interface(abi).getEventTopic('NewStreamlinedMinipoolMade')
      const event = receipt.logs.find((log) => log.topics[0] === eventTopic)
      const decodedEvent = new ethers.utils.Interface(abi).decodeEventLog(
        'NewStreamlinedMinipoolMade',
        event.data,
      )
      const nodeID = nodeHexToID(decodedEvent.nodeID)

      onTransactionSuccess({
        nodeID: nodeID,
        hash: data.hash,
      })

      addRecentTransaction({
        hash: data.hash,
        description: `Create minipool with ${formatEther(amountBeingSent)}`,
      })
    },
  })

  return {
    ...resp,
    error,
    ready: resp?.write !== undefined,
  }
}
