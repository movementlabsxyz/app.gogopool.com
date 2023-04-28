import { CopyIcon } from '@chakra-ui/icons'
import { Flex, Text, useToast } from '@chakra-ui/react'
import { shortenTransactionHash } from '@usedapp/core'

import { Button } from '@/common/components/Button'

export const TransactionHash = ({ transactionHash }) => {
  const toast = useToast()

  const copyTransaction = () => {
    navigator.clipboard.writeText(transactionHash)
    toast({
      position: 'top',
      description: 'Copied!',
      status: 'info',
      duration: 2000,
      isClosable: true,
    })
  }

  return (
    <div>
      <Button variant="secondary-filled">
        <Flex
          alignItems="center"
          className="w-full"
          direction={'row'}
          gap={2}
          justify="center"
          onClick={copyTransaction}
        >
          <Flex direction={'row'} justify="center">
            <Text>Transaction hash:&nbsp;</Text>
            <Text style={{ cursor: 'pointer' }} textAlign="center">
              {' '}
              {transactionHash && shortenTransactionHash(transactionHash)}
            </Text>
          </Flex>
          <div style={{ cursor: 'pointer' }}>
            <CopyIcon />
          </div>
        </Flex>
      </Button>
    </div>
  )
}
