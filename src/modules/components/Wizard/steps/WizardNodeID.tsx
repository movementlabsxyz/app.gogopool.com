import { ChangeEvent, FunctionComponent, useEffect, useState } from 'react'

import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons'
import { InputGroup, InputLeftElement, Select, Spinner } from '@chakra-ui/react'
import { useNetwork } from 'wagmi'

import CodeCaretIcon from '@/common/components/CustomIcon/CodeCaretIcon'
import { Input } from '@/common/components/Input'
import { DEFAULT_DURATION } from '@/constants/chainDefaults'
import { useMinipoolByID } from '@/hooks/minipool'
import useDebounce from '@/hooks/useDebounce'
import { HexString } from '@/types/cryptoGenerics'
import nodeIdErrorMessage from '@/utils/nodeIdErrorMessage'

export interface WizardNodeIDProps {
  currentStep: number
  lockStep: number
  timeRange: string
  handleChangeTimeRange: (e: ChangeEvent<HTMLSelectElement>) => void
  lockCurrentStep?: () => void
  incrementLockStep?: () => void
  isConnected: boolean
  setFormattedNodeId: (h: HexString) => void
}

export const WizardNodeID: FunctionComponent<WizardNodeIDProps> = ({
  currentStep,
  handleChangeTimeRange,
  incrementLockStep,
  isConnected,
  lockCurrentStep,
  lockStep,
  setFormattedNodeId,
  timeRange,
}): JSX.Element => {
  const { chain } = useNetwork()

  const [nodeId, setNodeId] = useState('')
  const [isSSR, setIsSSR] = useState(true)

  const debouncedNodeId = useDebounce(nodeId, 500)

  const { isError, isLoading, minipool } = useMinipoolByID(debouncedNodeId)
  const { errorMessage, formattedNodeId } = nodeIdErrorMessage(minipool, debouncedNodeId)

  useEffect(() => {
    setIsSSR(false)
  }, [])

  useEffect(() => {
    if (isSSR) return
    if (errorMessage) {
      setFormattedNodeId(null)
      lockCurrentStep()
      return
    }
    if (!debouncedNodeId || !formattedNodeId) {
      lockCurrentStep()
      return
    }
    if (currentStep === 1 && lockStep === 1) {
      setFormattedNodeId(formattedNodeId)
      incrementLockStep?.()
    }
  }, [
    errorMessage,
    debouncedNodeId,
    currentStep,
    lockStep,
    isSSR,
    incrementLockStep,
    lockCurrentStep,
    formattedNodeId,
    setFormattedNodeId,
  ])

  const resolveInputIcon = () => {
    if (isLoading && nodeId) {
      return <Spinner />
    }
    if (isError) {
      return <WarningIcon color="error.500" />
    }
    if (errorMessage != '') {
      return <WarningIcon color="error.500" />
    }
    if (errorMessage == '' && debouncedNodeId) {
      return <CheckCircleIcon color="success.500" />
    }
    return null
  }

  return (
    <>
      <div className="flex flex-col justify-between space-y-4">
        <Input
          className="!pl-10"
          errorText={errorMessage}
          isDisabled={!isConnected}
          isInvalid={!!errorMessage}
          isMonospaced={true}
          leftIcon={CodeCaretIcon()}
          onChange={({ target }) => {
            setNodeId(target.value)
          }}
          placeholder="Enter your Node ID"
          rightIcon={resolveInputIcon()}
          value={nodeId}
        ></Input>

        <InputGroup className="!mx-0 !w-1/2">
          <InputLeftElement pointerEvents="none"></InputLeftElement>
          <Select
            className="!h-[42px] !rounded-full !pl-10"
            isDisabled={!isConnected}
            onChange={handleChangeTimeRange}
            value={timeRange}
          >
            <option disabled hidden value="">
              Validation period
            </option>
            {DEFAULT_DURATION[chain?.id] && (
              <>
                {DEFAULT_DURATION[chain?.id].map((duration: string) => (
                  <option key={duration} value={duration}>
                    {duration}
                  </option>
                ))}
              </>
            )}
          </Select>
        </InputGroup>
      </div>
    </>
  )
}
