import { BigNumber, constants } from 'ethers'
import { useMemo } from 'react'

import { useToast } from '@chakra-ui/react'
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit'
import * as Sentry from '@sentry/nextjs'
import { formatEther, formatUnits } from 'ethers/lib/utils'
import { useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'

import useMinipoolManagerContract from './contracts/minipoolManager'
import useStakingContract, { useOracleContract } from './contracts/staking'

import { HexString } from '@/types/cryptoGenerics'
import { DECODED_ERRORS } from '@/utils/consts'

// approve has to be called first
export const useStakeGGP = (amount: BigNumber) => {
  const { abi, address: stakingAddress } = useStakingContract()
  const addRecentTransaction = useAddRecentTransaction()
  const toast = useToast()

  const { config, refetch } = usePrepareContractWrite({
    address: stakingAddress,
    abi,
    enabled: !amount.eq(BigNumber.from(0)),
    functionName: 'stakeGGP',
    args: [amount],
    onError(error) {
      Sentry.captureException(error)

      Object.keys(DECODED_ERRORS).forEach((key) => {
        if (error?.message.includes(key)) {
          toast({
            position: 'top',
            title: 'Error during stake of GGP',
            description: DECODED_ERRORS[key],
            status: 'error',
            duration: 20000,
            isClosable: true,
          })
        }
      })
    },
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
      onError(error) {
        Sentry.captureException(error)
      },
    }),
  }
}

export const useWithdrawGGP = (amount: BigNumber) => {
  const { abi, address: stakingAddress } = useStakingContract()
  const addRecentTransaction = useAddRecentTransaction()
  const toast = useToast()

  const { config, refetch } = usePrepareContractWrite({
    address: stakingAddress,
    abi,
    functionName: 'withdrawGGP',
    args: [amount],
    enabled: !amount.eq(BigNumber.from(0)),
    onError(error) {
      Object.keys(DECODED_ERRORS).forEach((key) => {
        if (error?.message.includes(key)) {
          toast({
            position: 'top',
            title: 'Error during withdraw GGP',
            description: DECODED_ERRORS[key],
            status: 'error',
            duration: 20000,
            isClosable: true,
          })
        }
      })
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

// getAVAXStake
export const useGetAVAXStake = (stakerAddr: HexString) => {
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
export const useGetGGPStake = (stakerAddr: HexString, watch = true) => {
  const { abi, address } = useStakingContract()

  const { data, error, isError, isLoading } = useContractRead({
    address,
    abi,
    functionName: 'getGGPStake',
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

// getAVAXAssigned
export const useGetAVAXAssigned = (stakerAddr: HexString, watch = true) => {
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
export const useGetCollateralizationRatio = (stakerAddr: HexString, watch = true) => {
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

export const useGetEffectiveRewardsRatio = () => {
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

export const useGetEffectiveGGPStaked = () => {
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

export const useRequireValidStaker = (stakerAddr: HexString) => {
  const { abi, address } = useStakingContract()

  return useContractRead({
    address,
    abi,
    functionName: 'requireValidStaker',
    args: [stakerAddr],
  })
}

export const useGetGGPRewards = (stakerAddr: HexString, watch = true) => {
  const { abi, address } = useStakingContract()

  return useContractRead({
    address,
    abi,
    functionName: 'getGGPRewards',
    args: [stakerAddr],
    watch,
  })
}

export const useGetMinipoolCount = () => {
  const { abi, address } = useMinipoolManagerContract()

  return useContractRead({
    address,
    abi,
    functionName: 'getMinipoolCount',
  })
}
