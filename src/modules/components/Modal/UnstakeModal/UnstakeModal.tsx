import { BigNumber } from 'ethers'
import { FunctionComponent, useCallback, useState } from 'react'

import {
  Modal as ChakraModal,
  Divider,
  Flex,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
} from '@chakra-ui/react'
import { useWaitForTransaction } from 'wagmi'

import { UnstakeModalFailure } from './UnstakeModalFailure'
import { UnstakeModalForm } from './UnstakeModalForm'
import { UnstakeModalPending } from './UnstakeModalPending'
import { UnstakeModalSuccess } from './UnstakeModalSuccess'

import { Button } from '@/common/components/Button'
import { Title } from '@/common/components/Card'
import { useMaxWithdrawAmount } from '@/hooks/useMaxWithdrawAmount'
import { useWithdrawGGP } from '@/hooks/useStake'

interface UnstakeModalProps {
  onClose(): void
}

export const UnstakeModal: FunctionComponent<UnstakeModalProps> = ({ onClose }) => {
  const [withdrawAmount, setWithdrawAmount] = useState(BigNumber.from(0))
  const { data: claimData, reset, write: withdraw } = useWithdrawGGP(withdrawAmount)
  const { isError, isLoading, isSuccess } = useWaitForTransaction({
    hash: claimData?.hash,
  })

  const hasClaim = claimData !== undefined

  const handleClose = useCallback(() => {
    onClose()
    reset()
    setWithdrawAmount(BigNumber.from(0))
  }, [onClose, reset])

  const maxWithdraw = useMaxWithdrawAmount()
  const handleWithdrawChange = useCallback((value: BigNumber) => {
    setWithdrawAmount(value)
  }, [])

  return (
    <ChakraModal isCentered isOpen={true} onClose={handleClose}>
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent border="0px" maxWidth="600px" p="0">
        <ModalHeader bg="blue.500" borderTopRadius="1rem" py="8">
          <Title color="white" fontSize={24}>
            Unstake
          </Title>
        </ModalHeader>
        <ModalBody p="0">
          {!hasClaim && (
            <UnstakeModalForm onChange={handleWithdrawChange} withdrawAmount={withdrawAmount} />
          )}
          {hasClaim && isLoading && (
            <UnstakeModalPending
              transactionHash={claimData?.hash}
              withdrawAmount={withdrawAmount}
            />
          )}
          {hasClaim && isError && <UnstakeModalFailure transactionHash={claimData?.hash} />}
          {hasClaim && isSuccess && (
            <UnstakeModalSuccess
              transactionHash={claimData?.hash}
              withdrawAmount={withdrawAmount}
            />
          )}
        </ModalBody>
        <Divider borderColor="blue.100" />
        <ModalFooter>
          <Flex alignItems="center" width="100%">
            <Button
              className="underline"
              color="blue.400"
              onClick={handleClose}
              size="sm"
              variant="link"
            >
              {isSuccess || isError ? 'Close' : 'Cancel'}
            </Button>
            <Spacer />
            {!isSuccess && !isError && (
              <Button
                _hover={{ backgroundColor: 'orange.700' }}
                backgroundColor="orange.600"
                color="white"
                disabled={withdrawAmount.gt(maxWithdraw) || !withdraw || isLoading}
                isLoading={isLoading}
                onClick={withdraw}
                size="sm"
                variant="primary"
                width="120px"
              >
                Unstake
              </Button>
            )}
            {(isSuccess || isError) && (
              <Button
                _hover={{ backgroundColor: 'blue.600' }}
                backgroundColor="blue.500"
                color="white"
                onClick={handleClose}
                size="sm"
                variant="primary"
              >
                View Dashboard
              </Button>
            )}
          </Flex>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  )
}
