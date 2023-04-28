import { BigNumber, utils } from 'ethers'
import { Dispatch, FunctionComponent, SetStateAction, useEffect, useState } from 'react'

import { Center, Flex, Text } from '@chakra-ui/react'
import { useAccount, useBalance, useNetwork } from 'wagmi'

import { StakeInput } from '../StakeInput'
import ApproveButton from '../components/ApproveButton'
import { ErrorMessage } from '../components/ErrorMessage'
import StakeButton, { MAX_RATIO, MIN_RATIO } from '../components/StakeButton'

import { Button } from '@/common/components/Button'
import { Tooltip } from '@/common/components/Tooltip'
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
}

export const WizardStakeGGP: FunctionComponent<WizardStepTwoProps> = ({
  currentStep,
  incrementLockStep,
  lockCurrentStep,
  lockStep,
  nextStep,
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
      <Text align="center" className="mb-[20px]" fontSize={18}>
        GGP Stake directly affects the amount of AVAX you can borrow and the rewards you get from
        the pool!
      </Text>

      <div className="space-y-6">
        <StakeInput
          amount={defaultAVAXAmount}
          disabled
          title="Amount to borrow"
          token="AVAX"
          tooltip="Borrowed AVAX is AVAX from Liquid Stakers that the protocol will allocate to your validator node. To borrow more AVAX and run a bigger node, you'll have to stake more GGP at a ratio of 10% of the AVAX borrowed."
        />
        <StakeInput
          amount={ggpAmount}
          balance={(roundedBigNumber(balance?.value) || 0).toLocaleString()}
          lowerText={<div>Future ratio: {(futureRatio || 0).toLocaleString()}%</div>}
          setAmount={setGgpAmount}
          title="Amount to deposit"
          token="GGP"
        />
      </div>

      <div className="mt-2 mb-6 flex flex-col items-end text-right">
        <Text align="left" color="grey.500" size="xs">
          Current ratio: {(currentRatio || 0).toLocaleString()}% with {ggpStake.toLocaleString()}{' '}
          GGP staked
        </Text>
      </div>

      <Center>
        <Text className="text-gray-400" size="sm">
          Currently we only support borrowing {defaultAVAXAmount?.toLocaleString() || 0} AVAX.
        </Text>
      </Center>

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
      <Center>
        {!balance?.value.isZero() || currentRatio >= MIN_RATIO ? (
          <Flex
            alignItems="center"
            className="space-x-4"
            justify="center"
            mb={{ md: 4, base: 2 }}
            mt={{ md: 4, base: 3 }}
          >
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

            {currentRatio >= MIN_RATIO && (
              <Tooltip
                content={`Your current collateral ratio of ${(
                  currentRatio || 0
                ).toLocaleString()}% is above our minimum requirement, so this step is optional.`}
              >
                <Button onClick={nextStep} variant="secondary-outline">
                  Skip step
                </Button>
              </Tooltip>
            )}
          </Flex>
        ) : null}
      </Center>
    </Flex>
  )
}
