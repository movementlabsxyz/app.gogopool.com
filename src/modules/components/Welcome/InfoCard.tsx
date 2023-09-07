import { ReactNode } from 'react'

import { Text } from '@chakra-ui/react'

type Props = {
  button: ReactNode
  icon: ReactNode
  summary: string
  title: string
}
export default function InfoCard({ button, icon, summary, title }: Props) {
  return (
    <div className="flex basis-[455px] flex-col justify-center rounded-xl border border-blue-100 bg-white px-16 py-8">
      <div className="flex justify-center pb-2">{icon}</div>
      <Text className="flex justify-center text-center text-lg font-bold text-blue-900">
        {title}
      </Text>
      <Text className="flex text-center text-default">{summary}</Text>
      <div className="flex justify-center pt-4">{button}</div>
    </div>
  )
}
