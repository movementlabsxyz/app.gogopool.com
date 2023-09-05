import { Text } from '@chakra-ui/react'
import { BiTimeFive } from 'react-icons/bi'

import CountdownNumber from './CountdownNumber'

const daysInMillis = 1000 * 60 * 60 * 24
export default function CountdownTimerNextCycle({ ceresData }) {
  const rewardsStartDateMillis = ceresData.rewardsCycleStartTime.value * 1000
  const nextCycleStartMillis = rewardsStartDateMillis + daysInMillis * 30
  const countdownToStart = nextCycleStartMillis - Date.now()

  const daysUntilCutoff = countdownToStart / daysInMillis
  const hoursUntilCutoff = (daysUntilCutoff % 1) * 24
  const minutesUntilCutoff = (hoursUntilCutoff % 1) * 60
  const secondsUntilCutoff = (minutesUntilCutoff % 1) * 60

  return (
    <div className="flex flex-col items-center tracking-wide text-[#9499C2]">
      <div className="flex gap-2">
        <span className="pt-0.5">
          <BiTimeFive size={16} />
        </span>
        <Text fontSize={14} fontWeight={800}>
          TIME TO REWARDS
        </Text>
      </div>
      <span className="flex gap-x-5 p-4 font-bold text-blue-900">
        <CountdownNumber font="font-jost" number={Math.floor(daysUntilCutoff)} subtitle="DAYS" />
        <CountdownNumber font="font-jost" number={Math.floor(hoursUntilCutoff)} subtitle="HRS" />
        <CountdownNumber font="font-jost" number={Math.floor(minutesUntilCutoff)} subtitle="MINS" />
        <CountdownNumber font="font-jost" number={Math.floor(secondsUntilCutoff)} subtitle="SECS" />
      </span>
    </div>
  )
}
