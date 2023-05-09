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
import { Box, Flex, useToast } from '@chakra-ui/react'
import { useAccount, useNetwork } from 'wagmi'

import { WizardContent } from './WizardContent'
import { WizardHeader } from './WizardHeader'
import { WizardCreateMinipool } from './steps/WizardCreateMinipool'
import { WizardNodeID } from './steps/WizardNodeID'
import { WizardStakeGGP } from './steps/WizardStakeGGP'
import { WizardSuccess } from './steps/WizardSuccess'

import { Button } from '@/common/components/Button'
import { DEFAULT_AVAX, DEFAULT_DURATION } from '@/constants/chainDefaults'

export interface WizardProps {
  currentStep: number
  setCurrentStep: Dispatch<SetStateAction<number>>
}

export const Wizard: FunctionComponent<WizardProps> = ({
  currentStep,
  setCurrentStep,
}): JSX.Element => {
  const { chain } = useNetwork()

  const [nodeId, setNodeId] = useState('')

  const defaultTimeRange = DEFAULT_DURATION[chain?.id] ? DEFAULT_DURATION[chain?.id][0] : '0'
  const [timeRange, setTimeRange] = useState(defaultTimeRange)
  const [timeRangeSeconds, setTimeRangeSeconds] = useState(0)

  const defaultAVAXAmount = DEFAULT_AVAX[chain?.id] || 0
  const [avaxAmount, setAvaxAmount] = useState(defaultAVAXAmount)
  useEffect(() => {
    setAvaxAmount(defaultAVAXAmount)
  }, [defaultAVAXAmount])

  const [txid, setTxid] = useState('')
  const [stakeStatus, setStakeStatus] = useState<'error' | 'loading' | 'success' | 'idle'>('idle')
  const [createMinipoolStatus, setCreateMinipoolStatus] = useState<
    'error' | 'loading' | 'success' | 'idle'
  >('idle')
  const [lockStep, setLockStep] = useState(1)

  const { address: account } = useAccount()

  const toast = useToast()
  const headerRef = useRef<HTMLDivElement>(null)

  const handleChangeNodeId = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9-]/gi, '')
    setNodeId(value)
    localStorage.setItem('nodeId', value)
  }

  const durationToSeconds = useCallback((duration: string) => {
    const regex = /^(\d+) (week|month)s?$/
    const match = duration.match(regex)
    if (!match) {
      return durationToSeconds('15 days')
    }
    const amount = parseInt(match[1])
    const unit = match[2]
    const secondsPerUnit = {
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

  useEffect(() => {
    // load from local storage
    const localStep = localStorage.getItem('step')
    if (localStep) {
      setCurrentStep(Number(localStep))
    } else {
      setCurrentStep(1)
    }

    const nodeId = localStorage.getItem('nodeId')
    if (nodeId) {
      setNodeId(nodeId)
    } else {
      setNodeId('')
    }
  }, [setCurrentStep])

  const nextStep = useCallback(() => {
    setCurrentStep((s) => {
      const next = s + 1

      if (next >= 3) {
        // clear local storage
        localStorage.removeItem('step')
        localStorage.removeItem('nodeId')
      } else {
        localStorage.setItem('step', next.toString())
      }

      return next
    })
  }, [setCurrentStep])

  const prevStep = () => {
    setCurrentStep((s) => {
      if (s > 1) {
        const prev = s - 1
        localStorage.setItem('step', prev.toString())
        return prev
      }
    })
  }

  const incrementLockStep = () => {
    setLockStep((s) => s + 1)
  }

  const lockCurrentStep = () => {
    setLockStep(currentStep)
  }

  useEffect(() => {
    if (stakeStatus === 'error') {
      toast({
        position: 'top',
        description: 'Error when making transaction',
        status: 'error',
      })
      setLockStep(currentStep)
      return
    }
  }, [currentStep, nextStep, stakeStatus, toast])

  useEffect(() => {
    if (createMinipoolStatus === 'error') {
      toast({
        position: 'top',
        description: 'Error when sending the create minipool transaction',
        status: 'error',
      })
      return
    }

    if (createMinipoolStatus === 'success' && txid !== '') {
      toast({
        position: 'top',
        description: 'Create minipool successful',
        status: 'success',
      })
      nextStep()
      return
    }
  }, [createMinipoolStatus, nextStep, toast, txid])

  const renderStepAction = (): JSX.Element => {
    switch (currentStep) {
      case 1:
        return (
          <WizardNodeID
            currentStep={currentStep}
            handleChangeNodeId={handleChangeNodeId}
            handleChangeTimeRange={handleChangeTimeRange}
            incrementLockStep={incrementLockStep}
            isConnected={!!account}
            lockCurrentStep={lockCurrentStep}
            lockStep={lockStep}
            nextStep={nextStep}
            nodeId={nodeId}
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
            nodeId={nodeId}
            setStakeStatus={setStakeStatus}
          />
        )
      case 3:
        return (
          <WizardCreateMinipool
            amount={avaxAmount}
            nodeId={nodeId}
            setAmount={setAvaxAmount}
            setCreateMinipoolStatus={setCreateMinipoolStatus}
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
        <Box className="w-full" maxWidth="528px" mx="auto">
          <WizardContent step={currentStep} />
          {renderStepAction()}
        </Box>
        {currentStep !== 4 && (
          <Flex justify="space-between">
            {currentStep > 1 && (
              <Button onClick={prevStep} variant="secondary-outline">
                Back <ArrowBackIcon />
              </Button>
            )}
            {/* We couldn't figure out the CSS. This is scuffed but works. */}
            {currentStep == 1 && <div />}
            {currentStep < 3 && (
              <Button
                disabled={lockStep <= currentStep}
                onClick={nextStep}
                variant="secondary-outline"
              >
                Next <ArrowForwardIcon />
              </Button>
            )}
          </Flex>
        )}
      </Flex>
    </Box>
  )
}
