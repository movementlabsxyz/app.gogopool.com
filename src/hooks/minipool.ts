import { BigNumber, Contract } from 'ethers'
import { useState } from 'react'

import { useInterval, useToast } from '@chakra-ui/react'
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit'
import { formatEther } from 'ethers/lib/utils'
import ms from 'ms'
import { useContractRead, useContractWrite, usePrepareContractWrite, useSigner } from 'wagmi'

import useMinipoolManagerContract from './contracts/minipoolManager'

import { HexString } from '@/types/cryptoGenerics'
import type Minipool from '@/types/minipool'
import { nodeIDToHex } from '@/utils'
import { DECODED_ERRORS } from '@/utils/consts'

export interface UseCreateMinipoolParams {
  formattedId: HexString // Node ID formatted as a HexString
  duration: number | string // duration in ms
  amount: BigNumber // amount of tokens to be deposited
  fee?: BigNumber // the fee for the node. Default is 20000, or 2%
}

export const useCreateMinipool = ({
  amount,
  duration,
  fee,
  formattedId,
}: UseCreateMinipoolParams) => {
  const toast = useToast()

  if (!fee) {
    fee = BigNumber.from(20000)
  }

  if (typeof duration === 'string') {
    duration = ms(duration) / 1000
  }

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
    args: [formattedId, BigNumber.from(duration), fee, amount],
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
  offset?: BigNumber
  limit?: BigNumber
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
  limit = BigNumber.from(0), // default to staking minipools
  offset = BigNumber.from(0), // no offset
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

  let convertedID: HexString | undefined
  try {
    convertedID = nodeIDToHex(ID)
  } catch (err) {
    console.warn(err)
  }

  if (!ID || !convertedID) {
    return {
      minipool: undefined,
      isError,
      isLoading,
      error,
    }
  }

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

export const useCancelMinipool = (nodeId: HexString) => {
  const { abi, address } = useMinipoolManagerContract()
  const addRecentTransaction = useAddRecentTransaction()

  const { config, isError: prepareError } = usePrepareContractWrite({
    address,
    abi,
    functionName: 'cancelMinipool',
    args: [nodeId],
    onError(error) {
      console.warn(error)
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

const handleErrors = (error, toast) => {
  Object.keys(DECODED_ERRORS).forEach((key) => {
    if (error?.message.includes(key)) {
      toast({
        position: 'top',
        title: 'Error minipool withdraw',
        description: DECODED_ERRORS[key],
        status: 'error',
        duration: 20000,
        isClosable: true,
      })
    }
  })
}

export const useWithdrawMinipoolFunds = (nodeId: HexString) => {
  const { abi, address } = useMinipoolManagerContract()
  const addRecentTransaction = useAddRecentTransaction()
  const toast = useToast()

  const { config, isError: prepareError } = usePrepareContractWrite({
    address,
    abi,
    functionName: 'withdrawMinipoolFunds',
    args: [nodeId],
    overrides: {
      gasLimit: BigNumber.from('15000000'),
    },
    onError: (err) => handleErrors(err, toast),
    // We dont wanna show the toast during onError because
    // they show on the dashboard, we use the error state
    // to know whether or not to allow the button to be clicked
    // onError(err) {
    // console.warn(err)
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
    // },
  })

  return {
    ...useContractWrite({
      ...config,
      onSuccess(data) {
        addRecentTransaction({
          hash: data.hash,
          description: 'Withdraw minipool funds',
        })
      },
    }),
    prepareError,
  }

  // const write = useContractWrite({
  //   ...config,
  //   async onSuccess(data) {
  //     addRecentTransaction({
  //       hash: data.hash,
  //       description: 'Withdraw minipool funds',
  //     })
  //     setTransactionStatus('success') // Update status on success
  //     onTransactionSuccess({
  //       hash: data.hash,
  //     })
  //   },
  //   onError(err) {
  //     console.warn(err)
  //     setTransactionStatus('error') // Update status on error
  //   },
  // })

  // return { prepareError, ...write, transactionStatus, ready: write?.write !== undefined }
}
