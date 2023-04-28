import { BigNumber, BigNumberish } from 'ethers'

import { useAddRecentTransaction } from '@rainbow-me/rainbowkit'
import { formatEther } from 'ethers/lib/utils'
import { useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'

import useClaimNodeOpContract from './contracts/claimNodeOp'

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

  console.log('claimamount passed int', claimAmount)
  const { config } = usePrepareContractWrite({
    address,
    abi,
    functionName: 'claimAndRestake',
    args: [claimAmount],
    enabled: !claimAmount.eq(BigNumber.from(0)),
    onError(error) {
      console.log('error preparing claimAndRestake', error)
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
