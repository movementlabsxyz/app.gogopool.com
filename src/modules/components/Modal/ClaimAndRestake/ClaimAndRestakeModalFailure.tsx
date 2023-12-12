import { Stack, Text } from '@chakra-ui/react'
import Image from 'next/image'

import { TransactionHash } from '../TransactionHash'

import fixingGogos from '/public/assets/img/large_assets/fixing-gogos.svg'

import { HexString } from '@/types/cryptoGenerics'

interface ClaimAndRestakeModalFailureProps {
  transactionHash: HexString
}

export const ClaimAndRestakeModalFailure = ({
  transactionHash,
}: ClaimAndRestakeModalFailureProps) => {
  return (
    <Stack align="center" gap={2} p="20">
      <Image alt="Something went wrong." src={fixingGogos} width={200} />
      <Text fontSize={18} fontWeight={700}>
        Claim and restake failed. Refresh the page and try again.
      </Text>
      <TransactionHash transactionHash={transactionHash} />
    </Stack>
  )
}
