import { FunctionComponent } from 'react'

import { Flex, Text } from '@chakra-ui/react'

import { TransactionHash } from '../TransactionHash'

import DepositAvaxIcon from '@/common/components/CustomIcon/DepositAvaxIcon'

export interface PendingStakeProps {
  amount: any
  transactionHash: any
  message: any
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
        {amount.toLocaleString(undefined, {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        })}
      </div>
      <TransactionHash transactionHash={transactionHash} />
    </Flex>
  )
}
