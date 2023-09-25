import { BigNumber } from 'ethers'

import { Box, Progress, Stack, Text } from '@chakra-ui/react'

import { TransactionHash } from '../TransactionHash'

import DepositAvaxIcon from '@/common/components/CustomIcon/DepositAvaxIcon'
import { HexString } from '@/types/cryptoGenerics'
import { displayBN } from '@/utils/numberFormatter'

interface StakeModalPendingProps {
  stakeAmount: BigNumber
  transactionHash: HexString
}

export const StakeModalPending = ({ stakeAmount, transactionHash }: StakeModalPendingProps) => {
  return (
    <Stack align="center" gap={2} p="20">
      <DepositAvaxIcon />
      <Text fontSize={18} fontWeight={700}>
        Attempting to stake {parseFloat(displayBN(stakeAmount, 18))} GGP...
      </Text>
      <Progress borderRadius={5} colorScheme="success" isIndeterminate size="sm" width="200px" />
      <Box pt="8">
        <TransactionHash transactionHash={transactionHash} />
      </Box>
    </Stack>
  )
}
