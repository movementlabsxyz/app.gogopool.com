import { BigNumber } from 'ethers'
import { FunctionComponent } from 'react'

import { CopyIcon } from '@chakra-ui/icons'
import {
  Box,
  Divider,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Td,
  Text,
  Tr,
  useToast,
} from '@chakra-ui/react'
import { formatUnits } from 'ethers/lib/utils.js'
import { BiDotsVerticalRounded } from 'react-icons/bi'

import { TableBadge } from './TableBadge'

import { Button } from '@/common/components/Button'
import { Tooltip } from '@/common/components/Tooltip'
import { useMinipoolsByStatus } from '@/hooks/minipool'
import Minipool, { MinipoolStatus } from '@/types/minipool'
import { nodeHexToID } from '@/utils'
import { ordinal_suffix } from '@/utils/misc'

const statusColors = {
  [MinipoolStatus.Launched]: 'green.400',
  [MinipoolStatus.Staking]: 'orange.400',
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
  const { data: prelaunchMinipools } = useMinipoolsByStatus({
    status: MinipoolStatus.Prelaunch,
  })
  const status = minipool.status.toNumber()
  const toast = useToast()

  let prelaunchIndex
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
      <Td>
        {status === MinipoolStatus.Prelaunch ? (
          <TableBadge
            color="yellow.500"
            tooltipContent={`While your Minipool has been created, it will not begin validating on the AVAX network until we have matched your 1000 AVAX. You are currently ${
              prelaunchIndex === undefined ? '...' : ordinal_suffix(prelaunchIndex + 1)
            } in line.`}
            use="OUTLINE"
          >
            Prelaunch
          </TableBadge>
        ) : (
          formatTime(minipool.endTime)
        )}
      </Td>
      <Td>
        <Flex align="center" gap="2" justify="space-between">
          <Button
            //TODO: disabled based on status
            disabled={false}
            onClick={() => {
              // Open withdraw modal
            }}
            size="xs"
            variant="secondary-outline"
          >
            Withdraw Options
          </Button>
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
        </Flex>
      </Td>
    </Tr>
  )
}
