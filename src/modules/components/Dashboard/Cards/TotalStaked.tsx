import { constants } from 'ethers'

import { Button, useDisclosure } from '@chakra-ui/react'
import { useAccount } from 'wagmi'

import { StakeModal } from '../../Modal/StakeModal'
import { UnstakeModal } from '../../Modal/UnstakeModal'
import CardTitle from './CardTitle'
import DashboardButtonCard from './DashboardButtonCard'
import StakeStat from './StakeStat'
import { VaultIcon } from './VaultIcon'

import EmptyStakeIcon from '@/common/components/CustomIcon/EmptyStakeIcon'
import {
  useGetAVAXAssigned,
  useGetAVAXStake,
  useGetContractCollateralizationRatio,
  useGetGGPStake,
} from '@/hooks/useStake'
import { colors } from '@/theme/colors'
import { displayBN } from '@/utils/numberFormatter'

const TotalStaked = () => {
  const { address } = useAccount()

  const { data: ggpStake } = useGetGGPStake(address)
  const { data: straightRatio } = useGetContractCollateralizationRatio(address)
  const { data: avaxMatched } = useGetAVAXAssigned(address)
  const { data: avaxStaked } = useGetAVAXStake(address)

  const { isOpen, onClose, onOpen } = useDisclosure()
  const { isOpen: isOpenUnstake, onClose: onCloseUnstake, onOpen: onOpenUnstake } = useDisclosure()

  const stats = [
    {
      name: 'GGP COLLATERAL RATIO',
      stat: `${straightRatio.eq(constants.MaxUint256) ? '∞' : displayBN(straightRatio.mul(100))} %`,
      tooltip: 'Ratio of your GGP staked to your AVAX matched.',
    },
    {
      name: 'GGP STAKED',
      stat: `${displayBN(ggpStake)} GGP`,
      tooltip: 'The total amount of GGP you have staked.',
    },
    {
      name: 'AVAX STAKED',
      stat: `${displayBN(avaxStaked)} AVAX`,
      tooltip:
        'The total amount of AVAX you have deposited in the protocol. While your minipool is running you will be unable to withdraw this.',
    },
    {
      name: 'MATCHED AMOUNT',
      stat: `${displayBN(avaxMatched)} AVAX`,
      tooltip: 'The matched amount of AVAX received from the liquid staker pool.',
    },
  ]

  let cardInternals = (
    <dl className="py-6">
      {stats.map((item, index) => (
        <span key={item.name}>
          <StakeStat item={item} />
          {index <= stats.length - 2 && <hr className="border-blue-100" />}
        </span>
      ))}
    </dl>
  )

  if (ggpStake.eq(0)) {
    cardInternals = (
      <div className="flex h-full flex-col items-center justify-center">
        <EmptyStakeIcon />
        <span className="w-80 pt-4 text-center">
          Here you will see <span className="font-bold">your staking</span> information once your{' '}
          <span className="font-bold">Minipool</span> has been created.
        </span>
      </div>
    )
  }

  return (
    <>
      <DashboardButtonCard
        button1={
          <Button
            border={'1px'}
            borderColor={colors.blue[100]}
            onClick={onOpen}
            paddingX={'16px'}
            size="sm"
            variant="tertiary"
          >
            Stake {ggpStake ? 'More' : ''}
          </Button>
        }
        button2={
          <Button
            border={'1px'}
            borderColor={colors.blue[100]}
            disabled={!ggpStake}
            onClick={onOpenUnstake}
            paddingX={'16px'}
            size="sm"
            variant="tertiary"
          >
            Unstake GGP
          </Button>
        }
        cardTitle={<CardTitle icon={VaultIcon} title="My Stake" />}
      >
        {cardInternals}
      </DashboardButtonCard>

      <UnstakeModal isOpen={isOpenUnstake} onClose={onCloseUnstake} />
      <StakeModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default TotalStaked
