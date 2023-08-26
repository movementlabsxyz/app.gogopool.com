import { BigNumber } from 'ethers'
import { useState } from 'react'

import { useAccount, useWaitForTransaction } from 'wagmi'

import { FailedClaim } from './ClaimAndRestake/FailedClaim'
import { PendingStake } from './ClaimAndRestake/PendingStake'
import { SuccessfulClaim } from './ClaimAndRestake/SuccessfulClaim'

import { Modal } from '@/common/components/Modal'
import { useGetGGPStake, useStakeGGP } from '@/hooks/useStake'
import { StakeInput } from '@/modules/components/Modal/StakeInput'

export const StakeModal = ({ isOpen, onClose, ...modalProps }) => {
  const [stakeAmount, setStakeAmount] = useState(BigNumber.from(0))

  const { address } = useAccount()
  const { data: ggpStake } = useGetGGPStake(address)

  const {
    data: stakeData,
    isError: isStakingError,
    isLoading: isStaking,
    refetch,
    reset,
    write: stake,
  } = useStakeGGP(stakeAmount)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: stakeData?.hash,
  })

  const handleClose = () => {
    onClose()
    reset()
    setStakeAmount(BigNumber.from(0))
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} {...modalProps}>
      {!stakeData?.hash && (
        <StakeInput
          ggpStake={ggpStake}
          isError={isStakingError}
          isLoading={isStaking}
          onClose={handleClose}
          refetch={refetch}
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
