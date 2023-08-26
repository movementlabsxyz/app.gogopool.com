import { BigNumber } from 'ethers'
import { useState } from 'react'

import { useAccount, useWaitForTransaction } from 'wagmi'

import { FailedClaim } from './ClaimAndRestake/FailedClaim'
import { PendingStake } from './ClaimAndRestake/PendingStake'
import { SuccessfulClaim } from './ClaimAndRestake/SuccessfulClaim'
import { UnstakeInput } from './UnstakeInput/UnstakeInput'

import { Modal } from '@/common/components/Modal'
import { useGetGGPRewards, useGetGGPStake, useWithdrawGGP } from '@/hooks/useStake'

export const UnstakeModal = ({ isOpen, onClose, ...modalProps }) => {
  const [withdrawAmount, setWithdrawAmount] = useState(BigNumber.from(0))

  const { address } = useAccount()
  const { data: rewardsToClaim } = useGetGGPRewards(address)

  const { data: ggpStakeMaybe } = useGetGGPStake(address)
  const ggpStake = ggpStakeMaybe

  const { data: claimData, reset, write: withdraw } = useWithdrawGGP(withdrawAmount)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: claimData?.hash,
  })

  const handleClose = () => {
    onClose()
    reset()
    setWithdrawAmount(BigNumber.from(0))
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} {...modalProps}>
      {!claimData?.hash && (
        <UnstakeInput
          ggpStake={ggpStake}
          onClose={handleClose}
          rewardsToClaim={rewardsToClaim}
          setWithdrawAmount={setWithdrawAmount}
          withdraw={withdraw}
          withdrawAmount={withdrawAmount}
        />
      )}
      {isLoading && claimData?.hash && (
        <PendingStake
          amount={withdrawAmount}
          message={'Unstaking:'}
          transactionHash={claimData?.hash}
        />
      )}
      {isSuccess && !isLoading && claimData?.hash && (
        <SuccessfulClaim onClose={handleClose} transactionHash={claimData?.hash} />
      )}
      {!isSuccess && !isLoading && claimData?.hash && (
        <FailedClaim transactionHash={claimData?.hash} />
      )}
    </Modal>
  )
}
