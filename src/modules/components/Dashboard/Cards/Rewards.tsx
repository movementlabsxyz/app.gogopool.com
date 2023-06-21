import { BigNumber, BigNumberish } from 'ethers'

import { formatEther } from 'ethers/lib/utils'

import { EmptyState } from '../../MinipoolTable/EmptyState'

import { Button } from '@/common/components/Button'
import { Tooltip } from '@/common/components/Tooltip'
import { useRewardCycleStartTime } from '@/hooks/useRewards'
import {
  useGetEffectiveGGPStaked,
  useGetEffectiveRewardsRatio,
  useGetGGPRewards,
  useGetGGPStake,
  useGetTotalGGPStake,
} from '@/hooks/useStake'

export interface RewardsProps {
  address: string
  openClaimModal: () => void
}

const Rewards = ({ address, openClaimModal }: RewardsProps) => {
  // const eligibiltyString = isEligible ? "true" : "false";

  const { data: totalGGPStake } = useGetTotalGGPStake()

  const { data: claimAmountMaybe } = useGetGGPRewards(address)
  const claimAmount = Number(formatEther((claimAmountMaybe as BigNumberish) || 0))

  const { data: ggpStake } = useGetGGPStake(address)
  const ratio = (ggpStake / Number(formatEther((totalGGPStake as BigNumberish) || 1))).toFixed(2)

  const { data: effectiveGGPStaked } = useGetEffectiveGGPStaked(address)
  const { data: effectiveRewardsRatio } = useGetEffectiveRewardsRatio(address)

  const { data: rewardCycleStartTime } = useRewardCycleStartTime()
  const cycleStartDate = new Date((rewardCycleStartTime as BigNumber)?.toNumber() * 1000)

  const dateToLocaleString = (date) => {
    return date.toLocaleString('en-us', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short',
    })
  }

  const stats = [
    {
      name: 'Claimable Rewards',
      stat: `${claimAmount.toLocaleString()} GGP`,
    },
    {
      name: 'GGP Staked',
      stat: `${claimAmount ? ggpStake.toLocaleString() : 0} GGP`,
    },
    {
      name: 'Next Reward Cycle',
      stat: `${dateToLocaleString(cycleStartDate)}`,
    },
  ]

  return (
    <>
      <div className="flex items-center space-x-4">
        <h3 className="text-base font-semibold leading-6 text-gray-900">Rewards Information</h3>
        <Tooltip content={claimAmount <= 0 ? 'No rewards available' : ''} placement="top">
          <Button
            disabled={claimAmount <= 0}
            onClick={openClaimModal}
            size="xs"
            variant="secondary-outline"
          >
            Claim & Restake
          </Button>
        </Tooltip>
      </div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {!!claimAmount &&
          stats.map((item) => (
            <div
              className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
              key={item.name}
            >
              <dt className="truncate text-sm font-medium text-gray-500">{item.name}</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                {item.stat}
              </dd>
            </div>
          ))}

        {!claimAmount && (
          <EmptyState
            description="Create a minipool and start staking to earn rewards!"
            icon={
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            title="No rewards"
          />
        )}
      </dl>
    </>
  )
}

export default Rewards
