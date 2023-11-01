import { useEffect, useState } from 'react'

import { Text } from '@chakra-ui/react'
import { BiTimeFive } from 'react-icons/bi'

const daysInMillis = 1000 * 60 * 60 * 24
export default function CountdownTimerHeader({ ceresData }) {
  const rewardsStartDateMillis = ceresData.rewardsCycleStartTime.value * 1000
  const nextCycleStartMillis = rewardsStartDateMillis + daysInMillis * 30
  const countdownToStart = nextCycleStartMillis - Date.now()

  const [countdownMs, setCountdownMs] = useState(countdownToStart)
  useEffect(() => {
    setTimeout(() => {
      setCountdownMs((prev) => prev - 1000)
    }, 1000)
  }, [countdownMs])

  const daysUntilCutoff = countdownMs / daysInMillis
  const hoursUntilCutoff = (daysUntilCutoff % 1) * 24
  const minutesUntilCutoff = (hoursUntilCutoff % 1) * 60
  const secondsUntilCutoff = (minutesUntilCutoff % 1) * 60

  return (
    <div className="flex flex-col items-center tracking-wide text-blue-900">
      <div className="flex items-center gap-2">
        <span className="pt-0.5">
          <BiTimeFive size={24} />
        </span>
        <Text className="hidden md:flex" fontSize={14} fontWeight={800}>
          REWARDS IN:
        </Text>
        <Text fontSize={14} fontWeight={800} textAlign={'center'}>
          {Math.floor(daysUntilCutoff)} DAYS |
        </Text>
        <Text fontSize={14} fontWeight={800} textAlign={'center'}>
          {Math.floor(hoursUntilCutoff)} HOURS |
        </Text>
        <Text fontSize={14} fontWeight={800} textAlign={'center'}>
          {Math.floor(minutesUntilCutoff)} MINS |
        </Text>
        <Text fontSize={14} fontWeight={800} textAlign={'center'}>
          {Math.floor(secondsUntilCutoff)} SECS
        </Text>
      </div>
    </div>
  )
}
