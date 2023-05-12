import { useDisclosure } from '@chakra-ui/react'
import { useAccount } from 'wagmi'

import { EmptyState } from '../../MinipoolTable/EmptyState'
import { StakeModal } from '../../Modal/StakeModal'
import { UnstakeModal } from '../../Modal/UnstakeModal'

import { Button } from '@/common/components/Button'
import { Tooltip } from '@/common/components/Tooltip'
import {
  useGetAVAXAssigned,
  useGetAVAXStake,
  useGetCollateralizationRatio,
  useGetEffectiveGGPStaked,
  useGetGGPPrice,
  useGetGGPStake,
} from '@/hooks/useStake'

const TotalStaked = () => {
  const { address } = useAccount()

  const { data: avaxStake } = useGetAVAXStake(address)
  const { data: ggpStake } = useGetGGPStake(address)
  const { data: straightRatio } = useGetCollateralizationRatio(address)

  const { isOpen, onClose, onOpen } = useDisclosure()
  const { isOpen: isOpenUnstake, onClose: onCloseUnstake, onOpen: onOpenUnstake } = useDisclosure()

  const { data: avaxBorrowed } = useGetAVAXAssigned(address)

  const ggpPrice = useGetGGPPrice()
  const ggpStakeInAVAX = ggpPrice.data ? ggpStake * ggpPrice.data : 0
  const { data: effectiveGGPStaked } = useGetEffectiveGGPStaked(address)
  console.log('effective', effectiveGGPStaked)

  const stats = [
    {
      name: 'GGP collateral ratio',
      stat: `${avaxStake ? (straightRatio || 0).toLocaleString() : 0}%`,
    },
    { name: 'Total GGP staked', stat: `${ggpStake.toLocaleString()} GGP` },
    { name: 'Total GGP staked converted to AVAX', stat: `${ggpStakeInAVAX.toLocaleString()} AVAX` },
    { name: 'Borrowing', stat: `${avaxBorrowed.toLocaleString()} AVAX` },
  ]

  return (
    <>
      <div className="flex w-full items-center space-x-4">
        <h3 className="text-base font-semibold leading-6 text-gray-900">Stake Information</h3>
        <div className="flex space-x-4">
          <Button onClick={onOpen} size="xs" variant="secondary-outline">
            Stake {ggpStake ? 'more' : ''}
          </Button>
          <Tooltip content={!ggpStake ? 'You do not have any GGP staked' : ''}>
            {/* this should maybe be more explicit. we should allow them to unstake if they are above 150% colalteralization */}
            {/* so then I should show collateralization in the main card */}
            <Button
              disabled={!ggpStake}
              onClick={onOpenUnstake}
              size="xs"
              variant="secondary-outline"
            >
              Unstake GGP
            </Button>
          </Tooltip>
        </div>
      </div>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
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
        <UnstakeModal isOpen={isOpenUnstake} onClose={onCloseUnstake} />
        <StakeModal isOpen={isOpen} onClose={onClose} />

        {!ggpStake && (
          <EmptyState
            description="Ready to start staking?"
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
                  d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            onClick={onOpen}
            title="Nothing staked"
          />
        )}
      </dl>
    </>
  )
}

export default TotalStaked
