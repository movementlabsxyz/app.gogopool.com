import { Stack, Text } from '@chakra-ui/react'
import Image from 'next/image'

import { TransactionHash } from '../TransactionHash'

import fixingGogos from '/public/assets/img/large_assets/fixing-gogos.svg'

import { HexString } from '@/types/cryptoGenerics'

type Props = {
  transactionHash: HexString
  message: string
}

export const GenericFailureModal = ({ message, transactionHash }: Props) => {
  return (
    <Stack align="center" gap={2} p="20">
      <Image alt="Something went wrong." src={fixingGogos} width={200} />
      <Text fontSize={18} fontWeight={700} textAlign={'center'}>
        {message}
      </Text>
      <TransactionHash transactionHash={transactionHash} />
    </Stack>
  )
}
