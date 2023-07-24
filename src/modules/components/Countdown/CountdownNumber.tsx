import { Text } from '@chakra-ui/react'

type Props = {
  number: number
  subtitle: 'DAYS' | 'HRS' | 'MINS' | 'SECS'
}

export default function CountdownNumber({ number, subtitle }: Props) {
  return (
    <div className="flex-col items-center text-center">
      <span className="font-domaine">{number}</span>
      <Text className="mt-[-12px]" fontSize={14}>
        {subtitle}
      </Text>
    </div>
  )
}
