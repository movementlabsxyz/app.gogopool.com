import { BigNumber } from 'ethers'
import { Dispatch, SetStateAction } from 'react'

import { useChainModal, useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount, useNetwork, useWaitForTransaction } from 'wagmi'

import { Button } from '@/common/components/Button'
import useApproveGGP from '@/hooks/approve'

export interface ApproveProps {
  amount: BigNumber
  setApproveStatus: Dispatch<SetStateAction<'error' | 'loading' | 'success' | 'idle'>>
}

const ApproveButton = ({ amount, setApproveStatus }: ApproveProps) => {
  const { isConnected } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { chain } = useNetwork()
  const { openChainModal } = useChainModal()

  const { data, isLoading: isApproveLoading, write: approve } = useApproveGGP(amount)

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: (data) => {
      if (data.status === 1) {
        setApproveStatus('success')
      } else if (data.status === 0) {
        setApproveStatus('error')
      }
    },
    onError: () => {
      setApproveStatus('error')
    },
  })

  if (chain?.unsupported) {
    return (
      <Button onClick={openChainModal} variant="destructive-outline">
        Wrong network
      </Button>
    )
  }

  return isConnected ? (
    <Button
      disabled={!amount || amount.lt(0) || isApproveLoading || !approve || isLoading}
      isLoading={isApproveLoading || isLoading}
      onClick={approve}
      size="sm"
      variant="primary"
    >
      Approve...
    </Button>
  ) : (
    <Button data-testid="connect" onClick={openConnectModal} size="sm">
      Connect Wallet
    </Button>
  )
}

export default ApproveButton
