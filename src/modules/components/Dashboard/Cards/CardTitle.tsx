import { ReactNode } from 'react'

import { Text } from '@chakra-ui/react'

type Props = {
  icon: ReactNode
  title: string
  subtitle?: string
}

export default function CardTitle({ icon, subtitle, title }: Props) {
  return (
    <div className="flex items-center gap-3">
      <div>{icon}</div>
      <div className="flex flex-col justify-center">
        <Text className="font-domaine text-2xl font-semibold">{title}</Text>
        <span className="text-sm text-blue-400">{subtitle}</span>
      </div>
    </div>
  )
}
