import { BigNumberish } from 'ethers'
import { useState } from 'react'

import { formatEther, parseEther } from 'ethers/lib/utils'
import { useAccount, useWaitForTransaction } from 'wagmi'

import { FailedClaim } from './ClaimAndRestake/FailedClaim'
import { PendingStake } from './ClaimAndRestake/PendingStake'
import { SuccessfulClaim } from './ClaimAndRestake/SuccessfulClaim'
import { UnstakeInput } from './UnstakeInput/UnstakeInput'

import { Modal } from '@/common/components/Modal'
import { useGetGGPRewards, useGetGGPStake, useWithdrawGGP } from '@/hooks/useStake'

export const UnstakeModal = ({ isOpen, onClose, ...modalProps }) => {
  const [withdrawAmount, setWithdrawAmount] = useState(0)

  const { address } = useAccount()
  const { data: rewardsToClaimMaybe } = useGetGGPRewards(address)
  const rewardsToClaim = Number(formatEther((rewardsToClaimMaybe as BigNumberish) || 0))

  const { data: ggpStakeMaybe } = useGetGGPStake(address)
  const ggpStake = ggpStakeMaybe

  const {
    data: claimData,
    reset,
    write: withdraw,
  } = useWithdrawGGP(parseEther(withdrawAmount?.toString() || '0'))

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: claimData?.hash,
  })

  const handleClose = () => {
    onClose()
    reset()
    setWithdrawAmount(0)
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
