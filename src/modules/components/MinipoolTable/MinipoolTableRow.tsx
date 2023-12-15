import { BigNumber } from 'ethers'
import { FunctionComponent, useMemo } from 'react'

import { CopyIcon } from '@chakra-ui/icons'
import { Box, Flex, Td, Text, Tr, useToast } from '@chakra-ui/react'
import { formatUnits } from 'ethers/lib/utils.js'

import CancelButton from './CancelButton'
import ErrorButton from './ErrorButton'
import StakingButton from './StakingButton'
import { TableBadge } from './TableBadge'
import WithdrawButton from './WithdrawButton'

import { Tooltip } from '@/common/components/Tooltip'
import { useMinipoolsByStatus } from '@/hooks/minipool'
import Minipool, { MinipoolStatus } from '@/types/minipool'
import { nodeHexToID } from '@/utils'
import { ordinal_suffix } from '@/utils/misc'

const statusColors = {
  [MinipoolStatus.Launched]: 'green.400',
  [MinipoolStatus.Staking]: 'purple.400',
  [MinipoolStatus.Withdrawable]: 'green.400',
  [MinipoolStatus.Finished]: 'success.500',
  [MinipoolStatus.Canceled]: 'gray.400',
  [MinipoolStatus.Error]: 'red.400',
  [MinipoolStatus.Prelaunch]: 'yellow.400',
} as const

const formatTime = (t: BigNumber) => {
  const unixTimestamp = Number(t) * 1000
  if (unixTimestamp === 0) {
    return '--'
  }
  const d = new Date(unixTimestamp)
  const time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const monthDay = d.toLocaleDateString([], { month: 'short', day: 'numeric' })
  const year = d.toLocaleDateString([], { year: 'numeric' })
  const day = d.toLocaleDateString([], { weekday: 'short' })

  return (
    <>
      <Text>{day + ' | ' + monthDay}</Text>
      <Text>{year + ' | ' + time}</Text>
    </>
  )
}

interface MinipoolTableRowProps {
  minipool: Minipool
}

