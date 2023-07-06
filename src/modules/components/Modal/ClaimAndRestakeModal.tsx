import { BigNumberish } from 'ethers'
import { useState } from 'react'

import { formatEther, parseEther } from 'ethers/lib/utils'
import { useWaitForTransaction } from 'wagmi'

import ClaimRestakeStepOne from './ClaimAndRestake/ClaimRestakeStepOne'
import ClaimRestakeStepTwo from './ClaimAndRestake/ClaimRestakeStepTwo'
import { FailedClaim } from './ClaimAndRestake/FailedClaim'
import { SuccessfulClaim } from './ClaimAndRestake/SuccessfulClaim'

import { Modal } from '@/common/components/Modal'
import { useClaimAndRestake } from '@/hooks/useClaimNodeOp'
import { useGetCollateralRatio } from '@/hooks/useGetCollateralRatio'
import { useGetGGPRewards } from '@/hooks/useStake'

export const ClaimAndRestakeModal = ({ isOpen, onClose, ownerAddress, ...modalProps }) => {
  const [currentStep, setCurrentStep] = useState(1)

  const { data: rewardsToClaimMaybe } = useGetGGPRewards(ownerAddress)
  const rewardsToClaim = Number(formatEther((rewardsToClaimMaybe as BigNumberish) || 0))

  const [claimAmount, setClaimAmount] = useState(rewardsToClaim)
  const [restakeAmount, setRestakeAmount] = useState(0)

  const setRestakeAndClaim = (val: number) => {
    setRestakeAmount(val || 0)

    const claimAmount = Number(
      formatEther(parseEther(rewardsToClaim.toString()).sub(parseEther(val.toString())).toString()),
    )
    setClaimAmount(claimAmount)
  }

  const currentRatio = useGetCollateralRatio({ avaxAmount: 0, ggpAmount: 0 })

  const futureRatio = useGetCollateralRatio({
    ggpAmount: restakeAmount,
    avaxAmount: 0,
  })

  const {
    data: claimData,
    reset,
    write: claim,
  } = useClaimAndRestake(ownerAddress, parseEther(claimAmount?.toString() || '0'))

  const { isLoading: transactionLoading, isSuccess: transactionSuccess } = useWaitForTransaction({
    hash: claimData?.hash,
  })

  const handleClose = () => {
    onClose()
    reset()
    setClaimAmount(rewardsToClaim)
    setRestakeAmount(0)
    setCurrentStep(1)
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} {...modalProps}>
      {currentStep === 1 && (
        <ClaimRestakeStepOne
          claimAmount={claimAmount}
          currentRatio={currentRatio}
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
          collateralization={currentRatio}
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
