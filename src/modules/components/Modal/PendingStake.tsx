import { BigNumber } from 'ethers'
import { FunctionComponent } from 'react'

import { Flex, Text } from '@chakra-ui/react'

import { TransactionHash } from './TransactionHash'

import DepositAvaxIcon from '@/common/components/CustomIcon/DepositAvaxIcon'
import { HexString } from '@/types/cryptoGenerics'
import { displayBN } from '@/utils/numberFormatter'

export interface PendingStakeProps {
  amount: BigNumber
  transactionHash: HexString
  message: string
}

export const PendingStake: FunctionComponent<PendingStakeProps> = ({
  amount,
  message,
  transactionHash,
}) => {
  return (
    <Flex align="center" direction="column" gap={2}>
      <Text className="my-4 text-center font-domaine font-bold" fontSize={30}>
        Things are happening...
      </Text>

      <DepositAvaxIcon />

      <div className="mb-6 flex w-full justify-between border-b border-dashed border-gray-400 pb-2">
        <span>{`${message}`}</span>
        {displayBN(amount)}
      </div>
      <TransactionHash transactionHash={transactionHash} />
    </Flex>
  )
}
