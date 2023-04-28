import { BigNumberish } from 'ethers'
import { useEffect, useState } from 'react'

import { useDisclosure } from '@chakra-ui/react'
import { formatEther, parseEther } from 'ethers/lib/utils'
import { useWaitForTransaction } from 'wagmi'

import { ClaimAllRewards } from './ClaimAllRewards'
import { ClaimAndRestakeInput } from './ClaimAndRestake/ClaimAndRestakeInput'
import { FailedClaim } from './ClaimAndRestake/FailedClaim'
import { PendingClaim } from './ClaimAndRestake/PendingClaim'
import { SuccessfulClaim } from './ClaimAndRestake/SuccessfulClaim'
import { ClaimAndRestakeTwo } from './ClaimAndRestakeTwo'

import { Modal } from '@/common/components/Modal'
import { useClaimAndRestake } from '@/hooks/useClaimNodeOp'
import { useGetGGPRewards } from '@/hooks/useStake'

export const ClaimAndRestakeModal = ({ isOpen, onClose, ownerAddress, status, ...modalProps }) => {
  const [claimAmount, setClaimAmount] = useState(0)
  const { isOpen: isOpenClaim, onClose: onCloseClaim, onOpen: onOpenClaim } = useDisclosure()
  const {
    isOpen: isOpenClaimAll,
    onClose: onCloseClaimAll,
    onOpen: onOpenClaimAll,
  } = useDisclosure()

  const { data: rewardsToClaimMaybe } = useGetGGPRewards(ownerAddress)
  const rewardsToClaim = Number(formatEther((rewardsToClaimMaybe as BigNumberish) || 0))

  const {
    data: claimData,
    reset,
    write: claim,
  } = useClaimAndRestake(ownerAddress, parseEther(claimAmount?.toString() || '0'))

  console.log('write claimmehtod', claim)
  console.log('main modal claimAmoutn', claimAmount)

  const { data, isError, isLoading, isSuccess } = useWaitForTransaction({
    hash: claimData?.hash,
  })

  useEffect(() => {
    if (isOpenClaimAll && !isOpenClaim) {
      setClaimAmount(rewardsToClaim)
    }
  }, [isOpenClaimAll, isOpenClaim, rewardsToClaim])

  const handleClaimAll = () => {
    setClaimAmount(rewardsToClaim)
    console.log('handle claim all amouint', claimAmount)
    claim()
  }

  const handleClose = () => {
    onClose()
    onCloseClaim()
    onCloseClaimAll()
    reset()
    setClaimAmount(0)
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} {...modalProps}>
        <div>
          <div className="mb-8 border-b-2 border-gray-400 pb-6">
            <div className="mb-2 font-domaine text-[26px] font-bold">Claim and restake</div>
            <div className="text-[16px] font-bold text-[#3E33BB]">
              Rewards Amount: {rewardsToClaim.toLocaleString()} GGP
            </div>
          </div>

          {isOpenClaimAll && !isOpenClaim && (
            <ClaimAllRewards
              claim={claim}
              claimAmount={claimAmount}
              handleClaimAll={handleClaimAll}
              onCloseClaimAll={() => {
                setClaimAmount(0)
                onCloseClaimAll()
              }}
            />
          )}

          {!isOpenClaim && !isOpenClaimAll && (
            <ClaimAndRestakeTwo onOpenClaim={onOpenClaim} onOpenClaimAll={onOpenClaimAll} />
          )}

          {isOpenClaim && !isOpenClaimAll && (
            <div>
              {!claimData?.hash && (
                <ClaimAndRestakeInput
                  claim={claim}
                  claimAmount={claimAmount}
                  onClose={onCloseClaim}
                  rewardsToClaim={rewardsToClaim}
                  setClaimAmount={setClaimAmount}
                />
              )}
              {isLoading && claimData?.hash && (
                <PendingClaim
                  claimAmount={claimAmount}
                  rewardsToClaim={rewardsToClaim}
                  transactionHash={claimData?.hash}
                />
              )}
              {isSuccess && !isLoading && claimData?.hash && (
                <SuccessfulClaim onClose={handleClose} transactionHash={claimData?.hash} />
              )}
              {!isSuccess && !isLoading && claimData?.hash && (
                <FailedClaim transactionHash={claimData?.hash} />
              )}
            </div>
          )}
        </div>
      </Modal>
    </>
  )
}
