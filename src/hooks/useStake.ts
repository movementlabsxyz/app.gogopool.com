import { BigNumber, constants } from 'ethers'
import { useMemo } from 'react'

import { useAddRecentTransaction } from '@rainbow-me/rainbowkit'
import { formatEther, formatUnits } from 'ethers/lib/utils'
import { useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'

import useStakingContract, { useOracleContract } from './contracts/staking'

// approve has to be called first
export const useStakeGGP = (amount: BigNumber) => {
  const { abi, address: stakingAddress } = useStakingContract()
  const addRecentTransaction = useAddRecentTransaction()

  const { config, refetch } = usePrepareContractWrite({
    address: stakingAddress,
    abi,
    functionName: 'stakeGGP',
    args: [amount],
  })

  return {
    refetch,
    ...useContractWrite({
      ...config,
      onSuccess(data) {
        addRecentTransaction({
          hash: data.hash,
          description: `Stake ${formatEther(amount)} GGP`,
        })
      },
    }),
  }
}

export const useWithdrawGGP = (amount: BigNumber) => {
  const { abi, address: stakingAddress } = useStakingContract()
  const addRecentTransaction = useAddRecentTransaction()

  const { config, refetch } = usePrepareContractWrite({
    address: stakingAddress,
    abi,
    functionName: 'withdrawGGP',
    args: [amount],
    enabled: !amount.eq(BigNumber.from(0)),
    onError(error) {
      console.log('error preparing useWithdrawGGP', error)
    },
  })

  return {
    refetch,
    ...useContractWrite({
      ...config,
      onSuccess(data) {
        addRecentTransaction({
          hash: data.hash,
          description: `Withdraw ${formatEther(amount)} GGP`,
        })
      },
    }),
  }
}

export const useSomethingFails = (amount: BigNumber) => {
  const { abi, address: stakingAddress } = useStakingContract()
  const addRecentTransaction = useAddRecentTransaction()

  const { config, error } = usePrepareContractWrite({
    address: stakingAddress,
    abi,
    functionName: 'somethingFails',
    args: [amount],
  })

  console.log('prepare error', error?.message)

  return useContractWrite({
    ...config,
    onSuccess(data) {
      addRecentTransaction({
        hash: data.hash,
        description: `Something fails with ${formatEther(amount)} tokens`,
      })
    },
  })
}

// getAVAXStake
export const useGetAVAXStake = (stakerAddr: string) => {
  const { abi, address: stakingAddress } = useStakingContract()

  const { data, isError, isLoading } = useContractRead({
    address: stakingAddress,
    abi,
    functionName: 'getAVAXStake',
    args: [stakerAddr],
    watch: true,
  })

  return {
    data: data instanceof BigNumber ? Number(formatEther(data || 0)) : 0,
    isLoading,
    isError,
  }
}

// getGGPStake
export const useGetGGPStake = (stakerAddr: string, watch = true) => {
  const { abi, address } = useStakingContract()

  const { data, error, isError, isLoading } = useContractRead({
    address,
    abi,
    functionName: 'getGGPStake',
    args: [stakerAddr],
    watch,
    onError(error) {
      console.log('error in useGetGGPSTake', error)
    },
  })

  return {
    data: data instanceof BigNumber ? Number(formatEther(data || 0)) : 0,
    isLoading,
    isError,
    error,
  }
}

// getAVAXAssigned
export const useGetAVAXAssigned = (stakerAddr: string, watch = true) => {
  const { abi, address } = useStakingContract()

  const { data, error, isError, isLoading } = useContractRead({
    address,
    abi,
    functionName: 'getAVAXAssigned',
    args: [stakerAddr],
    watch,
  })

  return {
    data: data instanceof BigNumber ? Number(formatEther(data || 0)) : 0,
    isLoading,
    isError,
    error,
  }
}

// getGGPPrice
export const useGetGGPPrice = (watch = true) => {
  const { abi, address } = useOracleContract()

  const { data, error, isError, isLoading } = useContractRead({
    address,
    abi,
    functionName: 'getGGPPriceInAVAX',
    args: [],
    watch,
  })

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore -___-
  const price = data?.price ?? 0

  return useMemo(
    () => ({
      data: Number(formatEther(price)),
      isLoading,
      isError,
      error,
    }),
    [error, isError, isLoading, price],
  )
}

// getCollateralizationRatio
export const useGetCollateralizationRatio = (stakerAddr: string, watch = true) => {
  const { abi, address } = useStakingContract()

  const { data, error, isError, isLoading } = useContractRead({
    address,
    abi,
    functionName: 'getCollateralizationRatio',
    args: [stakerAddr],
    watch,
  })

  const result =
    data instanceof BigNumber
      ? data.eq(constants.MaxUint256)
        ? Infinity
        : Number(formatUnits(data, 18)) * 100
      : 0

  return {
    data: result,
    isLoading,
    isError,
    error,
  }
}

export const useGetEffectiveRewardsRatio = (stakerAddr: string, watch = true) => {
  const { abi, address } = useStakingContract()
  const { data, error, isError, isLoading } = useContractRead({
    address,
    abi,
    functionName: 'getEffectiveRewardsRatio',
  })

  const result =
    data instanceof BigNumber
      ? data.eq(constants.MaxUint256)
        ? Infinity
        : Number(formatUnits(data, 18)) * 100
      : 0

  return {
    data: result,
    isLoading,
    isError,
    error,
  }
}

export const useGetEffectiveGGPStaked = (stakerAddr: string, watch = true) => {
  const { abi, address } = useStakingContract()
  const { data, error, isError, isLoading } = useContractRead({
    address,
    abi,
    functionName: 'getEffectiveGGPStaked',
  })

  const result =
    data instanceof BigNumber
      ? data.eq(constants.MaxUint256)
        ? Infinity
        : Number(formatUnits(data, 18)) * 100
      : 0

  return {
    data: result,
    isLoading,
    isError,
    error,
  }
}

export const useGetTotalGGPStake = (watch = true) => {
  const { abi, address } = useStakingContract()

  return useContractRead({
    address,
    abi,
    functionName: 'getTotalGGPStake',
    watch,
  })
}

export const useGetStakerCount = () => {
  const { abi, address } = useStakingContract()

  return useContractRead({
    address,
    abi,
    functionName: 'getStakerCount',
  })
}

export const useRequireValidStaker = (stakerAddr: string) => {
  const { abi, address } = useStakingContract()

  return useContractRead({
    address,
    abi,
    functionName: 'requireValidStaker',
    args: [stakerAddr],
  })
}

export const useGetGGPRewards = (stakerAddr: string, watch = true) => {
  const { abi, address } = useStakingContract()

  return useContractRead({
    address,
    abi,
    functionName: 'getGGPRewards',
    args: [stakerAddr],
    watch,
  })
}

export const useGetMinipoolCount = (stakerAddr: string) => {
  const { abi, address } = useStakingContract()

  return useContractRead({
    address,
    abi,
    functionName: 'getMinipoolCount',
    args: [stakerAddr],
  })
}
