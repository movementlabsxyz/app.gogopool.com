import { BigNumber } from 'ethers'

import { FiLoader } from 'react-icons/fi'
import { useAccount } from 'wagmi'

import CardTitle from '../CardTitle'
import QueueCard from './QueueCard'
import RewardsCard from './RewardsCard'
import { TrophyIcon } from './TrophyIcon'
import UpcomingRewardsCard from './UpcomingRewardsCard'

import EmptyRewardsIcon from '@/common/components/CustomIcon/EmptyRewardsIcon'
import { useMinipoolsByOwner, useMinipoolsByStatus } from '@/hooks/minipool'
import { useGetGGPRewards } from '@/hooks/useStake'
import DashboardCard from '@/modules/components/Dashboard/Cards/DashboardCard'
import { Ceres } from '@/types/ceres'
import { HexString } from '@/types/cryptoGenerics'

export interface RewardsProps {
  address: HexString
  ceresData: Ceres
  openClaimModal: () => void
}

const Rewards = ({ address, ceresData, openClaimModal }: RewardsProps) => {
  const { data: minipoolsPrelaunch, isLoading: minipoolsPreLoading } = useMinipoolsByStatus({
    status: 0,
  })
  const { address: account } = useAccount()
  const { data: rewardsToClaimMaybe } = useGetGGPRewards(account)
  const rewardsToClaim = rewardsToClaimMaybe || BigNumber.from(0)

  const { isLoading: minipoolsOwnLoading, minipools: minipoolsByOwner } =
    useMinipoolsByOwner(address)

  if (!ceresData || minipoolsPreLoading || minipoolsOwnLoading) {
    return (
      <DashboardCard cardTitle={<CardTitle icon={<FiLoader size={40} />} title="Loading" />}>
        Loading...
      </DashboardCard>
    )
  }

  const cycleStart = ceresData.rewardsCycleStartTime.value
  const eligibilityLen = ceresData.rewardsEligibilityMinSeconds.value
  const eligibilityCutoff = cycleStart + eligibilityLen
  const nextCycleStart = cycleStart + 24 * 60 * 60 * 30
  const nextCycleDate = new Date(nextCycleStart * 1000)

  // If there are rewards, display rewards screen
  if (rewardsToClaim.gt(0)) {
    return (
      <RewardsCard
        address={address}
        nextCycleDate={nextCycleDate}
        openClaimModal={openClaimModal}
        rewardsToClaim={rewardsToClaim}
      />
    )
  }

  // If there are no rewards, or minipools, display empty state
  if (!minipoolsByOwner?.length) {
    return (
      <DashboardCard cardTitle={<CardTitle icon={TrophyIcon} title="My Rewards" />}>
        <EmptyRewardsIcon />
        <span className="w-80 pt-4 text-center">
          In order to gain <span className="font-bold">rewards</span> you must have created a{' '}
          <span className="font-bold">Minipool</span>.
        </span>
      </DashboardCard>
    )
  }

  const prelaunchAtAddr = minipoolsByOwner.filter((minipool) => minipool.status.eq(0))
  // filter to Prelaunch, Launched, Staking and Widthdrawable (PLSW) nodes. These are the valid node types that affect the rewards card logic.
  const onlyPLSW = minipoolsByOwner.filter((minipool) => {
    return (
      minipool.status.eq(0) ||
      minipool.status.eq(1) ||
      minipool.status.eq(2) ||
      minipool.status.eq(3)
    )
  })

  // filter to Finished, Cancelled, Error nodes.
  const onlyFCE = minipoolsByOwner.filter((minipool) => {
    return minipool.status.eq(4) || minipool.status.eq(5) || minipool.status.eq(6)
  })

  if (minipoolsByOwner?.length === onlyFCE.length) {
    return (
      <DashboardCard cardTitle={<CardTitle icon={TrophyIcon} title="My Rewards" />}>
        <EmptyRewardsIcon />
        <span className="w-80 pt-4 text-center">
          All of your minipools have <span className="font-bold">Finished</span>.
        </span>
      </DashboardCard>
    )
  }

  // If they made minipool(s) but all are in Prelaunch status display queue.
  if (prelaunchAtAddr.length > 0 && prelaunchAtAddr.length === onlyPLSW.length) {
    // Find the index of the minipool that is closest to being launched
    const minipoolIndex = minipoolsPrelaunch.findIndex(
      (minipool) => minipool.nodeID === prelaunchAtAddr[0].nodeID,
    )
    return <QueueCard minipoolIndex={minipoolIndex} nextCycleDate={nextCycleDate} />
  }

  // If there are no rewards to claim, but they have a running minipool.
  return (
    <UpcomingRewardsCard
      address={address}
      ceresData={ceresData}
      eligibilityCutoff={eligibilityCutoff}
      eligibilityLen={eligibilityLen}
      nextCycleDate={nextCycleDate}
      openClaimModal={openClaimModal}
    />
  )
}

export default Rewards
