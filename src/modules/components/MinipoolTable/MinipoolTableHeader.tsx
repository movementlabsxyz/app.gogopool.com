import { ReactNode } from 'react'

import { Th } from '@chakra-ui/react'

type Props = {
  color: string
  children: ReactNode
}

export default function MinipoolTableHeader({ children, color }: Props) {
  return <Th color={color}>{children}</Th>
}
