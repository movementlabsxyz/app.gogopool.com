import { BigNumber } from 'ethers'

import { Divider, Flex } from '@chakra-ui/react'
import { SendTransactionResult } from '@wagmi/core'
import { formatEther } from 'ethers/lib/utils.js'

import { Title } from '@/common/components/Card'

type Props = {
  claimData: SendTransactionResult
  setCurrentStep: (step: number) => void
  restakeAmount: BigNumber
  futureRatio: BigNumber
  claimAmount: BigNumber
  claim: () => void
  transactionLoading: boolean
}

export default function ClaimRestakeStepTwo({
  claim,
  claimAmount,
  claimData,
  futureRatio,
  restakeAmount,
  setCurrentStep,
  transactionLoading,
}: Props) {
  return (
    <div>
      <Title>Claim and Restake</Title>
      <div className="w-96 font-medium text-grey-500">
        Great! Take a moment to review your transaction details and then confirm.
      </div>

      <Divider borderColor="grey.300" mb="14" mt="4" />

      <Flex justify="space-between">
        <div className="font-semibold text-grey-600">Claiming:</div>
        <div className="font-bold text-black">
          {Number(formatEther(claimAmount)).toFixed(2)} GGP
        </div>
      </Flex>
      <Divider borderColor="grey.300" my="4" variant="dashed" />

      <Flex justify="space-between">
        <div className="font-semibold text-grey-600">Restaking:</div>
        <div className="font-bold text-black">
          {Number(formatEther(restakeAmount)).toFixed(2)} GGP
        </div>
      </Flex>
      <Divider borderColor="grey.300" my="4" variant="dashed" />

      <Flex justify="space-between">
        <div className="font-semibold text-grey-600">Future Collateralization:</div>
        <div className="font-bold text-black">
          {Number(formatEther(futureRatio)).toFixed(2) + '%'}
        </div>
      </Flex>

      <Divider borderColor="grey.300" mb="4" mt="10" />

      <Flex gap="6" justify="flex-end">
        <button
          className="text-[18px] font-semibold text-grey-600 underline"
          onClick={() => setCurrentStep(1)}
        >
          Back
        </button>
        <button
          className="rounded-full bg-green-500 px-10 py-3 font-bold text-black disabled:opacity-60"
          disabled={transactionLoading && claimData?.hash !== undefined}
          onClick={claim}
        >
          {transactionLoading && claimData?.hash ? 'Processing...' : 'Confirm'}
        </button>
      </Flex>
    </div>
  )
}
