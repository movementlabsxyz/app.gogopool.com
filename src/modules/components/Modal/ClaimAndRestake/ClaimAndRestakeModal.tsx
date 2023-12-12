import { BigNumber } from 'ethers'
import { FunctionComponent, useState } from 'react'

import {
  Box,
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

import { ClaimAndRestakeModalFailure } from './ClaimAndRestakeModalFailure'
import { ClaimAndRestakeModalPending } from './ClaimAndRestakeModalPending'
import { ClaimAndRestakeModalSuccess } from './ClaimAndRestakeModalSuccess'
import ClaimRestakeStepOne from './ClaimRestakeStepOne'
import ClaimRestakeStepTwo from './ClaimRestakeStepTwo'
import SimpleSteps from './SimpleSteps'

import { Button } from '@/common/components/Button'
import { Title } from '@/common/components/Card'
import { useClaimAndRestake } from '@/hooks/useClaimNodeOp'
import { useGetFutureRatio } from '@/hooks/useGetFutureRatio'
import { useGetContractCollateralizationRatio, useGetGGPRewards } from '@/hooks/useStake'

interface ClaimAndRestakeModalProps {
  onClose(): void
}

export const ClaimAndRestakeModal: FunctionComponent<ClaimAndRestakeModalProps> = ({ onClose }) => {
  const { address: account } = useAccount()
  const { data: rewardsToClaimMaybe } = useGetGGPRewards(account)
  const rewardsToClaim = rewardsToClaimMaybe || BigNumber.from(0)
  const { data: straightRatio } = useGetContractCollateralizationRatio(account)

  const [currentStep, setCurrentStep] = useState(1)
  const [restakeAmount, setRestakeAmount] = useState<BigNumber>(BigNumber.from(0))
  const [claimAmount, setClaimAmount] = useState<BigNumber>(rewardsToClaim)

  const {
    data: claimData,
    isLoading: isApproving,
    reset,
    write: claim,
  } = useClaimAndRestake(claimAmount, restakeAmount, () => setCurrentStep(3))
  const { isError, isLoading, isSuccess } = useWaitForTransaction({
    hash: claimData?.hash,
  })
  const futureRatio = useGetFutureRatio({
    additionalGgp: restakeAmount,
  })
  const hasClaim = claimData !== undefined

  const setRestakeAndClaim = (val: BigNumber) => {
    setRestakeAmount(val || BigNumber.from(0))
    setClaimAmount(rewardsToClaim.sub(val))
  }

  const handleClose = () => {
    onClose()
    reset()
    setClaimAmount(rewardsToClaim)
    setRestakeAmount(BigNumber.from(0))
    setCurrentStep(1)
  }

  return (
    <ChakraModal isCentered isOpen={true} onClose={handleClose}>
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent border="0px" maxWidth="600px" p="0">
        <ModalHeader bg="blue.500" borderTopRadius="1rem" py="8">
          <Title color="white" fontSize={24}>
            Claim and Restake
          </Title>
        </ModalHeader>
        <ModalBody p="0">
          {currentStep < 3 && (
            <Box px="6" py="5">
              <SimpleSteps currentStep={currentStep} numSteps={3} />
            </Box>
          )}
          <Divider borderColor="blue.100" />
          {currentStep === 1 && (
            <ClaimRestakeStepOne
              claimAmount={claimAmount}
              futureRatio={futureRatio}
              restakeAmount={restakeAmount}
              rewardsToClaim={rewardsToClaim}
              setRestakeAndClaim={setRestakeAndClaim}
              straightRatio={straightRatio}
            />
          )}
          {currentStep === 2 && (
            <ClaimRestakeStepTwo
              claimAmount={claimAmount}
              futureRatio={futureRatio}
              restakeAmount={restakeAmount}
              straightRatio={straightRatio}
            />
          )}
          {currentStep === 3 && isLoading && (
            <ClaimAndRestakeModalPending restakeAmount={restakeAmount} />
          )}
          {currentStep === 3 && isError && (
            <ClaimAndRestakeModalFailure transactionHash={claimData.hash} />
          )}
          {currentStep === 3 && isSuccess && (
            <ClaimAndRestakeModalSuccess
              claimAmount={claimAmount}
              restakeAmount={restakeAmount}
              transactionHash={claimData.hash}
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
            {/* STEP 1 ACTIONS */}
            {currentStep === 1 && (
              <Button
                color="white"
                disabled={false}
                isLoading={isLoading}
                onClick={() => {
                  setCurrentStep((prev) => prev + 1)
                }}
                size="sm"
                variant="secondary-filled"
                width="120px"
              >
                Next
              </Button>
            )}
            {/* STEP 2 ACTIONS */}
            {currentStep === 2 && (
              <>
                <Button
                  className="underline"
                  color="blue.400"
                  mr="3"
                  onClick={() => {
                    setCurrentStep((prev) => prev - 1)
                  }}
                  size="sm"
                  variant="link"
                >
                  Back
                </Button>
                <Button
                  disabled={isApproving || !claim || hasClaim}
                  isLoading={isApproving}
                  onClick={() => {
                    claim()
                  }}
                  size="sm"
                  variant="primary"
                >
                  Confirm Transaction
                </Button>
              </>
            )}
            {/* STEP 3 ACTIONS */}
            {/* TODO: Add error buttons separate from the success buttons */}
            {/* {currentStep === 3 && isError } */}
            {currentStep === 3 && (isSuccess || isError) && (
              <Button onClick={handleClose} size="sm" variant="secondary-filled">
                View Dashboard
              </Button>
            )}
          </Flex>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  )
}
