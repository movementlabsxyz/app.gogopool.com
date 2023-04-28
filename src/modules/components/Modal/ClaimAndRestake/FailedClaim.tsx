import { FunctionComponent } from 'react'

import { Flex, Text } from '@chakra-ui/react'

import { TransactionHash } from '../TransactionHash'

export interface FailedClaimProps {
  transactionHash: any
}

export const FailedClaim: FunctionComponent<FailedClaimProps> = ({ transactionHash }) => {
  return (
    <Flex align="center" direction="column" gap={2}>
      <Text fontSize={'xl'}>Claim and Restake failed</Text>
      <TransactionHash transactionHash={transactionHash} />
    </Flex>
  )
}
