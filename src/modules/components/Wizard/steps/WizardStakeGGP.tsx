import { BigNumber, constants } from 'ethers'
import { FunctionComponent, useEffect, useState } from 'react'

import { Divider, Flex, Spacer, Text } from '@chakra-ui/react'
import { formatEther, parseEther } from 'ethers/lib/utils.js'
import { useAccount, useBalance, useNetwork } from 'wagmi'

import ApproveButton from '../components/ApproveButton'
import { ErrorMessage } from '../components/ErrorMessage'
import StakeButton, { MAX_RATIO, MIN_RATIO } from '../components/StakeButton'

import { DEFAULT_AVAX } from '@/constants/chainDefaults'
import useGGPAllowance from '@/hooks/allowance'
import useTokenGGPContract from '@/hooks/contracts/tokenGGP'
import { useGetFutureRatio } from '@/hooks/useGetFutureRatio'
import {
  useGetContractCollateralizationRatio,
  useGetGGPPrice,
  useGetGGPStake,
} from '@/hooks/useStake'
import { StakeInput } from '@/modules/components/Wizard/StakeInput'
import { displayBN } from '@/utils/numberFormatter'

export interface WizardStakeGGPProps {
  currentStep: number
  lockStep: number
  nextStep: () => void
  lockCurrentStep: () => void
  incrementLockStep?: () => void
  prevStep: () => void
}

