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
import { useAccount, useWaitForTransaction } from 'wagmi'

import ApproveButton from '../../Wizard/components/ApproveButton'
import { StakeModalFailure } from './StakeModalFailure'
import { StakeModalForm } from './StakeModalForm'
import { StakeModalPending } from './StakeModalPending'
import { StakeModalSuccess } from './StakeModalSuccess'

import { Button } from '@/common/components/Button'
import { Title } from '@/common/components/Card'
import useGGPAllowance from '@/hooks/allowance'
import { useStakeGGP } from '@/hooks/useStake'

interface StakeModalProps {
  onClose(): void
}

export const StakeModal: FunctionComponent<StakeModalProps> = ({ onClose }) => {
  const [stakeAmount, setStakeAmount] = useState(BigNumber.from(0))
  const { address: account } = useAccount()
  const { data: ggpAllowance } = useGGPAllowance(account)
  const {
    data: stakeData,
    isLoading: isStakeLoading,
    refetch,
    reset,
    write: stake,
  } = useStakeGGP(stakeAmount)
  const { isError, isLoading, isSuccess } = useWaitForTransaction({
    hash: stakeData?.hash,
  })

  const hasStake = stakeData !== undefined
  const allowance = ggpAllowance || BigNumber.from(0)

  const handleClose = useCallback(() => {
    onClose()
    reset()
    setStakeAmount(BigNumber.from(0))
  }, [onClose, reset])

  const handleStakeChange = useCallback((value: BigNumber) => {
    setStakeAmount(value)
  }, [])

  return (
    <ChakraModal isCentered isOpen={true} onClose={handleClose}>
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent border="0px" maxWidth="600px" p="0">
        <ModalHeader bg="blue.500" borderTopRadius="1rem" py="8">
          <Title color="white" fontSize={24}>
            Stake More
          </Title>
        </ModalHeader>
        <ModalBody p="0">
          {!hasStake && <StakeModalForm onChange={handleStakeChange} stakeAmount={stakeAmount} />}
          {hasStake && isLoading && (
            <StakeModalPending stakeAmount={stakeAmount} transactionHash={stakeData?.hash} />
          )}
          {hasStake && isError && <StakeModalFailure transactionHash={stakeData?.hash} />}
          {hasStake && isSuccess && (
            <StakeModalSuccess stakeAmount={stakeAmount} transactionHash={stakeData?.hash} />
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
            {!isSuccess &&
              !isError &&
              (allowance.gte(stakeAmount) ? (
                <Button
                  color="white"
                  disabled={hasStake || stakeAmount.lte(0) || !stake || isLoading}
                  isLoading={isStakeLoading}
                  onClick={stake}
                  size="sm"
                  variant="primary"
                  width="120px"
                >
                  Stake
                </Button>
              ) : (
                <ApproveButton
                  amount={stakeAmount}
                  setApproveStatus={() => {
                    refetch()
                  }}
                />
              ))}
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
