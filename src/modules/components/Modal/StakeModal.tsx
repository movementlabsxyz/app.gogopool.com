import { useState } from 'react'

import { parseEther } from 'ethers/lib/utils'
import { useAccount, useWaitForTransaction } from 'wagmi'

import { FailedClaim } from './ClaimAndRestake/FailedClaim'
import { PendingStake } from './ClaimAndRestake/PendingStake'
import { SuccessfulClaim } from './ClaimAndRestake/SuccessfulClaim'

import { Modal } from '@/common/components/Modal'
import { useGetGGPStake, useStakeGGP } from '@/hooks/useStake'
import { StakeInput } from '@/modules/components/Modal/StakeInput'

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

  const { isLoading, isSuccess } = useWaitForTransaction({
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
        <PendingStake amount={stakeAmount} message={'Staking:'} transactionHash={stakeData?.hash} />
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
