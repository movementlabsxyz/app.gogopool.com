import { BigNumber } from 'ethers'

import { Button, Divider, Flex } from '@chakra-ui/react'
import { SendTransactionResult } from '@wagmi/core'

import { Title } from '@/common/components/Card'
import { displayBN } from '@/utils/numberFormatter'

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
        <div className="font-bold text-black">{displayBN(claimAmount)} GGP</div>
      </Flex>
      <Divider borderColor="grey.300" my="4" variant="dashed" />

      <Flex justify="space-between">
        <div className="font-semibold text-grey-600">Restaking:</div>
        <div className="font-bold text-black">{displayBN(restakeAmount)} GGP</div>
      </Flex>
      <Divider borderColor="grey.300" my="4" variant="dashed" />

      <Flex justify="space-between">
        <div className="font-semibold text-grey-600">Future Collateralization:</div>
        <div className="font-bold text-black">{displayBN(futureRatio) + '%'}</div>
      </Flex>

      <Divider borderColor="grey.300" mb="4" mt="10" />

      <Flex gap="6" justify="flex-end">
        <button
          className="text-[16px] font-semibold text-grey-600 underline"
          onClick={() => setCurrentStep(1)}
        >
          Back
        </button>
        <Button
          disabled={transactionLoading && claimData?.hash !== undefined}
          onClick={claim}
          variant="primary"
        >
          {transactionLoading && claimData?.hash ? 'Processing...' : 'Confirm'}
        </Button>
      </Flex>
    </div>
  )
}
