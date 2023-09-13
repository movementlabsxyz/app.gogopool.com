import { useEffect, useState } from 'react'

import { Text } from '@chakra-ui/react'

import CountdownNumber from './CountdownNumber'

import CalendarCheck from '@/common/components/CustomIcon/CalendarCheck'
import CalendarClose from '@/common/components/CustomIcon/CalendarClose'

const daysInMillis = 1000 * 60 * 60 * 24
export default function CountdownTimer({ ceresData }) {
  const cycleStartMs = ceresData.rewardsCycleSeconds.value * 1000
  const rewardsMs = ceresData.rewardsEligibilityMinSeconds.value * 1000
  const cutoffDateMs = cycleStartMs + rewardsMs

  const [msUntilCutoff, setMsUntilCutoff] = useState(cutoffDateMs - Date.now())
  const [countdownSub1, setCountdownSub1] = useState('YOU ARE ELIGIBLE FOR REWARDS THIS CYCLE!')
  const [countdownSub2, setCountdownSub2] = useState('ELIGIBILITY ENDS IN:')
  const [eligible, setEligible] = useState(true)

  useEffect(() => {
    if (msUntilCutoff >= 0) {
      setTimeout(() => {
        setMsUntilCutoff(msUntilCutoff - 1000)
      }, 1000)
    } else {
      setCountdownSub1('MISSED ELIGIBILITY FOR REWARDS THIS CYCLE!')
      setCountdownSub2('ELIGIBILITY STARTS IN:')
      setEligible(false)
      setMsUntilCutoff(msUntilCutoff + rewardsMs)
    }
  }, [msUntilCutoff, rewardsMs])

  const daysUntilCutoff = msUntilCutoff / daysInMillis
  const hoursUntilCutoff = (daysUntilCutoff % 1) * 24
  const minutesUntilCutoff = (hoursUntilCutoff % 1) * 60
  const secondsUntilCutoff = (minutesUntilCutoff % 1) * 60

  return (
    <div>
      <div className="flex tracking-wide text-[#9499C2]">
        <span className="pr-2 pt-1">{eligible ? <CalendarCheck /> : <CalendarClose />}</span>
        <div>
          <Text fontSize={14} fontWeight={800}>
            {countdownSub1}
          </Text>
          <Text fontSize={14} fontWeight={800}>
            {countdownSub2}
          </Text>
        </div>
      </div>
      <Text className="flex text-blue-900" fontSize={60} fontWeight="bold">
        <CountdownNumber
          fontSize="text-[60px]"
          number={Math.floor(daysUntilCutoff)}
          subtitle="DAYS"
        />
        <div className="px-4 text-[#949CC2]">:</div>
        <CountdownNumber
          fontSize="text-[60px]"
          number={Math.floor(hoursUntilCutoff)}
          subtitle="HRS"
        />
        <div className="px-4 text-[#949CC2]">:</div>
        <CountdownNumber
          fontSize="text-[60px]"
          number={Math.floor(minutesUntilCutoff)}
          subtitle="MINS"
        />
        <div className="px-4 text-[#949CC2]">:</div>
        <CountdownNumber
          fontSize="text-[60px]"
          number={Math.floor(secondsUntilCutoff)}
          subtitle="SECS"
        />
      </Text>
    </div>
  )
}
