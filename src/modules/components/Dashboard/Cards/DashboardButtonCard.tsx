import { ReactNode } from 'react'

import { Card } from '@chakra-ui/react'

import { colors } from '@/theme/colors'

type Props = {
  cardTitle: ReactNode
  button1: ReactNode
  button2?: ReactNode
  children: ReactNode
}

export default function DashboardButtonCard({ button1, button2, cardTitle, children }: Props) {
  return (
    <Card
      backgroundColor={'white'}
      border={'1px'}
      borderColor={colors.blue[100]}
      borderRadius={16}
      className="min-h-[340px] grow basis-[440px] p-6"
      shadow={'sm'}
    >
      <div className="flex flex-wrap content-center items-center justify-between gap-y-2">
        <div className="flex">{cardTitle}</div>
        <div className="flex flex-wrap gap-2">
          {button1}
          {button2}
        </div>
      </div>
      {children}
    </Card>
  )
}
