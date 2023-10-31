import { Progress, Stack, Text } from '@chakra-ui/react'
import Image from 'next/image'
import claimAndRestake from 'public/assets/img/large_assets/claim-and-restake.svg'

export const ClaimAndRestakeModalPending = () => {
  return (
    <Stack align="center" gap={2} p="20">
      <Image alt="Pending" height={251} src={claimAndRestake} width={353} />
      <Text fontSize={18} fontWeight={700}>
        Restaking Funds to Minipool
      </Text>
      <Progress borderRadius={5} colorScheme="success" isIndeterminate size="sm" width="200px" />
    </Stack>
  )
}
