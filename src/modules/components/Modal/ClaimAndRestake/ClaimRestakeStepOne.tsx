import { Divider, Flex } from '@chakra-ui/react'

import { Title } from '@/common/components/Card'
import { StakeInput } from '@/modules/components/Wizard/StakeInput'

type Props = {
  handleClose: () => void
  setCurrentStep: (step: number) => void
  rewardsToClaim: number
  currentRatio: number
  restakeAmount: number
  futureRatio: number
  claimAmount: number
  setRestakeAndClaim: (val: number) => void
}

export default function ClaimRestakeStepOne({
  claimAmount,
  currentRatio,
  futureRatio,
  handleClose,
  restakeAmount,
  rewardsToClaim,
  setCurrentStep,
  setRestakeAndClaim,
}: Props) {
  return (
    <div>
      <Title>Claim and Restake</Title>
      <div className="w-96 font-medium text-grey-500">
        Specify the amount you would like to restake back into your minipool or claim all by
        entering 0.
      </div>

      <Divider borderColor="grey.300" my="4" />

      <Flex justify="space-between">
        <Flex fontSize="14px" gap="10px">
          <div className="font-semibold text-grey-500">GGP Rewards:</div>
          <div className="font-bold text-grey-1000">{rewardsToClaim.toLocaleString()} GGP</div>
        </Flex>
        <Flex fontSize="14px" gap="10px">
          <div className="font-semibold text-grey-500">Current Collateralization:</div>
          <div className="font-bold text-grey-1000">{currentRatio.toLocaleString()}%</div>
        </Flex>
      </Flex>

      <Divider borderColor="grey.300" my="4" />

      <div className="mt-6">
        <StakeInput
          amount={restakeAmount || 0}
          balance={claimAmount}
          balanceLabel="Withraw Amount"
          canUseAll={true}
          lowerText="Future Collateralization:"
          lowerTextValue={(futureRatio || 0).toLocaleString() + '%'}
          max={restakeAmount + claimAmount}
          setAmount={setRestakeAndClaim}
          title="How much do you want to restake?"
          token="GGP"
        />
      </div>

      <Divider borderColor="grey.300" mb="4" mt="10" />

      <Flex gap="6" justify="flex-end">
        <button className="text-[18px] font-semibold text-grey-600 underline" onClick={handleClose}>
          Cancel
        </button>
        <button
          className="rounded-full bg-blue-400 py-3 px-6 font-bold text-white"
          onClick={() => setCurrentStep(2)}
        >
          {restakeAmount === 0 ? 'Claim All...' : 'Claim and Restake...'}
        </button>
      </Flex>
    </div>
  )
}
