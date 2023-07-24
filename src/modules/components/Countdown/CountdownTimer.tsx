import { Text } from '@chakra-ui/react'

import CountdownNumber from './CountdownNumber'

import CalendarCheck from '@/common/components/CustomIcon/CalendarCheck'
import CalendarClose from '@/common/components/CustomIcon/CalendarClose'
import { useGetRewardCycleLength, useRewardCycleStartTime } from '@/hooks/useRewards'

const daysInMillis = 1000 * 60 * 60 * 24

export default function CountdownTimer() {
  const {
    data: cycleStart,
    isError: startError,
    isLoading: startLoading,
  } = useRewardCycleStartTime()
  const {
    data: cycleLength,
    isError: lengthError,
    isLoading: lengthLoading,
  } = useGetRewardCycleLength()

  if (startLoading || lengthLoading) {
    return (
      <Text className="font-domaine text-blue-900" fontSize={32}>
        ...Timer Loading
      </Text>
    )
  }
  if (!cycleLength || !cycleStart) {
    return (
      <Text className="font-domaine text-blue-900" fontSize={32}>
        Please connect to an <span className="text-red-500">AVAX</span> wallet.
      </Text>
    )
  }
  if (startError || lengthError) {
    return (
      <Text className="font-domaine text-blue-900" fontSize={32}>
        An Error Occurred
      </Text>
    )
  }

  const cycleStartMillis = Number(cycleStart.toString()) * 1000
  const cycleLengthMillis = Number(cycleLength.toString()) * 1000
  const millisUntilCutoff = cycleStartMillis + cycleLengthMillis / 2 - Date.now()

  let countdownSubtitle1 = 'YOU ARE ELIGIBLE FOR REWARDS THIS CYCLE!'
  let countdownSubtitle2 = 'ELIGIBILITY ENDS IN:'
  let daysUntilCutoff = millisUntilCutoff / daysInMillis

  if (millisUntilCutoff <= 0) {
    countdownSubtitle1 = 'MISSED ELIGIBILITY FOR REWARDS THIS CYCLE!'
    countdownSubtitle2 = 'ELIGIBILITY STARTS IN:'
    daysUntilCutoff = (cycleStartMillis + cycleLengthMillis - Date.now()) / daysInMillis
  }

  const hoursUntilCutoff = (daysUntilCutoff % 1) * 24
  const minutesUntilCutoff = (hoursUntilCutoff % 1) * 60
  const secondsUntilCutoff = (minutesUntilCutoff % 1) * 60

  return (
    <div>
      <div className="flex tracking-wide text-[#9499C2]">
        <span className="pr-2 pt-1">
          {millisUntilCutoff < 0 ? <CalendarClose /> : <CalendarCheck />}
        </span>
        <div>
          <Text fontSize={14} fontWeight={800}>
            {countdownSubtitle1}
          </Text>
          <Text fontSize={14} fontWeight={800}>
            {countdownSubtitle2}
          </Text>
        </div>
      </div>
      <Text className="flex pb-4 text-blue-900" fontSize={60} fontWeight="bold">
        <CountdownNumber number={Math.floor(daysUntilCutoff)} subtitle="DAYS" />
        <div className="px-4 text-[#949CC2]">:</div>
        <CountdownNumber number={Math.floor(hoursUntilCutoff)} subtitle="HRS" />
        <div className="px-4 text-[#949CC2]">:</div>
        <CountdownNumber number={Math.floor(minutesUntilCutoff)} subtitle="MINS" />
        <div className="px-4 text-[#949CC2]">:</div>
        <CountdownNumber number={Math.floor(secondsUntilCutoff)} subtitle="SECS" />
      </Text>
    </div>
  )
}