export const WizardStakeGGP: FunctionComponent<WizardStakeGGPProps> = ({
  currentStep,
  incrementLockStep,
  lockCurrentStep,
  lockStep,
  nextStep,
  prevStep,
}): JSX.Element => {
  const { chain } = useNetwork()
  const defaultAVAXAmount: BigNumber = DEFAULT_AVAX[chain?.id] || parseEther('0')

  const ggpPrice = useGetGGPPrice()

  const defaultGGPAmount: BigNumber = !ggpPrice.data.eq(0)
    ? defaultAVAXAmount.mul(parseEther('0.1')).div(ggpPrice.data)
    : BigNumber.from(0)

  const [ggpAmount, setGgpAmount] = useState<BigNumber>(defaultGGPAmount)
  const [approved, setApproved] = useState<boolean>(false)
  const [approveStatus, setApproveStatus] = useState<'error' | 'loading' | 'success' | 'idle'>(
    'idle',
  )

  useEffect(() => {
    if (!ggpPrice.data.eq(0)) {
      setGgpAmount(defaultAVAXAmount.mul(parseEther('0.1')).div(ggpPrice.data))
    }
  }, [ggpPrice, defaultAVAXAmount])

  const { address: account } = useAccount()
  const { address: ggpAddress } = useTokenGGPContract()
  const { data: ggpAllowance } = useGGPAllowance(account)

  // For calculating ratio
  const futureRatio = useGetFutureRatio({
    additionalGgp: ggpAmount,
    additionalAvax: defaultAVAXAmount,
  })
  const { data: straightRatio } = useGetContractCollateralizationRatio(account)
  const currentRatioWithIncomingAVAX = useGetFutureRatio({ additionalAvax: defaultAVAXAmount })

  const { data: ggpStake } = useGetGGPStake(account)

  const { data: ggpBalance } = useBalance({
    address: account,
    token: ggpAddress as `0x${string}`,
  })

  useEffect(() => {
    if (!approved && approveStatus === 'success') {
      setApproved(true)
    }
  }, [approved, approveStatus, setApproved])

  // determine if the user can skip ggp step
  useEffect(() => {
    if (currentRatioWithIncomingAVAX.eq(0)) {
      return
    }

    if (currentRatioWithIncomingAVAX >= MIN_RATIO && lockStep < 3 && currentStep === 2) {
      incrementLockStep()
    }
  }, [currentStep, currentRatioWithIncomingAVAX, incrementLockStep, lockStep])

  return (
    <Flex direction="column">
      <Text align="center" className="mb-[20px]" fontSize={16} fontWeight="medium" mx="16">
        To start your minipool, a minimum 10% collateralization of GGP is required. Staking beyond
        10% is advisable to protect against price fluctuations and maximize rewards.&nbsp;
        <a
          className="text-blue-400 underline"
          href="https://docs.gogopool.com/design/how-minipools-work"
          rel="noreferrer"
          target="_blank"
        >
          Learn more about minipools?
        </a>
      </Text>

      <div className="my-2 flex justify-between">
        <Flex gap="2">
          <Text color="grey.600">Current ratio: </Text>
          <Text fontWeight="bold">
            {straightRatio.eq(constants.MaxUint256) ? '∞' : displayBN(straightRatio.mul(100))}%
          </Text>
        </Flex>
        <Flex gap="2">
          <Text color="grey.600">Currently staked: </Text>
          <Text fontWeight="bold">{displayBN(ggpStake)} GGP</Text>
        </Flex>
      </div>

      <Divider borderColor="grey.300" mb="6" mt="2" />

      <div className="mb-4 space-y-6">
        <StakeInput
          amount={defaultAVAXAmount}
          disabled
          note={`Currently we only support matching ${Number(
            formatEther(defaultAVAXAmount),
          ).toFixed(2)} AVAX.`}
          placeholder={displayBN(defaultAVAXAmount)}
          title="Amount to Match"
          token="AVAX"
          tooltip="Matched AVAX is AVAX from Liquid Stakers that the protocol will allocate to your validator node."
        />
        <StakeInput
          amount={ggpAmount}
          balance={ggpBalance?.value || parseEther('0')}
          canUseAll={true}
          lowerText="Future Collateralization:"
          lowerTextTooltip="The new collateralization ratio after the proposed GGP is staked"
          lowerTextValue={futureRatio}
          max={ggpBalance?.value ? ggpBalance.value : undefined}
          min={BigNumber.from(0)}
          setAmount={setGgpAmount}
          title="Amount to deposit"
          token="GGP"
        />
      </div>

      {futureRatio > MAX_RATIO && !futureRatio.eq(constants.MaxUint256) && (
        <ErrorMessage
          message={`Max collateral ratio is ${Number(formatEther(MAX_RATIO)) * 100}%. More than ${
            Number(formatEther(MAX_RATIO)) * 100
          }% will not count towards GGP rewards.`}
        />
      )}
      {futureRatio < MIN_RATIO && account != undefined && (
        <ErrorMessage
          message={`Min collateral ratio is ${
            Number(formatEther(MIN_RATIO)) * 100
          }%. You won't be able to launch your minipool at the current ratio`}
        />
      )}

      <Divider borderColor="grey.300" my="4" />

      <Flex alignItems="center" justify="space-between">
        {lockStep > currentStep && (
          <Text fontWeight="medium">
            You are above {Number(formatEther(MIN_RATIO)) * 100}% collateral.{' '}
            <button className="text-blue-400 underline" onClick={nextStep}>
              Skip Step?
            </button>
          </Text>
        )}
        <Spacer />
        <Flex gap="6" mb={{ md: 4, base: 2 }} mt={{ md: 4, base: 3 }}>
          <button className="font-medium text-grey-600 underline" onClick={prevStep}>
            Back
          </button>
          {!ggpBalance?.value.isZero() || straightRatio.mul(100) >= MIN_RATIO ? (
            <div>
              {ggpAmount.gt(0) && (ggpAllowance?.gte(ggpAmount) || approved) ? (
                <StakeButton
                  avaxAmount={defaultAVAXAmount}
                  ggpAmount={ggpAmount}
                  lockCurrentStep={lockCurrentStep}
                  nextStep={nextStep}
                />
              ) : (
                <ApproveButton amount={ggpAmount} setApproveStatus={setApproveStatus} />
              )}
            </div>
          ) : null}
        </Flex>
      </Flex>
    </Flex>
  )
}
