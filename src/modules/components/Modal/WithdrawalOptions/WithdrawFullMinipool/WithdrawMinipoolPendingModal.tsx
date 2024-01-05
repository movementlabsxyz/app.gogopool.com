import { ModalBody, ModalHeader, Progress, Stack, Text } from '@chakra-ui/react'
import Image from 'next/image'
import avaxMountains from 'public/assets/img/large_assets/balloon-mountains.png'

import { Title } from '@/common/components/Card'

export default function WithdrawMinipoolPendingModal() {
  return (
    <>
      <ModalHeader bg="blue.500" borderTopRadius="1rem" py="8">
        <Title color="white" fontSize={24}>
          Withdraw to Wallet
        </Title>
        <Text color="white" fontSize={12} opacity="60%">
          WITHDRAW OPTIONS
        </Text>
      </ModalHeader>
      <ModalBody p="0">
        {' '}
        <Stack align="center" gap={2} p="20">
          <Image alt={'AVAX carried by GoGoPool Balloon'} src={avaxMountains} width={150} />
          <Text fontSize={18} fontWeight={700}>
            Withdrawing funds to wallet...
          </Text>
          <Progress
            borderRadius={5}
            colorScheme="success"
            isIndeterminate
            size="sm"
            width="200px"
          />
        </Stack>
      </ModalBody>
    </>
  )
}
