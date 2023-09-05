import { ReactNode } from 'react'

import { Card } from '@chakra-ui/react'

import { colors } from '@/theme/colors'

type Props = {
  children: ReactNode
  cardTitle: ReactNode
}

export default function DashboardCard({ cardTitle, children }: Props) {
  return (
    <Card
      backgroundColor={'white'}
      border={'1px'}
      borderColor={colors.blue[100]}
      borderRadius={16}
      className="min-h-[340px] grow basis-[440px] p-6"
      shadow={'sm'}
    >
      <div className="flex justify-between">
        <div className="flex">{cardTitle}</div>
      </div>
      <div className="flex h-full flex-col items-center justify-center">{children}</div>
    </Card>
  )
}
