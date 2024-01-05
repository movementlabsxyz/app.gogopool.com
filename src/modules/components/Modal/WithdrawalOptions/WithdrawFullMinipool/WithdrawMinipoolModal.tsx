import { FunctionComponent, useEffect } from 'react'

import {
  Button,
  Divider,
  Flex,
  HStack,
  Image,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spacer,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { formatUnits } from 'ethers/lib/utils'
import { useWaitForTransaction } from 'wagmi'

import WithdrawMinipoolPendingModal from './WithdrawMinipoolPendingModal'

import { Title } from '@/common/components/Card'
import { useWithdrawMinipoolFunds } from '@/hooks/minipool'
interface WithdrawMinipoolModalProps {
  onClose(): void
  minipool
  setTransactionData
  setWithdrawError
  setShowSuccessfulWithdraw
  setShowWithdrawMinipool
}

export const WithdrawMinipoolModal: FunctionComponent<WithdrawMinipoolModalProps> = ({
  minipool,
  onClose,
  setShowSuccessfulWithdraw,
  setShowWithdrawMinipool,
  setTransactionData,
  setWithdrawError,
}) => {
  const { data: withdrawData, write: withdraw } = useWithdrawMinipoolFunds(minipool.nodeID)
  const { isError, isLoading, isSuccess } = useWaitForTransaction({
    hash: withdrawData?.hash,
  })
  const toast = useToast()
  useEffect(() => {
    if (isLoading) {
      setTransactionData(withdrawData?.hash)
    } else if (isSuccess) {
      setTransactionData(withdrawData?.hash)
      // Handle successful transaction
      toast({
        title: 'Transaction sent',
        description: 'Your withdraw was successful. The funds should be in your wallet',
        status: 'info',
        duration: 50000,
        isClosable: true,
      })
      setTransactionData(withdrawData?.hash)
      setShowSuccessfulWithdraw(true)
      setShowWithdrawMinipool(false)
    } else if (isError) {
      setWithdrawError(true)
      setTransactionData(withdrawData?.hash)
      // Handle transaction error
      toast({
        title: 'Error',
        description: 'An error occurred during the transaction.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }, [
    setWithdrawError,
    isLoading,
    isSuccess,
    isError,
    setTransactionData,
    toast,
    setShowSuccessfulWithdraw,
    setShowWithdrawMinipool,
    withdrawData?.hash,
  ])

  return (
    <>
      {isLoading ? (
        <WithdrawMinipoolPendingModal />
      ) : (
        <div>
          <ModalHeader bg="blue.500" borderTopRadius="1rem" py="8">
            <Title color="white" fontSize={24}>
              Withdraw to Wallet
            </Title>
            <Text color="white" fontSize={12} opacity="60%">
              WITHDRAW OPTIONS
            </Text>
          </ModalHeader>
          <ModalBody p="0">
            <Stack align="center" gap={2} p="6">
              <HStack>
                <Image
                  alt="Minipool Complete"
                  height={255.52}
                  src="/assets/img/withdrawMinipoolOptions/avaxToWallet.svg"
                  width={452}
                />
                <Text align={'center'} className="text-md">
                  You are about to withdraw{' '}
                  <span className="font-bold">
                    {formatUnits(minipool.avaxNodeOpAmt.add(minipool.avaxNodeOpRewardAmt))} AVAX to
                    the connected wallet{' '}
                  </span>{' '}
                  address. Be sure to confirm the transaction in your wallet.
                </Text>
              </HStack>
            </Stack>
          </ModalBody>
          <Divider borderColor="blue.100" />
          <ModalFooter>
            <Flex alignItems="center" width="100%">
              <Button
                className="underline"
                color="blue.400"
                onClick={onClose}
                size="sm"
                variant="link"
              >
                Close
              </Button>
              <Spacer />
              <Button onClick={withdraw} size="sm" variant="primary">
                Confirm Withdraw
              </Button>
            </Flex>
          </ModalFooter>
        </div>
      )}
    </>
  )
}