export const MinipoolTableRow: FunctionComponent<MinipoolTableRowProps> = ({ minipool }) => {
  const isFinished = minipool.status.toNumber() === MinipoolStatus.Finished
  const isWithdrawable = minipool.status.toNumber() === MinipoolStatus.Withdrawable
  const isPrelaunch = minipool.status.toNumber() === MinipoolStatus.Prelaunch
  const isError = minipool.status.toNumber() === MinipoolStatus.Error
  const isStaking = minipool.status.toNumber() === MinipoolStatus.Staking
  const isLaunched = minipool.status.toNumber() === MinipoolStatus.Launched
  const isCancelled = minipool.status.toNumber() === MinipoolStatus.Canceled

  const { data: prelaunchMinipools } = useMinipoolsByStatus({
    status: MinipoolStatus.Prelaunch,
  })
  const status = minipool.status.toNumber()
  const toast = useToast()

  let prelaunchIndex: number
  if (prelaunchMinipools && status === MinipoolStatus.Prelaunch) {
    prelaunchIndex = prelaunchMinipools.findIndex(({ nodeID }) => minipool.nodeID === nodeID)
  }

  const copyNodeId = () => {
    navigator.clipboard.writeText(minipool.nodeID).catch((err) => {
      console.error('Failed to copy node ID: ', err)
    })
    toast({
      position: 'top',
      description: 'Copied!',
      status: 'info',
      duration: 2000,
      isClosable: true,
    })
  }

  const withdrawOrCancel = useMemo((): JSX.Element => {
    if (isPrelaunch) {
      return <CancelButton isFinished={isFinished} minipool={minipool} />
    } else if (isWithdrawable) {
      return <WithdrawButton isFinished={isFinished} minipool={minipool} />
    } else if (isError) {
      return <ErrorButton isFinished={isFinished} minipool={minipool} />
    } else if (isStaking || isLaunched) {
      return <StakingButton status={minipool.status.toNumber()} />
    } else {
      return null
    }
  }, [isPrelaunch, isWithdrawable, isError, isStaking, isLaunched, isFinished, minipool])

  const endTimeBadge = useMemo((): JSX.Element => {
    if (isPrelaunch) {
      return (
        <TableBadge
          color="yellow.500"
          tooltipContent={`While your Minipool has been created, it will not begin validating on the AVAX network until we have matched your 1000 AVAX. You are currently ${
            prelaunchIndex === undefined ? '...' : ordinal_suffix(prelaunchIndex + 1)
          } in line.`}
          use="OUTLINE"
        >
          Prelaunch
        </TableBadge>
      )
    } else if (isWithdrawable) {
      return (
        <TableBadge
          color="yellow.500"
          tooltipContent={`Withdraw your rewards to complete your minipool's journey.`}
          use="OUTLINE"
        >
          Prelaunch
        </TableBadge>
      )
    } else if (isError) {
      return (
        <TableBadge
          color="red.500"
          tooltipContent={`An error occurred with your minipool.`}
          use="OUTLINE"
        >
          Error
        </TableBadge>
      )
    } else if (isStaking || isLaunched) {
      return (
        <div className="flex flex-col">
          <span>{formatTime(minipool.startTime.add(minipool.duration))}</span>
        </div>
      )
    } else if (isCancelled) {
      return (
        <TableBadge
          color="gray.500"
          tooltipContent={`Your minipool was cancelled before taking flight.`}
          use="OUTLINE"
        >
          Cancelled
        </TableBadge>
      )
    } else {
      return <span>{formatTime(minipool.endTime)}</span>
    }
  }, [
    isPrelaunch,
    isWithdrawable,
    isError,
    isStaking,
    isLaunched,
    minipool,
    prelaunchIndex,
    isCancelled,
  ])

  return (
    <Tr key={minipool.nodeID}>
      <Td>
        <Tooltip content={nodeHexToID(minipool.nodeID)} placement="top">
          <Flex align="center" cursor="pointer" gap="1" onClick={copyNodeId} width="135px">
            <span className="truncate">{nodeHexToID(minipool.nodeID)}</span>
            <CopyIcon />
          </Flex>
        </Tooltip>
      </Td>
      <Td>
        <Box as="span" color={statusColors[minipool.status.toNumber()]} fontWeight={700}>
          {MinipoolStatus[status]}
        </Box>
      </Td>
      <Td>{formatUnits(minipool.avaxNodeOpAmt.add(minipool.avaxLiquidStakerAmt))} AVAX</Td>
      <Td>{formatTime(minipool.creationTime)}</Td>
      <Td>{formatTime(minipool.startTime)}</Td>
      <Td>{endTimeBadge}</Td>
      <Td>
        <Flex align="center" gap="2" justify="space-between">
          {withdrawOrCancel}
          {/* Dropdown menu -- This will bring up the options for restaking
          <Popover>
            <PopoverTrigger>
              <Box cursor="pointer">
                <BiDotsVerticalRounded color="#B7AFF8" size="20px" />
              </Box>
            </PopoverTrigger>
            <Portal>
              <PopoverContent>
                <PopoverArrow />
                <PopoverBody p="0">
                  <Box color="blue.900" cursor="pointer" fontWeight={600} py="3" textAlign="center">
                    Edit Validation Length
                  </Box>
                  <Divider borderColor="blue.200" />
                  <Box color="blue.900" cursor="pointer" fontWeight={600} py="3" textAlign="center">
                    Report a Problem
                  </Box>
                  <Divider borderColor="blue.200" />
                  <Box
                    color="error.500"
                    cursor="pointer"
                    fontWeight={600}
                    py="3"
                    textAlign="center"
                  >
                    Cancel Minipool?...
                  </Box>
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </Popover>
          */}
        </Flex>
      </Td>
    </Tr>
  )
}
