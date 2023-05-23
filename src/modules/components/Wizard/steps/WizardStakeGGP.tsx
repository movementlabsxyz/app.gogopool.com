import { BigNumber, utils } from 'ethers'
import { Dispatch, FunctionComponent, SetStateAction, useEffect, useState } from 'react'

import { Divider, Flex, Text } from '@chakra-ui/react'
import { useAccount, useBalance, useNetwork } from 'wagmi'

import { StakeInput } from '../StakeInput'
import ApproveButton from '../components/ApproveButton'
import { ErrorMessage } from '../components/ErrorMessage'
import StakeButton, { MAX_RATIO, MIN_RATIO } from '../components/StakeButton'

import { DEFAULT_AVAX } from '@/constants/chainDefaults'
import useGGPAllowance from '@/hooks/allowance'
import useTokenGGPContract from '@/hooks/contracts/tokenGGP'
import { useGetCollateralRatio } from '@/hooks/useGetCollateralRatio'
import { useGetCollateralizationRatio, useGetGGPPrice, useGetGGPStake } from '@/hooks/useStake'
import { roundedBigNumber } from '@/utils/numberFormatter'

export interface WizardStepTwoProps {
  setStakeStatus: Dispatch<SetStateAction<'error' | 'loading' | 'success' | 'idle'>>
  nodeId: string
  currentStep: number
  lockStep: number
  nextStep: () => void
  lockCurrentStep?: () => void
  incrementLockStep?: () => void
  prevStep: () => void
}

export const WizardStakeGGP: FunctionComponent<WizardStepTwoProps> = ({
  currentStep,
  incrementLockStep,
  lockCurrentStep,
  lockStep,
  nextStep,
  prevStep,
  setStakeStatus,
}): JSX.Element => {
  const { chain } = useNetwork()
  const defaultAVAXAmount = DEFAULT_AVAX[chain?.id]

  const ggpPrice = useGetGGPPrice()
  const defaultGGPAmount = ggpPrice.data ? (defaultAVAXAmount / ggpPrice.data) * 0.1 : 0

  const [ggpAmount, setGgpAmount] = useState(defaultGGPAmount)
  const [approved, setApproved] = useState(false)
  const [approveStatus, setApproveStatus] = useState<'error' | 'loading' | 'success' | 'idle'>(
    'idle',
  )

  useEffect(() => {
    if (ggpPrice.data) {
      setGgpAmount((defaultAVAXAmount / ggpPrice.data) * 0.1)
    }
  }, [ggpPrice, defaultAVAXAmount])

  const { address: account } = useAccount()
  const { address: ggpAddress } = useTokenGGPContract()
  const { data: ggpAllowance } = useGGPAllowance(account)

  // For calculating ratio
  const futureRatio = useGetCollateralRatio({ ggpAmount, avaxAmount: defaultAVAXAmount })
  const { data: currentRatio } = useGetCollateralizationRatio(account)

  const { data: ggpStake } = useGetGGPStake(account)

  const { data: balance } = useBalance({
    address: account,
    token: ggpAddress as `0x${string}`,
  })

  const allowance = (ggpAllowance as unknown as BigNumber) || BigNumber.from(0)
  const amountBN = utils.parseEther(`${ggpAmount || 0}`)

  useEffect(() => {
    if (!approved && approveStatus === 'success') {
      setApproved(true)
    }
  }, [approved, approveStatus, setApproved])

  useEffect(() => {
    // check if currentratio is infinity, if so, return
    if (currentRatio === Infinity) return

    if (currentRatio >= MIN_RATIO && lockStep < 3 && currentStep === 2) {
      console.log(1, { lockStep, currentStep, currentRatio, MIN_RATIO })

      // Set next allowed step to 3, deposit avax
      incrementLockStep?.()
    } else if (balance?.value.isZero() && currentStep !== lockStep) {
      console.log(2, { balance, currentStep, lockStep })
      lockCurrentStep()
    }
  }, [currentStep, currentRatio, incrementLockStep, lockStep, balance, lockCurrentStep])

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
          <Text fontWeight="bold">{(currentRatio || 0).toLocaleString()}%</Text>
        </Flex>
        <Flex gap="2">
          <Text color="grey.600">Currently staked: </Text>
          <Text fontWeight="bold">{ggpStake.toLocaleString()} GGP</Text>
        </Flex>
      </div>

      <Divider borderColor="grey.300" mb="6" mt="2" />

      <div className="mb-4 space-y-6">
        <StakeInput
          amount={defaultAVAXAmount}
          disabled
          note="Currently we only support borrowing 1 AVAX."
          title="Amount to borrow"
          token="AVAX"
          tooltip="Borrowed AVAX is AVAX from Liquid Stakers that the protocol will allocate to your validator node."
        />
        <StakeInput
          amount={ggpAmount}
          balance={(roundedBigNumber(balance?.value) || 0).toLocaleString()}
          canUseAll={true}
          lowerText="Future Collateralization:"
          lowerTextTooltip="The new collateralization ratio after the proposed GGP is staked"
          lowerTextValue={(futureRatio || 0).toLocaleString() + '%'}
          setAmount={setGgpAmount}
          title="Amount to deposit"
          token="GGP"
        />
      </div>

      {futureRatio > MAX_RATIO && futureRatio != Infinity && (
        <ErrorMessage
          message={`Max collateral ratio is ${MAX_RATIO}%. More than ${MAX_RATIO}% will not count towards GGP rewards.`}
        />
      )}
      {futureRatio < MIN_RATIO && account != undefined && (
        <ErrorMessage
          message={`Min collateral ratio is ${MIN_RATIO}%. You won't be able to launch your minipool at the current ratio`}
        />
      )}

      <Divider borderColor="grey.300" my="4" />

      <Flex alignItems="center" justifyContent="space-between">
        {currentRatio >= MIN_RATIO && (
          <Text fontWeight="medium" justifySelf="flex-start">
            You are above {MIN_RATIO}% collateral.{' '}
            <button className="text-blue-400 underline" onClick={nextStep}>
              Skip Step?
            </button>
          </Text>
        )}

        <Flex gap="6" justifySelf="flex-end" mb={{ md: 4, base: 2 }} mt={{ md: 4, base: 3 }}>
          <button className="font-medium text-grey-600 underline" onClick={prevStep}>
            Back
          </button>
          {!balance?.value.isZero() || currentRatio >= MIN_RATIO ? (
            <div>
              {ggpAmount > 0 && (allowance.gte(amountBN) || approved) ? (
                <StakeButton
                  avaxAmount={defaultAVAXAmount}
                  ggpAmount={ggpAmount}
                  nextStep={nextStep}
                  setStakeStatus={setStakeStatus}
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
