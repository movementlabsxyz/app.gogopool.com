import { BigNumber } from 'ethers'
import { useState } from 'react'

import { useToast } from '@chakra-ui/react'
import { parseEther } from 'ethers/lib/utils.js'
import { useAccount, useWaitForTransaction } from 'wagmi'

import { Button } from '@/common/components/Button'
import ConnectButton from '@/common/components/ConnectButton'
import { useGetContractCollateralizationRatio, useStakeGGP } from '@/hooks/useStake'

export const MIN_RATIO = parseEther('0.1')
export const MAX_RATIO = parseEther('1.5')

export interface StakeButtonProps {
  avaxAmount: BigNumber
  ggpAmount: BigNumber
  lockCurrentStep: () => void
  nextStep: () => void
}
const StakeButton = ({ ggpAmount, lockCurrentStep, nextStep }: StakeButtonProps) => {
  const toast = useToast()

  const { address, isConnected } = useAccount()
  const [loadingStake, setLoadingStake] = useState(false)

  const {
    data: stakeData,
    error: stakeError,
    isLoading: isStakeLoading,
    writeAsync: stake,
  } = useStakeGGP(ggpAmount)

  const { isLoading, status } = useWaitForTransaction({
    hash: stakeData?.hash,
  })

  const { data: straightRatio } = useGetContractCollateralizationRatio(address)

  const handleSubmit = async () => {
    try {
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
        console.warn(stakeError)
        toast({
          position: 'top',
          description: 'Error when making transaction',
          status: 'error',
        })
        lockCurrentStep()
      }
    } catch (error) {
      setLoadingStake(false)
      console.warn(stakeError)
      toast({
        position: 'top',
        description: 'Error when making transaction',
        status: 'error',
      })
      lockCurrentStep()
    }
  }

  const loading = isStakeLoading || isLoading || status === 'loading'

  return (
    <>
      {isConnected ? (
        <div className="flex w-full flex-col items-center">
          <Button
            disabled={!stake || straightRatio.mul(100).lt(MIN_RATIO) || loading || loadingStake}
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
