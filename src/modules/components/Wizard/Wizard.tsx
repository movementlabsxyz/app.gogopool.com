import {
  ChangeEvent,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, Flex } from '@chakra-ui/react'
import { useAccount, useNetwork } from 'wagmi'

import { WizardContent } from './WizardContent'
import { WizardHeader } from './WizardHeader'
import { WizardCreateMinipool } from './steps/WizardCreateMinipool'
import { WizardNodeID } from './steps/WizardNodeID'
import { WizardStakeGGP } from './steps/WizardStakeGGP'
import { WizardSuccess } from './steps/WizardSuccess'

import { Button } from '@/common/components/Button'
import { DEFAULT_AVAX, DEFAULT_DURATION } from '@/constants/chainDefaults'
import { HexString } from '@/types/cryptoGenerics'

export interface WizardProps {
  currentStep: number
  setCurrentStep: Dispatch<SetStateAction<number>>
}

export const Wizard: FunctionComponent<WizardProps> = ({
  currentStep,
  setCurrentStep,
}): JSX.Element => {
  const { chain } = useNetwork()

  const [formattedNodeId, setFormattedNodeId] = useState<HexString>()

  const defaultTimeRange = DEFAULT_DURATION[chain?.id] ? DEFAULT_DURATION[chain?.id][0] : '0'
  const [timeRange, setTimeRange] = useState(defaultTimeRange)
  const [timeRangeSeconds, setTimeRangeSeconds] = useState(0)

  const defaultAVAXAmount = DEFAULT_AVAX[chain?.id] || 0
  const [avaxAmount, setAvaxAmount] = useState(defaultAVAXAmount)
  useEffect(() => {
    setAvaxAmount(defaultAVAXAmount)
  }, [defaultAVAXAmount])

  const [txid, setTxid] = useState('')
  const [lockStep, setLockStep] = useState(1)

  const { address: account } = useAccount()

  const headerRef = useRef<HTMLDivElement>(null)

  const durationToSeconds = useCallback((duration: string) => {
    const regex = /^(\d+) (week|month|day)s?$/
    const match = duration.match(regex)
    if (!match) {
      return durationToSeconds('15 days')
    }
    const amount = parseInt(match[1])
    const unit = match[2]
    const secondsPerUnit = {
      day: 24 * 60 * 60,
      week: 7 * 24 * 60 * 60,
      month: 4 * 7 * 24 * 60 * 60, // we can only increment by 7 days, so 1 month is 4 weeks
    }
    return amount * secondsPerUnit[unit]
  }, [])

  useEffect(() => {
    setTimeRange(defaultTimeRange)
    setTimeRangeSeconds(durationToSeconds(defaultTimeRange))
  }, [defaultTimeRange, durationToSeconds])

  const handleChangeTimeRange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTimeRange(e.target.value || '')
    setTimeRangeSeconds(durationToSeconds(e.target.value || ''))
  }

  function nextStep() {
    setCurrentStep((step) => step + 1)
  }

  function prevStep() {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1)
    }
  }

  const incrementLockStep = () => {
    setLockStep((s) => s + 1)
  }

  const lockCurrentStep = () => {
    setLockStep(currentStep)
  }

  const renderStepAction = (): JSX.Element => {
    switch (currentStep) {
      case 1:
        return (
          <WizardNodeID
            currentStep={currentStep}
            handleChangeTimeRange={handleChangeTimeRange}
            incrementLockStep={incrementLockStep}
            isConnected={!!account}
            lockCurrentStep={lockCurrentStep}
            lockStep={lockStep}
            setFormattedNodeId={setFormattedNodeId}
            timeRange={timeRange}
          />
        )
      case 2:
        return (
          <WizardStakeGGP
            currentStep={currentStep}
            incrementLockStep={incrementLockStep}
            lockCurrentStep={lockCurrentStep}
            lockStep={lockStep}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )
      case 3:
        return (
          <WizardCreateMinipool
            avaxAmount={avaxAmount}
            formattedNodeId={formattedNodeId}
            nextStep={nextStep}
            setAmount={setAvaxAmount}
            setTxID={setTxid}
            timeRangeSeconds={timeRangeSeconds}
          />
        )
      case 4:
        return <WizardSuccess hash={txid} />
      default:
        // this should never happen!
        throw Error(`Invalid step ${currentStep}`)
    }
  }

  return (
    <Box
      bg="#ffffff"
      borderRadius="24px"
      color="#000000"
      h="full"
      marginX="auto"
      maxW={780}
      padding="32px"
    >
      <Flex direction="column" gap={3}>
        <WizardHeader headerRef={headerRef} step={currentStep} />
        <Box className="w-full" maxWidth="662px" mx="auto">
          <WizardContent step={currentStep} />
          {renderStepAction()}
        </Box>
        <Flex justify="space-between">
          {currentStep === 3 && (
            <Button onClick={prevStep} variant="secondary-outline">
              Back <ArrowBackIcon />
            </Button>
          )}
          {currentStep == 1 && (
            <>
              <div></div>
              <Button
                disabled={lockStep <= currentStep}
                onClick={nextStep}
                variant="secondary-outline"
              >
                Next <ArrowForwardIcon />
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  )
}
