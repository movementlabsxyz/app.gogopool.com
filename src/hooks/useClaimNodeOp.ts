import { BigNumber, BigNumberish } from 'ethers'

import { useAddRecentTransaction } from '@rainbow-me/rainbowkit'
import { formatEther } from 'ethers/lib/utils'
import { useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'

import useClaimNodeOpContract from './contracts/claimNodeOp'
import { DECODED_ERRORS } from '@/utils/consts'
import { useToast } from '@chakra-ui/react'

export const usePreviewCalculateAndDistributeRewards = (
  ownerAddress: string,
  totalGgpStaked: BigNumberish,
  watch = true,
) => {
  const { abi, address: contractAddress } = useClaimNodeOpContract()

  return useContractRead({
    address: contractAddress,
    abi,
    functionName: 'previewCalculateAndDistributeRewards',
    args: [ownerAddress, totalGgpStaked],
    watch,
  })
}

export const useIsEligible = (owner: string) => {
  const { abi, address } = useClaimNodeOpContract()

  return useContractRead({
    address,
    abi,
    functionName: 'isEligible',
    args: [owner],
  })
}

export const usePreviewClaimAmount = (owner: `0x${string}`) => {
  const { abi, address } = useClaimNodeOpContract()

  return useContractRead({
    address,
    abi,
    functionName: 'previewClaimAmount',
    overrides: { from: owner },
    onError(error) {
      console.log('error preparing previewClaimAmount', error)
    },
  })
}

export const useClaimAndRestake = (owner: `0x${string}`, claimAmount: BigNumber) => {
  const addRecentTransaction = useAddRecentTransaction()
  const { abi, address } = useClaimNodeOpContract()
  const toast = useToast()

  console.log('claimamount passed int', claimAmount)
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
