import { utils } from 'ethers'
import { Dispatch, SetStateAction, useState } from 'react'

import { useToast } from '@chakra-ui/react'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount, useWaitForTransaction } from 'wagmi'

import { Button } from '@/common/components/Button'
import ConnectButton from '@/common/components/ConnectButton'
import { useGetCollateralRatio } from '@/hooks/useGetCollateralRatio'
import { useStakeGGP } from '@/hooks/useStake'

export const MIN_RATIO = 10
export const MAX_RATIO = 150
export interface StakeButtonProps {
  avaxAmount: number
  ggpAmount: number
  nextStep: () => void
  setStakeStatus: Dispatch<SetStateAction<'error' | 'loading' | 'success' | 'idle'>>
}
const StakeButton = ({ avaxAmount, ggpAmount, nextStep, setStakeStatus }: StakeButtonProps) => {
  const toast = useToast()

  const { isConnected } = useAccount()
  const { openConnectModal } = useConnectModal()
  const [loadingStake, setLoadingStake] = useState(false)

  const {
    data: stakeData,
    isLoading: isStakeLoading,
    writeAsync: stake,
  } = useStakeGGP(utils.parseEther(ggpAmount?.toString() || '0'))

  const { isLoading, status } = useWaitForTransaction({
    hash: stakeData?.hash,
  })

  const ratio = useGetCollateralRatio({ ggpAmount, avaxAmount })

  const handleSubmit = async () => {
    try {
      setStakeStatus('loading')
      setLoadingStake(true)
      const result = await stake()
      const resp = await result?.wait()
      if (resp.transactionHash && resp.status) {
        toast({
          position: 'top',
          description: 'Deposit successful',
          status: 'success',
        })
        setLoadingStake(false)
        nextStep()
        return
      }
      if (!resp.status) {
        setLoadingStake(false)
        setStakeStatus('error')
      }
    } catch (e) {
      setLoadingStake(false)
      setStakeStatus('error')
      console.log(e)
    }
  }

  const loading = isStakeLoading || isLoading || status === 'loading'

  return (
    <>
      {isConnected ? (
        <div className="flex w-full flex-col items-center">
          <Button
            disabled={!stake || ratio < MIN_RATIO || loading || loadingStake}
            full
            isLoading={loading || loadingStake}
            onClick={handleSubmit}
          >
            Deposit GGP
          </Button>
        </div>
      ) : (
        <ConnectButton />
      )}
    </>
  )
}

export default StakeButton
