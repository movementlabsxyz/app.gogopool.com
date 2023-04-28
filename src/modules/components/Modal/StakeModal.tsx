import { useState } from 'react'

import { parseEther } from 'ethers/lib/utils'
import { useAccount, useWaitForTransaction } from 'wagmi'

import { FailedClaim } from './ClaimAndRestake/FailedClaim'
import { PendingClaim } from './ClaimAndRestake/PendingClaim'
import { SuccessfulClaim } from './ClaimAndRestake/SuccessfulClaim'
import { StakeInput } from './StakeInput'

import { Modal } from '@/common/components/Modal'
import { useGetGGPStake, useStakeGGP } from '@/hooks/useStake'

export const StakeModal = ({ isOpen, onClose, ...modalProps }) => {
  const [stakeAmount, setStakeAmount] = useState(0)

  const { address } = useAccount()
  const { data: rewardsToClaim } = useGetGGPStake(address)

  const {
    data: stakeData,
    isError: isStakingError,
    isLoading: isStaking,
    refetch,
    reset,
    write: stake,
  } = useStakeGGP(parseEther(stakeAmount?.toString() || '0'))

  const { data, isError, isLoading, isSuccess } = useWaitForTransaction({
    hash: stakeData?.hash,
  })

  const handleClose = () => {
    onClose()
    reset()
    setStakeAmount(0)
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} {...modalProps}>
      {!stakeData?.hash && (
        <StakeInput
          isError={isStakingError}
          isLoading={isStaking}
          onClose={handleClose}
          refetch={refetch}
          rewardsToClaim={rewardsToClaim}
          setStakeAmount={setStakeAmount}
          stake={stake}
          stakeAmount={stakeAmount}
        />
      )}
      {isLoading && stakeData?.hash && (
        <PendingClaim
          claimAmount={stakeAmount}
          rewardsToClaim={rewardsToClaim}
          transactionHash={stakeData?.hash}
        />
      )}
      {isSuccess && !isLoading && stakeData?.hash && (
        <SuccessfulClaim onClose={handleClose} transactionHash={stakeData?.hash} />
      )}
      {!isSuccess && !isLoading && stakeData?.hash && (
        <FailedClaim transactionHash={stakeData?.hash} />
      )}
    </Modal>
  )
}
