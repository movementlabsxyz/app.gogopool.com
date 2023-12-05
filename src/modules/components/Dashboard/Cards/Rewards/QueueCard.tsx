import { Text } from '@chakra-ui/react'
import Image from 'next/image'
import registerNode from 'public/assets/img/large_assets/register-node.png'

import CardTitle from '../CardTitle'
import DashboardCard from '../DashboardCard'
import { TrophyIcon } from './TrophyIcon'

import { ordinal_suffix } from '@/utils/misc'

export type Props = {
  minipoolIndex: number
  nextCycleDate: Date
}

export default function QueueCard({ minipoolIndex, nextCycleDate }: Props) {
  return (
    <DashboardCard cardTitle={<CardTitle icon={TrophyIcon} title="My Rewards" />}>
      <div className="flex w-full justify-between gap-3">
        {' '}
        <div className="flex w-[400px] flex-col justify-center pl-6">
          <Text fontSize={18} fontWeight={700}>
            Your validator is{' '}
            <span className="text-blue-400">{ordinal_suffix(minipoolIndex + 1)}</span> in the queue!
          </Text>
          <Text className="pt-2" fontSize={14}>
            We are currently looking for 1000 AVAX to match in order to launch your node. In order
            to qualify for GGP rewards your Minipool must be <b>launched</b> before&nbsp;
            <b>
              {nextCycleDate.toLocaleDateString()} {nextCycleDate.toLocaleTimeString()}
            </b>{' '}
            in order to receive rewards for this cycle.
          </Text>
        </div>
        <div className="pr-6 pb-6">
          <Image alt="Node in Queue" src={registerNode} width={225} />
        </div>
      </div>
    </DashboardCard>
  )
}
