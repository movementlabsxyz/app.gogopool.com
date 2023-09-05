import { Button } from '@chakra-ui/react'

import CountdownTimerHeader from './CountdownTimerHeader'

import { colors } from '@/theme/colors'
import { Ceres } from '@/types/ceres'

export type Props = {
  ceresData: Ceres
}

export default function DashboardHeader({ ceresData }: Props) {
  return (
    <div className="mx-[-24px] flex items-center justify-between border-b border-b-grey-300 bg-[#F7F9FF] p-8 py-6 align-middle std:hidden">
      <CountdownTimerHeader ceresData={ceresData} />
      <a
        className="hidden xs:flex"
        href="https://docs.gogopool.com/design/how-minipools-work/ggp-rewards"
        rel="noreferrer"
        target={'_blank'}
      >
        <Button
          background={'none'}
          border={'1px'}
          borderColor={colors.blue[100]}
          size="sm"
          variant="tertiary"
        >
          How do rewards work?
        </Button>
      </a>
      <a
        className="flex xs:hidden"
        href="https://docs.gogopool.com/design/how-minipools-work/ggp-rewards"
        rel="noreferrer"
        target={'_blank'}
      >
        <Button
          background={'none'}
          border={'1px'}
          borderColor={colors.blue[100]}
          paddingX={'2px'}
          size="sm"
          variant="tertiary"
        >
          ?
        </Button>
      </a>
    </div>
  )
}
