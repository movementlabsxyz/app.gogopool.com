import { BigNumber } from 'ethers'
import { useState } from 'react'

import { Button, Card } from '@chakra-ui/react'
import { formatEther } from 'ethers/lib/utils.js'
import { BiCheckCircle, BiXCircle } from 'react-icons/bi'
import { FiLoader } from 'react-icons/fi'
import useAsyncEffect from 'use-async-effect'

import CardTitle from '../CardTitle'
import DashboardButtonCard from '../DashboardButtonCard'
import DashboardCard from '../DashboardCard'
import RewardsCardFooter from './RewardsCardFooter'
import RewardsStat from './RewardsStat'
import { TrophyIcon } from './TrophyIcon'

import { Tooltip } from '@/common/components/Tooltip'
import postEstimator from '@/hooks/useEstimator'
import { useGetAVAXStake, useGetGGPStake, useRewardStartTime } from '@/hooks/useStake'
import CountdownTimerNextCycle from '@/modules/components/Countdown/CountdownTimerNextCycle'
import { colors } from '@/theme/colors'
import { Ceres } from '@/types/ceres'
import { HexString } from '@/types/cryptoGenerics'

export type Props = {
  openClaimModal: () => void
  ceresData: Ceres
  address: HexString
  nextCycleDate: Date
  eligibilityCutoff: number
  eligibilityLen: number
}

function noRewards(
  apy: BigNumber,
  ggpReward: BigNumber,
  userStartTime: BigNumber,
  eligibilityCutoff: BigNumber,
  eligibilityLen: number,
) {
  const noRewardsStats = [
    {
      name: 'GGP REWARD ELIGIBILITY',
      stat: <span className="text-success-500">Eligible</span>,
      tooltip: (
        <div className="flex flex-col">
          <div className="flex items-center gap-x-2">
            <BiCheckCircle color="#00C137" size={24} />{' '}
            <span>
              Minipool will have been validating or queued for {eligibilityLen / (60 * 60 * 24)}{' '}
              days.
            </span>
          </div>
        </div>
      ),
    },
    {
      name: 'POTENTIAL APY',
      stat: `${Number(formatEther(apy)).toFixed(2)} %`,
      tooltip: 'Estimated monthly rewards, annualized.',
    },
    {
      name: 'POTENTIAL REWARDS',
      stat: `${Number(formatEther(ggpReward)).toFixed(2)} GGP`,
      tooltip: 'Using current network conditions, estimate based on collateralization ratio.',
    },
  ]

  if (eligibilityCutoff.lt(userStartTime)) {
    noRewardsStats[0] = {
      name: 'GGP REWARD ELIGIBILITY',
      stat: <span className="text-error-700">Not Eligibile</span>,
      tooltip: (
        <div className="flex flex-col">
          <div className="flex items-center gap-x-2">
            <BiXCircle color="red" size={24} />{' '}
            <span>
              Minipool WILL NOT have been validating or queued for {eligibilityLen / (60 * 60 * 24)}{' '}
              days.
            </span>
          </div>
        </div>
      ),
    }
  }
  return noRewardsStats
}

export default function UpcomingRewardsCard({
  address,
  ceresData,
  eligibilityCutoff,
  eligibilityLen,
  nextCycleDate,
  openClaimModal,
}: Props) {
  const [apy, setApy] = useState(BigNumber.from(0))
  const [ggpReward, setGgpReward] = useState(BigNumber.from(0))

  const { data: ggpStaked, isLoading: ggpLoading } = useGetGGPStake(address)
  const { data: avaxStaked, isLoading: avaxLoading } = useGetAVAXStake(address)
  const { data: startTime, isLoading: startTimeLoading } = useRewardStartTime(address)

  useAsyncEffect(async () => {
    if (ggpStaked && avaxStaked) {
      if (ggpStaked.gt(0) && avaxStaked.gt(0)) {
        const { apy, ggpReward } = await postEstimator({
          ggpStaked,
          avaxStaked,
          walletAddress: address,
        })
        setApy(BigNumber.from(apy))
        setGgpReward(BigNumber.from(ggpReward))
      }
    }
  }, [ggpStaked, avaxStaked])

  if (ggpLoading || avaxLoading || startTimeLoading) {
    return (
      <DashboardCard cardTitle={<CardTitle icon={<FiLoader size={40} />} title="Loading" />}>
        Loading...
      </DashboardCard>
    )
  }

  const noRewardsStats = noRewards(
    apy,
    ggpReward,
    startTime,
    BigNumber.from(eligibilityCutoff),
    eligibilityLen,
  )

  return (
    <DashboardButtonCard
      button1={
        <Tooltip content={'No rewards available'} placement="top">
          <Button
            border={'1px'}
            borderColor={colors.blue[100]}
            disabled={true}
            onClick={openClaimModal}
            size="sm"
            variant="tertiary"
          >
            Claim & Restake
          </Button>
        </Tooltip>
      }
      cardTitle={<CardTitle icon={TrophyIcon} title="My Rewards" />}
    >
      <dl className="flex flex-wrap gap-8 py-6">
        <span className="hidden basis-[260px] items-center std:flex">
          <Card
            border={'1px'}
            borderColor={colors.blue[50]}
            borderRadius={'16px'}
            boxShadow={'lg'}
            className="flex w-full justify-center py-4"
          >
            <CountdownTimerNextCycle ceresData={ceresData} />
          </Card>
        </span>
        <div className="flex grow basis-[250px] justify-center">
          <dl className="flex w-full flex-col">
            {noRewardsStats.map((item, index) => (
              <span key={item.name}>
                <RewardsStat item={item} />
                {index <= noRewardsStats.length - 2 && <hr className="border-blue-100" />}
              </span>
            ))}
          </dl>
        </div>
      </dl>
      <hr className="mx-[-24px] border-blue-100" />
      <RewardsCardFooter nextCycleDate={nextCycleDate} />
    </DashboardButtonCard>
  )
}
