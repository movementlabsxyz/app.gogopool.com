import { BigNumber, constants } from 'ethers'
import { useMemo } from 'react'

import { useToast } from '@chakra-ui/react'
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit'
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
    enabled: !amount.eq(0),
    functionName: 'stakeGGP',
    args: [amount],
    onError(error) {
      console.warn(error)
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
        console.warn(error)
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
    enabled: !amount.eq(0),
    onError(error) {
      Object.keys(DECODED_ERRORS).forEach((key) => {
        if (error?.message.includes(key)) {
          toast({
            position: 'top',
            title: 'Error during withdraw GGP',
            description: DECODED_ERRORS[key],
            status: 'error',
            duration: 3000,
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
    data: data ? data : BigNumber.from(0),
    isLoading,
    isError,
  }
}

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
    data: data ? data : BigNumber.from(0),
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
    data: data ? data : BigNumber.from(0),
    isLoading,
    isError,
    error,
  }
}

// getAVAXValidating
export const useGetAVAXValidating = (stakerAddr: HexString, watch = true) => {
  const { abi, address } = useStakingContract()

  const { data, error, isError, isLoading } = useContractRead({
    address,
    abi,
    functionName: 'getAVAXValidating',
    args: [stakerAddr],
    watch,
  })

  return {
    data: data ? data : BigNumber.from(0),
    isLoading,
    isError,
    error,
  }
}

// getAVAXValidatingHighWater
export const useGetAVAXValidatingHighWater = (stakerAddr: HexString, watch = true) => {
  const { abi, address } = useStakingContract()

  const { data, error, isError, isLoading } = useContractRead({
    address,
    abi,
    functionName: 'getAVAXValidatingHighWater',
    args: [stakerAddr],
    watch,
  })

  return {
    data: data ? data : BigNumber.from(0),
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

  return useMemo(
    () => ({
      data: data?.price ? data.price : BigNumber.from(0),
      isLoading,
      isError,
      error,
    }),
    [error, isError, isLoading, data?.price],
  )
}

// getCollateralizationRatio
export const useGetContractCollateralizationRatio = (stakerAddr: HexString, watch = true) => {
  const { abi, address } = useStakingContract()

  const { data, error, isError, isLoading } = useContractRead({
    address,
    abi,
    functionName: 'getCollateralizationRatio',
    args: [stakerAddr],
    watch,
  })

  return {
    data: data ? data : BigNumber.from(0),
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

export const useRewardStartTime = (stakerAddr: HexString) => {
  const { abi, address } = useStakingContract()

  return useContractRead({
    address,
    abi,
    functionName: 'getRewardsStartTime',
    args: [stakerAddr],
  })
}
