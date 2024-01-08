import { constants } from 'ethers'

import { Button, useDisclosure } from '@chakra-ui/react'
import { parseEther } from 'ethers/lib/utils.js'
import { useAccount } from 'wagmi'

import { StakeModal } from '../../Modal/StakeModal/StakeModal'
import { UnstakeModal } from '../../Modal/UnstakeModal/UnstakeModal'
import CardTitle from './CardTitle'
import DashboardButtonCard from './DashboardButtonCard'
import StakeStat from './StakeStat'
import { VaultIcon } from './VaultIcon'

import EmptyStakeIcon from '@/common/components/CustomIcon/EmptyStakeIcon'
import { Tooltip } from '@/common/components/Tooltip'
import {
  useGetAVAXStake,
  useGetAVAXValidating,
  useGetContractCollateralizationRatio,
  useGetGGPStake,
} from '@/hooks/useStake'
import { colors } from '@/theme/colors'
import { displayBN } from '@/utils/numberFormatter'

const TotalStaked = () => {
  const { address } = useAccount()

  const { data: ggpStake } = useGetGGPStake(address)
  const { data: straightRatio } = useGetContractCollateralizationRatio(address)
  const { data: avaxValidating } = useGetAVAXValidating(address)
  const { data: avaxStaked } = useGetAVAXStake(address)

  const { isOpen: isOpenStake, onClose: onCloseStake, onOpen: onOpenStake } = useDisclosure()
  const { isOpen: isOpenUnstake, onClose: onCloseUnstake, onOpen: onOpenUnstake } = useDisclosure()

  const stats = [
    {
      name: 'GGP COLLATERAL RATIO',
      stat: `${
        straightRatio.eq(constants.MaxUint256) ? 'N/A' : displayBN(straightRatio.mul(100))
      } %`,
      tooltip: 'Ratio of your GGP staked to your AVAX matched.',
    },
    {
      name: 'GGP STAKED',
      stat: `${displayBN(ggpStake)} GGP`,
      tooltip: 'The total amount of GGP you have staked.',
    },
    {
      name: 'AVAX LOCKED',
      stat: `${displayBN(avaxStaked)} AVAX`,
      tooltip:
        'The total amount of AVAX you have deposited in the protocol. While your minipool is running you will be unable to withdraw this.',
    },
    {
      name: 'AVAX VALIDATING',
      stat: `${displayBN(avaxValidating)} AVAX`,
      tooltip: 'The portion of your locked AVAX that is staking on the P-Chain.',
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
            disabled={!address}
            onClick={onOpenStake}
            paddingX={'16px'}
            size="sm"
            variant="tertiary"
          >
            Stake {ggpStake.gt(0) ? 'More GGP' : 'GGP'}
          </Button>
        }
        button2={
          <Tooltip
            content={
              straightRatio.lte(parseEther('1.5'))
                ? 'Collateral ratio at or below 150%'
                : ggpStake.eq(0)
                ? 'No GGP Staked'
                : ''
            }
          >
            <Button
              border={'1px'}
              borderColor={colors.blue[100]}
              disabled={ggpStake.eq(0) || !address || straightRatio.lte(parseEther('1.5'))}
              onClick={onOpenUnstake}
              paddingX={'16px'}
              size="sm"
              variant="tertiary"
            >
              Unstake GGP
            </Button>
          </Tooltip>
        }
        cardTitle={<CardTitle icon={VaultIcon} title="My Stake" />}
      >
        {cardInternals}
      </DashboardButtonCard>
      {isOpenStake && <StakeModal onClose={onCloseStake} />}
      {isOpenUnstake && <UnstakeModal onClose={onCloseUnstake} />}
    </>
  )
}

export default TotalStaked
