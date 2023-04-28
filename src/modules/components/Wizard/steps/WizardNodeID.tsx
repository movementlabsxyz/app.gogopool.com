import { ChangeEvent, FunctionComponent, useEffect, useState } from 'react'

import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons'
import { InputGroup, InputLeftElement, Select, Spinner } from '@chakra-ui/react'
import { useNetwork } from 'wagmi'

import { Input } from '@/common/components/Input'
import { DEFAULT_DURATION } from '@/constants/chainDefaults'
import { useMinipoolByID } from '@/hooks/minipool'
import useDebounce from '@/hooks/useDebounce'

export interface WizardNodeIDProps {
  nodeId: string
  currentStep: number
  lockStep: number
  timeRange: string
  handleChangeNodeId: (e: ChangeEvent<HTMLInputElement>) => void
  handleChangeTimeRange: (e: ChangeEvent<HTMLSelectElement>) => void
  nextStep?: () => void
  lockCurrentStep?: () => void
  incrementLockStep?: () => void
  isConnected: boolean
}

export const WizardNodeID: FunctionComponent<WizardNodeIDProps> = ({
  currentStep,
  handleChangeNodeId,
  handleChangeTimeRange,
  incrementLockStep,
  isConnected,
  lockCurrentStep,
  lockStep,
  nextStep,
  nodeId,
  timeRange,
}): JSX.Element => {
  const { chain } = useNetwork()
  const debouncedNodeId = useDebounce(nodeId, 500)
  const [validNodeId, setValidNodeId] = useState(false)
  const { isError, isLoading, minipool } = useMinipoolByID(debouncedNodeId)

  const [isSSR, setIsSSR] = useState(true)

  const nodeIdInUse =
    minipool && !(minipool.status.toNumber() == 4 || minipool.status.toNumber() == 5)
      ? 'Node ID is already in use'
      : null
  const invalidNodeId = !debouncedNodeId.startsWith('NodeID-')
    ? "Node ID must start with 'NodeID-'"
    : null

  useEffect(() => {
    setIsSSR(false)
  }, [])

  useEffect(() => {
    if (isSSR) return
    if (invalidNodeId) {
      setValidNodeId(false)
      lockCurrentStep()
      return
    }

    // unless the minipool is in state 4 or 5, consider this to be an error
    if (nodeIdInUse) {
      setValidNodeId(false)
      lockCurrentStep()
      return
    }
    if (!debouncedNodeId) {
      setValidNodeId(false)
      return
    }
    if (currentStep === 1 && lockStep === 1) {
      setValidNodeId(true)
      incrementLockStep?.()
    }
  }, [
    nodeIdInUse,
    invalidNodeId,
    debouncedNodeId,
    currentStep,
    lockStep,
    isSSR,
    incrementLockStep,
    lockCurrentStep,
  ])

  const resolveInputIcon = () => {
    if (!isConnected) {
      return null
    }
    if (isLoading && nodeId) {
      return <Spinner />
    }
    if (!nodeId || !debouncedNodeId) {
      return null
    }
    if (isError) {
      return <WarningIcon color="error.500" />
    }
    if (validNodeId) {
      return <CheckCircleIcon color="success.500" />
    }
    if (!validNodeId) {
      return <WarningIcon color="error.500" />
    }

    return null
  }

  const leftIcon = (
    <svg fill="none" height="15" viewBox="0 0 15 15" width="15" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_3444_7716)">
        <path
          d="M9.8335 11.2842L13.3335 7.78418L9.8335 4.28418"
          stroke="#8E84EA"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M5.1665 4.28418L1.6665 7.78418L5.1665 11.2842"
          stroke="#8E84EA"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </g>
      <defs>
        <clipPath id="clip0_3444_7716">
          <rect fill="white" height="14" transform="translate(0.5 0.78418)" width="14" />
        </clipPath>
      </defs>
    </svg>
  )

  return (
    <>
      <div className="flex flex-col justify-between space-y-4">
        <Input
          className="!pl-10"
          errorText={invalidNodeId || nodeIdInUse}
          isDisabled={!isConnected}
          isInvalid={!!(invalidNodeId || nodeIdInUse)}
          isMonospaced={true}
          leftIcon={leftIcon}
          onChange={handleChangeNodeId}
          placeholder="Enter your Node ID"
          rightIcon={resolveInputIcon()}
          value={nodeId}
        ></Input>

        <InputGroup className="!mx-0 !w-1/2">
          <InputLeftElement pointerEvents="none">
            <svg
              fill="none"
              height="14"
              viewBox="0 0 15 14"
              width="15"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.5833 2.33301H3.41667C2.77233 2.33301 2.25 2.85534 2.25 3.49967V11.6663C2.25 12.3107 2.77233 12.833 3.41667 12.833H11.5833C12.2277 12.833 12.75 12.3107 12.75 11.6663V3.49967C12.75 2.85534 12.2277 2.33301 11.5833 2.33301Z"
                stroke="#8E84EA"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <path
                d="M2.25 5.83301H12.75"
                stroke="#8E84EA"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <path
                d="M9.8335 1.16699V3.50033"
                stroke="#8E84EA"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <path
                d="M5.1665 1.16699V3.50033"
                stroke="#8E84EA"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </InputLeftElement>
          <Select
            className="!h-[42px] !rounded-full !pl-10"
            isDisabled={!isConnected}
            onChange={handleChangeTimeRange}
            value={timeRange}
          >
            <option disabled hidden selected value="">
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
