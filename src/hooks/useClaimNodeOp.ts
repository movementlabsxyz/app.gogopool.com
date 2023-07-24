import { BigNumber } from 'ethers'

import { useToast } from '@chakra-ui/react'
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit'
import { formatEther } from 'ethers/lib/utils'
import { useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'

import useClaimNodeOpContract from './contracts/claimNodeOp'

import { HexString } from '@/types/cryptoGenerics'
import { DECODED_ERRORS } from '@/utils/consts'

export const useIsEligible = (owner: HexString) => {
  const { abi, address } = useClaimNodeOpContract()

  return useContractRead({
    address,
    abi,
    functionName: 'isEligible',
    args: [owner],
  })
}

export const useClaimAndRestake = (owner: `0x${string}`, claimAmount: BigNumber) => {
  const addRecentTransaction = useAddRecentTransaction()
  const { abi, address } = useClaimNodeOpContract()
  const toast = useToast()

  const { config } = usePrepareContractWrite({
    address,
    abi,
    functionName: 'claimAndRestake',
    args: [claimAmount],
    enabled: !claimAmount.eq(BigNumber.from(0)),
    onError(error) {
      Object.keys(DECODED_ERRORS).forEach((key) => {
        if (error?.message.includes(key)) {
          toast({
            position: 'top',
            title: 'Error during claim and restake',
            description: DECODED_ERRORS[key],
            status: 'error',
            duration: 20000,
            isClosable: true,
          })
        }
      })
    },
  })

  return useContractWrite({
    ...config,
    onSuccess(data) {
      addRecentTransaction({
        hash: data.hash,
        description: `Claim and restake ${formatEther(claimAmount)} tokens`,
      })
    },
  })
}
