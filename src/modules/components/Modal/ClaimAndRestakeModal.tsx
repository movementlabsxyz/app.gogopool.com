import { BigNumber } from 'ethers'
import { useEffect, useState } from 'react'

import { useAccount, useWaitForTransaction } from 'wagmi'

import ClaimRestakeStepOne from './ClaimAndRestake/ClaimRestakeStepOne'
import ClaimRestakeStepTwo from './ClaimAndRestake/ClaimRestakeStepTwo'
import { FailedClaim } from './ClaimAndRestake/FailedClaim'
import { SuccessfulClaim } from './ClaimAndRestake/SuccessfulClaim'

import { Modal } from '@/common/components/Modal'
import { useClaimAndRestake } from '@/hooks/useClaimNodeOp'
import { useGetFutureRatio } from '@/hooks/useGetFutureRatio'
import { useGetContractCollateralizationRatio } from '@/hooks/useStake'

export const ClaimAndRestakeModal = ({ isOpen, onClose, rewardsToClaim, ...modalProps }) => {
  const [currentStep, setCurrentStep] = useState(1)

  const [claimAmount, setClaimAmount] = useState<BigNumber>(rewardsToClaim)
  const [restakeAmount, setRestakeAmount] = useState<BigNumber>(BigNumber.from(0))

  useEffect(() => {
    setClaimAmount(rewardsToClaim.sub(restakeAmount))
  }, [rewardsToClaim, restakeAmount])

  const setRestakeAndClaim = (val: BigNumber) => {
    setRestakeAmount(val || BigNumber.from(0))
    setClaimAmount(rewardsToClaim.sub(val))
  }

  const { address: account } = useAccount()
  const { data: straightRatio } = useGetContractCollateralizationRatio(account)
  const futureRatio = useGetFutureRatio({
    additionalGgp: restakeAmount,
  })

  const { data: claimData, reset, write: claim } = useClaimAndRestake(claimAmount, restakeAmount)

  const { isLoading: transactionLoading, isSuccess: transactionSuccess } = useWaitForTransaction({
    hash: claimData?.hash,
  })

  const handleClose = () => {
    onClose()
    reset()
    setClaimAmount(rewardsToClaim)
    setRestakeAmount(BigNumber.from(0))
    setCurrentStep(1)
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} {...modalProps}>
      {currentStep === 1 && (
        <ClaimRestakeStepOne
          claimAmount={claimAmount}
          currentRatio={straightRatio.mul(100)}
          futureRatio={futureRatio}
          handleClose={handleClose}
          restakeAmount={restakeAmount}
          rewardsToClaim={rewardsToClaim}
          setCurrentStep={setCurrentStep}
          setRestakeAndClaim={setRestakeAndClaim}
        />
      )}
      {currentStep === 2 && !(transactionSuccess && !transactionLoading && claimData?.hash) && (
        <ClaimRestakeStepTwo
          claim={claim}
          claimAmount={claimAmount}
          claimData={claimData}
          futureRatio={futureRatio}
          restakeAmount={restakeAmount}
          setCurrentStep={setCurrentStep}
          transactionLoading={transactionLoading}
        />
      )}
      {transactionSuccess && !transactionLoading && claimData?.hash && (
        <SuccessfulClaim
          collateralization={straightRatio.mul(100)}
          onClose={handleClose}
          staked={restakeAmount}
          transactionHash={claimData?.hash}
        />
      )}
      {!transactionSuccess && !transactionLoading && claimData?.hash && (
        <FailedClaim transactionHash={claimData?.hash} />
      )}
    </Modal>
  )
}
