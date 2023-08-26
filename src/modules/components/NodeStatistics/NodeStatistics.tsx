import { BigNumber, utils } from 'ethers'
import { FunctionComponent, ReactElement } from 'react'

import { Box, Skeleton, Stack, Text } from '@chakra-ui/react'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import ms from 'ms'

import { Address } from '@/common/components/Address'
import { Title } from '@/common/components/Card'
import { useAllMinipools } from '@/hooks/minipool'
import Minipool, { MinipoolKeys, displayName } from '@/types/minipool'

export interface StatsProps {
  address?: string
  nodeID?: string
}
const formatData = (
  input: Minipool,
): { label: string | ReactElement; value: string | ReactElement }[] => {
  if (!input) {
    return []
  }
  const keys = Object.keys(input)
  return keys
    .filter((key) => {
      if (key.toLowerCase().includes('time')) {
        return false
      }
      return Number.isNaN(Number(key))
    })
    .map((key) => {
      const value = input[key]
      if (key === 'duration') {
        return {
          label: displayName(key as MinipoolKeys),
          value: ms(value * 1000, { long: true }),
        }
      }
      if (key === 'delegationFee') {
        const fee = value as unknown as BigNumber
        return {
          label: displayName(key as MinipoolKeys),
          value: fee.div(10000).toString() + '%',
        }
      }

      if (key === 'status') {
        const status = value as unknown as BigNumber
        return {
          label: displayName(key as MinipoolKeys),
          value: status.toString(),
        }
      }

      if (BigNumber.isBigNumber(value)) {
        return {
          label: displayName(key as MinipoolKeys),
          value: utils.formatEther(value),
        }
      }

      if (value?.toLowerCase().startsWith('0x')) {
        return {
          label: displayName(key as MinipoolKeys),
          value: (
            <Address copyable={true} fontWeight="bold" truncate={true}>
              {value}
            </Address>
          ),
        }
      }

      if (typeof value === 'string') {
        return { label: displayName(key as MinipoolKeys), value }
      }

      return {
        label: displayName(key as MinipoolKeys),
        value: value.toString(),
      }
    })
}

export const Statistics: FunctionComponent<StatsProps> = () => {
  const { openConnectModal } = useConnectModal()

  const { isLoading, minipools } = useAllMinipools()

  const skeletons = Array.from({ length: 10 }, (_, i) => (
    <Skeleton endColor="blue.200" height="18px" key={i} maxWidth="500px" width="100%" />
  ))

  if (openConnectModal) {
    return (
      <Text>
        <button className="underline" onClick={openConnectModal} type="button">
          Connect your wallet
        </button>{' '}
        to view details
      </Text>
    )
  }

  if (isLoading) {
    return (
      <Box gap="0.25rem" width="100%">
        <Stack gap={1}>{skeletons}</Stack>
      </Box>
    )
  }

  if (minipools.length === 0) {
    return (
      <Box gap="0.25rem" width="500px">
        <Text color="grey.600" display="flex" flexDir="row" size="sm">
          No minipools found.
        </Text>
      </Box>
    )
  }

  const data = formatData(minipools[0])

  return (
    <div className="overflow-hidden">
      <Title fontSize={20}>Node details</Title>
      <dl>
        {data.map(({ label, value }, index) => (
          <div
            className={`${
              index % 2 ? 'bg-gray-50' : 'bg-white'
            } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
            key={index}
          >
            <dt className="text-sm font-medium text-gray-500">{label}</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
