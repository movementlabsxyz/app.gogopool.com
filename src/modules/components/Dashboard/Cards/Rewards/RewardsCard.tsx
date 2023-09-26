import { BigNumber } from 'ethers'
import { useState } from 'react'

import { Button } from '@chakra-ui/react'
import { formatEther } from 'ethers/lib/utils.js'
import useAsyncEffect from 'use-async-effect'
import { useNetwork } from 'wagmi'

import CardTitle from '../CardTitle'
import DashboardButtonCard from '../DashboardButtonCard'
import RewardsCardFooter from './RewardsCardFooter'
import RewardsStat from './RewardsStat'
import { TrophyIcon } from './TrophyIcon'

import RewardsIcon from '@/common/components/CustomIcon/RewardsIcon'
import { Tooltip } from '@/common/components/Tooltip'
import postEstimator from '@/hooks/useEstimator'
import { useGetAVAXStake } from '@/hooks/useStake'
import { colors } from '@/theme/colors'
import { HexString } from '@/types/cryptoGenerics'

type Props = {
  openClaimModal: () => void
  rewardsToClaim: BigNumber
  nextCycleDate: Date
  address: HexString
}

export default function RewardsCard({
  address,
  nextCycleDate,
  openClaimModal,
  rewardsToClaim,
}: Props) {
  const { chain } = useNetwork()

  const [apy, setApy] = useState(BigNumber.from(0))

  const { data: avaxStaked } = useGetAVAXStake(address)

  useAsyncEffect(async () => {
    if (rewardsToClaim && avaxStaked) {
      if (rewardsToClaim.gt(0) && avaxStaked.gt(0)) {
        const { apy } = await postEstimator({
          ggpStaked: rewardsToClaim,
          avaxStaked,
          walletAddress: address,
          chainId: chain?.id,
        })
        setApy(BigNumber.from(apy))
      }
    }
  }, [rewardsToClaim, avaxStaked])

  const hasRewardsStats = [
    {
      name: 'APY',
      stat: `${Number(formatEther(apy)).toFixed(2)} %`,
      tooltip: 'Monthly rewards, annualized.',
    },
    {
      name: 'GGP REWARDS',
      stat: `${Number(formatEther(rewardsToClaim)).toFixed(2)} GGP`,
      tooltip: 'Your current unclaimed rewards!',
    },
  ]

  return (
    <DashboardButtonCard
      button1={
        <Tooltip content={rewardsToClaim.lte(0) ? 'No rewards available' : ''} placement="top">
          <Button
            border={'1px'}
            borderColor={colors.blue[100]}
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
      <dl className="flex flex-wrap gap-10 py-6">
        <div className="hidden basis-[270px] justify-center std:flex">
          <RewardsIcon />
        </div>
        <div className="flex grow basis-[250px] justify-center">
          <dl className="w-full">
            <span className="flex items-center gap-2 py-4 text-sm font-bold text-blue-500">
              <span className="text-blue-900">CONGRATS!</span>
              <span className="text-green-500">YOU&apos;VE GOT REWARDS</span>
            </span>
            <hr className="border-blue-100" />
            {hasRewardsStats.map((item, index) => (
              <span key={item.name}>
                <RewardsStat item={item} />
                {index <= hasRewardsStats.length - 2 && <hr className="border-blue-100" />}
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
