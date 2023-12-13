import { BigNumber } from 'ethers'

import { CopyIcon } from '@chakra-ui/icons'
import {
  Badge,
  Box,
  Button,
  Card,
  HStack,
  Skeleton,
  Text,
  VStack,
  useClipboard,
  useToast,
} from '@chakra-ui/react'
import { formatUnits } from 'ethers/lib/utils'
import { useRouter } from 'next/router'

import CancelButton from './CancelButton'
import { EmptyState } from './EmptyState'
import ErrorButton from './ErrorButton'
import StakingButton from './StakingButton'
import WithdrawButton from './WithdrawButton'

import { useMinipoolsByOwner } from '@/hooks/minipool'
import { colors } from '@/theme/colors'
import Minipool, { MinipoolStatus } from '@/types/minipool'
import { nodeHexToID, shortenNodeId } from '@/utils'

const statuses = {
  [MinipoolStatus.Launched]: 'orange',
  [MinipoolStatus.Staking]: 'purple',
  [MinipoolStatus.Withdrawable]: 'green',
  [MinipoolStatus.Finished]: 'grey',
  [MinipoolStatus.Canceled]: 'grey',
  [MinipoolStatus.Error]: 'red',
  [MinipoolStatus.Prelaunch]: 'yellow',
}

export interface MinipoolTableProps {
  ownerAddress: string
}

const formatTime = (t: BigNumber) => {
  if (Number(t) === 0) {
    return '--'
  }
  const d = new Date(Number(t) * 1000)
  return (
    d.toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hourCycle: 'h24',
      timeZone: 'UTC',
    }) + ' UTC'
  )
}

const CopyNodeId = ({ nodeID }) => {
  console.log('Attempting to copy:', nodeID) // For debuggin
  const { onCopy } = useClipboard(nodeID)
  const toast = useToast()
  const handleCopy = () => {
    onCopy()
    toast({
      title: 'Success',
      description: 'Copied to clipboard!',
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
  }
  return <CopyIcon onClick={handleCopy} />
}

const MinipoolCard = ({ minipool }: { minipool: Minipool }) => {
  const isFinished = minipool.status.toNumber() === MinipoolStatus.Finished
  const isWithdrawable = minipool.status.toNumber() === MinipoolStatus.Withdrawable
  const isPrelaunch = minipool.status.toNumber() === MinipoolStatus.Prelaunch
  const isError = minipool.status.toNumber() === MinipoolStatus.Error
  const isStaking = minipool.status.toNumber() === MinipoolStatus.Staking
  const isLaunched = minipool.status.toNumber() === MinipoolStatus.Launched

  const CardLineItem = ({ content, title }) => {
    return (
      <HStack
        alignItems="center"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        w={'full'}
      >
        <Text className="text-sm font-bold" color={colors.blue[900]}>
          {title}
        </Text>
        <Text className="text-sm font-bold" color={colors.blue[900]}>
          {content}
        </Text>
      </HStack>
    )
  }

  const CardDetails = ({ button }) => {
    return (
      <Card
        _hover={{
          borderColor: 'indigo.100',
          shadow: 'lg',
          bg: 'white',
        }}
        alignItems="center"
        background={colors.grey[0]}
        borderColor={colors.blue[100]}
        borderRadius={16}
        borderWidth="1px"
        display="flex"
        maxW="xxl"
        overflow="hidden"
        p={4}
        rounded="lg"
        shadow="base"
        w="full"
      >
        <VStack alignItems="start" spacing="16px" w={'full'}>
          <HStack
            alignItems="center"
            borderBottom="1px"
            borderColor={colors.blue[100]}
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            py={4}
            w={'full'}
          >
            <HStack
              alignItems="start"
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <CopyNodeId nodeID={nodeHexToID(minipool.nodeID)} />
              <Text className="text-sm font-bold">
                {shortenNodeId(nodeHexToID(minipool.nodeID))}
              </Text>
            </HStack>
            <Badge colorScheme={statuses[minipool.status.toNumber()]}>
              {MinipoolStatus[minipool.status.toNumber()]}
            </Badge>
          </HStack>

          <VStack alignItems="start" spacing="16px" w={'full'}>
            <CardLineItem
              content={`${formatUnits(
                minipool.avaxNodeOpAmt.add(minipool.avaxLiquidStakerAmt),
              )} AVAX`}
              title="TOTAL STAKE"
            />
            <CardLineItem
              content={`${formatUnits(minipool.avaxNodeOpAmt)} AVAX`}
              title="YOUR STAKE"
            />
            <CardLineItem
              content={`${formatUnits(minipool.avaxNodeOpRewardAmt)} AVAX`}
              title="STAKING REWARDS"
            />
            <CardLineItem content={formatTime(minipool.creationTime)} title="CREATED TIME" />
            <CardLineItem content={formatTime(minipool.startTime)} title="START TIME" />
            <CardLineItem content={formatTime(minipool.endTime)} title="END TIME" />

            <HStack alignItems="center" display="flex" justifyContent="center" w="full">
              <Box display="flex" w="full">
                {button}
              </Box>
            </HStack>
          </VStack>
        </VStack>
      </Card>
    )
  }

  if (isPrelaunch) {
    return <CardDetails button={<CancelButton isFinished={isFinished} minipool={minipool} />} />
  } else if (isWithdrawable) {
    return <CardDetails button={<WithdrawButton isFinished={isFinished} minipool={minipool} />} />
  } else if (isError) {
    return <CardDetails button={<ErrorButton isFinished={isFinished} minipool={minipool} />} />
  } else if (isStaking || isLaunched) {
    return <CardDetails button={<StakingButton status={minipool.status.toNumber()} />} />
  } else {
    return <CardDetails button={null} />
  }
}

const MinipoolList = ({ minipools }: { minipools: Minipool[] }) => {
  return (
    <ul className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2" role="list">
      {minipools.map((minipool) => (
        <MinipoolCard key={minipool.nodeID} minipool={minipool} />
      ))}
    </ul>
  )
}

const MinipoolView = ({ ownerAddress }) => {
  const { isLoading, minipools } = useMinipoolsByOwner(ownerAddress)
  const router = useRouter()

  return (
    <>
      <div className="flex items-center space-x-4">
        <h3 className="text-base font-semibold leading-6 text-gray-900">Your Minipools</h3>
        <Button
          onClick={() => router.push('/create-minipool')}
          size="xs"
          variant="secondary-outline"
        >
          Create New Minipool
        </Button>
      </div>
      {isLoading ? (
        <Skeleton height={400} />
      ) : (
        <>
          {minipools?.length > 0 ? (
            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <MinipoolList minipools={minipools} />
              </div>
            </div>
          ) : (
            <EmptyState description="You don't have any minipools yet." title="" />
          )}
        </>
      )}
    </>
  )
}

export default MinipoolView
