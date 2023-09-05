import { constants } from 'ethers'

import { Button, useDisclosure } from '@chakra-ui/react'
import { formatEther } from 'ethers/lib/utils.js'
import { useAccount } from 'wagmi'

import { StakeModal } from '../../Modal/StakeModal'
import { UnstakeModal } from '../../Modal/UnstakeModal'
import CardTitle from './CardTitle'
import DashboardButtonCard from './DashboardButtonCard'
import DashboardCard from './DashboardCard'
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
      stat: `${
        straightRatio.eq(constants.MaxUint256)
          ? '∞'
          : Number(formatEther(straightRatio.mul(100))).toFixed(2)
      } %`,
      tooltip: 'Ratio of your GGP staked to your AVAX matched.',
    },
    {
      name: 'GGP STAKED',
      stat: `${Number(formatEther(ggpStake)).toFixed(2)} GGP`,
      tooltip: 'The total amount of GGP you have staked.',
    },
    {
      name: 'AVAX STAKED',
      stat: `${Number(formatEther(avaxStaked)).toFixed(2)} AVAX`,
      tooltip:
        'The total amount of AVAX you have deposited in the protocol. While your minipool is running you will be unable to withdraw this.',
    },
    {
      name: 'MATCHED AMOUNT',
      stat: `${Number(formatEther(avaxMatched)).toFixed(2)} AVAX`,
      tooltip: 'The matched amount of AVAX received from the liquid staker pool.',
    },
  ]

  if (ggpStake.eq(0) || avaxMatched.eq(0)) {
    return (
      <DashboardCard cardTitle={<CardTitle icon={VaultIcon} title="My Stake" />}>
        <EmptyStakeIcon />
        <span className="w-80 pt-4 text-center">
          Here you will see <span className="font-bold">your staking</span> information once your{' '}
          <span className="font-bold">Minipool</span> has been created.
        </span>
      </DashboardCard>
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
        <dl className="py-6">
          {stats.map((item, index) => (
            <span key={item.name}>
              <StakeStat item={item} />
              {index <= stats.length - 2 && <hr className="border-blue-100" />}
            </span>
          ))}
        </dl>
      </DashboardButtonCard>

      <UnstakeModal isOpen={isOpenUnstake} onClose={onCloseUnstake} />
      <StakeModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default TotalStaked
