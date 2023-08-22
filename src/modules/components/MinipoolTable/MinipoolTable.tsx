import { BigNumber } from 'ethers'

import { Skeleton } from '@chakra-ui/react'
import clsx from 'clsx'
import { formatUnits } from 'ethers/lib/utils'
import { useRouter } from 'next/router'

import CancelButton from './CancelButton'
import DefaultButton from './DefaultButton'
import { EmptyState } from './EmptyState'
import ErrorButton from './ErrorButton'
import WithdrawButton from './WithdrawButton'

import { Button } from '@/common/components/Button'
import { useMinipoolsByOwner } from '@/hooks/minipool'
import Minipool, { MinipoolStatus } from '@/types/minipool'
import { nodeHexToID } from '@/utils'

const statuses = {
  [MinipoolStatus.Launched]: 'text-green-400 bg-green-400/10',
  [MinipoolStatus.Staking]: 'text-orange-400 bg-orange-400/10',
  [MinipoolStatus.Withdrawable]: 'text-green-400 bg-green-400/10',
  [MinipoolStatus.Finished]: 'text-gray-400 bg-gray-400/10',
  [MinipoolStatus.Canceled]: 'text-gray-400 bg-gray-400/10',
  [MinipoolStatus.Error]: 'text-red-400 bg-red-400/10',
  [MinipoolStatus.Prelaunch]: 'text-yellow-400 bg-yellow-400/10',
}

const environments = {
  [MinipoolStatus.Prelaunch]: 'text-yellow-600 bg-yellow-400/10 ring-yellow-400/20',
  [MinipoolStatus.Canceled]: 'text-gray-600 bg-gray-400/10 ring-gray-400/20',
  [MinipoolStatus.Launched]: 'text-indigo-600 bg-indigo-400/10 ring-indigo-400/30',
  [MinipoolStatus.Staking]: 'ring-orange-400/30 text-orange-600 bg-orange-400/10',
  [MinipoolStatus.Withdrawable]: 'ring-green-400/30 text-green-600 bg-green-400/10',
  [MinipoolStatus.Finished]: 'ring-gray-400/30 text-gray-600 bg-gray-400/10',
  [MinipoolStatus.Error]: 'ring-red-400/30 text-red-600 bg-red-400/10',
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

const copyTransaction = (nodeId: string) => {
  navigator.clipboard.writeText(`https://explorer.avax.network/tx/${nodeId}`).catch((err) => {
    console.error('Failed to copy transaction hash: ', err)
  })
}

const MinipoolCard = ({ minipool }: { minipool: Minipool }) => {
  const isFinished = minipool.status.toNumber() === MinipoolStatus.Finished
  const isWithdrawable = minipool.status.toNumber() === MinipoolStatus.Withdrawable
  const isPrelaunch = minipool.status.toNumber() === MinipoolStatus.Prelaunch
  const isError = minipool.status.toNumber() === MinipoolStatus.Error

  const cardInternals = (
    <li className="relative flex w-full items-center space-x-4 py-4" key={minipool.nodeID}>
      <div className="min-w-0 flex-auto">
        <div className="flex items-center gap-x-3">
          <div className={clsx(statuses[minipool.status.toNumber()], 'flex-none rounded-full p-1')}>
            <div className="h-2 w-2 rounded-full bg-current" />
          </div>
          <h2 className="min-w-0 text-sm font-semibold leading-6">
            <a
              className="flex gap-x-2"
              onClick={() => copyTransaction(nodeHexToID(minipool.nodeID))}
            >
              <span className="truncate">{nodeHexToID(minipool.nodeID)}</span>
              <span className="text-gray-400">/</span>
              <span className="whitespace-nowrap">
                {formatUnits(minipool.avaxNodeOpAmt.add(minipool.avaxLiquidStakerAmt))} staked
              </span>
              <span className="absolute inset-0" />
            </a>
          </h2>
        </div>
        <div className="mt-3 flex items-center gap-x-2.5 text-sm leading-5 text-gray-800">
          {formatUnits(minipool.avaxNodeOpAmt)} staked
          <svg className="h-0.5 w-0.5 flex-none fill-gray-300" viewBox="0 0 2 2">
            <circle cx={1} cy={1} r={1} />
          </svg>
          {formatUnits(minipool.avaxNodeOpRewardAmt)} rewards
          <p className="whitespace-nowrap"></p>
        </div>
        <div className="mt-3 flex flex-col gap-1 text-sm leading-5 text-gray-800">
          <time className="flex gap-4">
            <span>Created:</span>
            <span>{formatTime(minipool.creationTime)}</span>
          </time>
          <time className="flex gap-9">
            <span>Start:</span>
            <span>{formatTime(minipool.startTime)}</span>
          </time>
          <time className="flex gap-10">
            <span>End:</span>
            <span>{formatTime(minipool.endTime)}</span>
          </time>
        </div>
      </div>
      <div
        className={clsx(
          environments[minipool.status.toNumber()],
          'flex-none rounded-full py-1 px-2 text-xs font-medium ring-1 ring-inset',
        )}
      >
        {MinipoolStatus[minipool.status.toNumber()]}
      </div>
    </li>
  )

  if (isPrelaunch) {
    return (
      <CancelButton isFinished={isFinished} minipool={minipool}>
        {cardInternals}
      </CancelButton>
    )
  } else if (isWithdrawable) {
    return (
      <WithdrawButton isFinished={isFinished} minipool={minipool}>
        {cardInternals}
      </WithdrawButton>
    )
  } else if (isError) {
    return (
      <ErrorButton isFinished={isFinished} minipool={minipool}>
        {cardInternals}
      </ErrorButton>
    )
  } else {
    return <DefaultButton status={minipool.status.toNumber()}>{cardInternals}</DefaultButton>
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
          Create New Pool
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
