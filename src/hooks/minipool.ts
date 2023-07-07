import { BigNumber, Contract, utils } from 'ethers'
import { useState } from 'react'

import { useInterval, useToast } from '@chakra-ui/react'
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit'
import * as Sentry from '@sentry/nextjs'
import { formatEther } from 'ethers/lib/utils'
import ms from 'ms'
import { useContractRead, useContractWrite, usePrepareContractWrite, useSigner } from 'wagmi'

import useMinipoolManagerContract from './contracts/minipoolManager'

import type Minipool from '@/types/minipool'
import { nodeID } from '@/utils'
import { DECODED_ERRORS } from '@/utils/consts'

export interface UseCreateMinipoolParams {
  nodeId: string // node ID as input by the user
  duration: number | string // duration in ms
  amount: BigNumber | number | string // amount of tokens to be deposited
  fee?: BigNumber // the fee for the node. Default is 20000, or 2%
}

export const useCreateMinipool = ({ amount, duration, fee, nodeId }: UseCreateMinipoolParams) => {
  const toast = useToast()

  if (!fee) {
    fee = BigNumber.from(20000)
  }

  if (typeof duration === 'string') {
    duration = ms(duration) / 1000
  }

  if (typeof amount === 'number') {
    amount = BigNumber.from(amount)
  } else if (typeof amount === 'string') {
    amount = utils.parseEther(amount)
  }

  const formattedID = nodeID(nodeId)

  const addRecentTransaction = useAddRecentTransaction()
  const { abi, address } = useMinipoolManagerContract()

  const { config, error } = usePrepareContractWrite({
    address,
    abi,
    onError(error) {
      Object.keys(DECODED_ERRORS).forEach((key) => {
        if (error?.message.includes(key)) {
          toast({
            position: 'top',
            title: 'Error during minipool creation',
            description: DECODED_ERRORS[key],
            status: 'error',
            duration: 20000,
            isClosable: true,
          })
        }
      })
    },
    functionName: 'createMinipool',
    args: [formattedID, BigNumber.from(duration), fee, amount],
    overrides: {
      value: amount,
    },
  })

  const resp = useContractWrite({
    ...config,

    onSuccess(data) {
      addRecentTransaction({
        hash: data.hash,
        description: `Create minipool with ${formatEther(amount)}`,
      })
    },
  })

  return {
    ...resp,
    error,
    ready: resp?.write !== undefined,
  }
}

export interface UseMinipoolsByStatusParams {
  status?: number
  offset?: number
  limit?: number
}

export const useAllMinipools = (interval = 3000) => {
  const [minipools, setMinipools] = useState<Minipool[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { data: signer, isLoading: signerLoading } = useSigner()

  const { address, contractInterface } = useMinipoolManagerContract()

  useInterval(async () => {
    if (!signer || !address) {
      return
    }
    try {
      const c = new Contract(address, contractInterface, signer)
      // statuses are 0 to 6 inclusive
      const statuses = [0, 1, 2, 3, 4, 5, 6]
      const promises = statuses.map((status) => c.getMinipools(status, 0, 0))
      const results = await Promise.all(promises)
      // flatten the array of arrays
      const flattened = [].concat(...results)
      setMinipools(flattened)
      setLoading(false)
    } catch (e) {
      setError(e)
      setLoading(false)
    }
  }, interval)

  return {
    minipools,
    isLoading: signerLoading || loading,
    isError: !!error,
    error,
  }
}

export const useMinipoolsByStatus = ({
  limit = 0, // default to staking minipools
  offset = 0, // no offset
  status = 2, // get all matching ones, no pagination
}: UseMinipoolsByStatusParams) => {
  const { abi, address } = useMinipoolManagerContract()

  const resp = useContractRead({
    address,
    abi,
    functionName: 'getMinipools',
    args: [status, offset, limit],
  })

  return resp
}

export const useMinipoolByID = (ID: string | undefined) => {
  const { error, isError, isLoading, minipools } = useAllMinipools()

  if (!ID) {
    return {
      minipool: undefined,
      isError,
      isLoading,
      error,
    }
  }

  const convertedID = nodeID(ID)

  return {
    minipool: minipools.find((m) => m.nodeID === convertedID),
    isLoading,
    isError,
    error,
  }
}

export const useMinipoolsByOwner = (address: string | undefined) => {
  const { error, isError, isLoading, minipools } = useAllMinipools()

  if (!address) {
    return {}
  }

  return {
    minipools: minipools.filter((minipool) => minipool?.owner === address),
    isError,
    isLoading,
    error,
  }
}

export const useCancelMinipool = (nodeId: string) => {
  const { abi, address } = useMinipoolManagerContract()
  const addRecentTransaction = useAddRecentTransaction()

  const { config, isError: prepareError } = usePrepareContractWrite({
    address,
    abi,
    functionName: 'cancelMinipool',
    args: [nodeId],
    onError(error) {
      Sentry.captureException(error)

      // Object.keys(DECODED_ERRORS).forEach((key) => {
      //   if (error?.message.includes(key)) {
      //     toast({
      //       position: 'top',
      //       title: 'Error during minipool cancel',
      //       description: DECODED_ERRORS[key],
      //       status: 'error',
      //       duration: 20000,
      //       isClosable: true,
      //     })
      //   }
      // })
    },
  })

  const write = useContractWrite({
    ...config,
    onSuccess(data) {
      addRecentTransaction({
        hash: data.hash,
        description: 'Cancel minipool',
      })
    },
  })

  return { prepareError, ...write }
}

export const useWithdrawMinipoolFunds = (nodeId: string) => {
  const { abi, address } = useMinipoolManagerContract()
  const addRecentTransaction = useAddRecentTransaction()
  // const toast = useToast()

  const { config, isError: prepareError } = usePrepareContractWrite({
    address,
    abi,
    functionName: 'withdrawMinipoolFunds',
    args: [nodeId],
    // We dont wanna show the toast during onError because
    // they show on the dashboard, we use the error state
    // to know whether or not to allow the button to be clicked
    onError() {
      // Object.keys(DECODED_ERRORS).forEach((key) => {
      //   if (error?.message.includes(key)) {
      //     toast({
      //       position: 'top',
      //       title: 'Error during withdraw minipool funds',
      //       description: DECODED_ERRORS[key],
      //       status: 'error',
      //       duration: 20000,
      //       isClosable: true,
      //     })
      //   }
      // })
    },
  })

  const write = useContractWrite({
    ...config,
    onSuccess(data) {
      addRecentTransaction({
        hash: data.hash,
        description: 'Withdraw minipool funds',
      })
    },
  })

  return { prepareError, ...write }
}
