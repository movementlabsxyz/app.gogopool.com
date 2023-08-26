import { BigNumber, constants } from 'ethers'
import { Dispatch, ReactNode, SetStateAction } from 'react'

import { Flex, Stack, Text, useTheme } from '@chakra-ui/react'
import { formatEther } from 'ethers/lib/utils.js'

import { AVAXPillUnit } from '../Dashboard/Cards/AVAXPillUnit'
import { GGPPillUnit } from '../Dashboard/Cards/GGPPillUnit'

import { InfoCircleIcon } from '@/common/components/CustomIcon'
import { BigNumberInput } from '@/common/components/Input/BigNumberInput'
import { Tooltip } from '@/common/components/Tooltip'

type StakeInputProps = {
  amount: BigNumber
  setAmount?: Dispatch<SetStateAction<BigNumber>>
  exchangeRate?: number
  currencySymbol?: string
  balance?: BigNumber
  balanceLabel?: string
  tooltip?: string
  token: string
  title: string
  note?: string
  icon?: ReactNode
  disabled?: boolean
  max?: BigNumber
  min?: BigNumber
  lowerText?: string
  lowerTextTooltip?: string
  lowerTextValue?: BigNumber
  canUseAll?: boolean
  placeholder?: string
}

export const StakeInput = ({
  amount,
  balance,
  balanceLabel,
  canUseAll,
  disabled,
  lowerText,
  lowerTextTooltip,
  lowerTextValue,
  max,
  min,
  note,
  placeholder,
  setAmount,
  title,
  token,
  tooltip,
}: StakeInputProps) => {
  const { colors } = useTheme()
  max = max || constants.MaxUint256
  min = min || BigNumber.from(0)

  function useAllToken() {
    setAmount && setAmount(max)
  }

  return (
    <Stack>
      <Flex justifyContent="space-between">
        <Tooltip content={tooltip} placement="right">
          <Text className="font-bold">
            <span>{title}</span>
            {tooltip && (
              <span>
                <InfoCircleIcon className="ml-1 inline h-5 w-5" fill="blue.300" />
              </span>
            )}

            {canUseAll && (
              <button className="ml-2 font-medium text-blue-300 underline" onClick={useAllToken}>
                Use all {token}
              </button>
            )}
          </Text>
        </Tooltip>

        {note && (
          <Text className="font-medium" color="grey.500">
            {note}
          </Text>
        )}
      </Flex>
      <Flex
        alignItems="center"
        bg="blue.50"
        border={`1px solid ${colors.blue[200]}`}
        className={disabled ? 'opacity-60' : ''}
        gap="2"
        justifyContent="space-between"
        mb={2}
        px="2"
        py="1"
        rounded="lg"
        width="100%"
      >
        <BigNumberInput
          autoFocus
          bnValue={amount}
          className="w-full bg-transparent p-2 text-2xl font-medium outline-0 disabled:cursor-not-allowed"
          disabled={disabled}
          id="stake-avax-form"
          max={max}
          min={min}
          onChange={setAmount}
          placeholder={placeholder}
        />
        {token === 'AVAX' ? <AVAXPillUnit /> : <GGPPillUnit />}
      </Flex>
      <div className="flex items-center justify-between gap-8">
        {lowerText && (
          <Tooltip content={lowerTextTooltip} placement="right">
            <Flex fontSize="sm" fontWeight="bold">
              {lowerText}
              {lowerTextTooltip && (
                <InfoCircleIcon className="ml-1 inline h-5 w-5" fill="blue.300" />
              )}
              <Text color="green.700" paddingLeft="1">
                {Number(formatEther(lowerTextValue)).toFixed(2)}%
              </Text>
            </Flex>
          </Tooltip>
        )}

        {balance && (
          <Flex fontSize="sm" fontWeight="bold" gap="2">
            {balanceLabel ? balanceLabel : 'Balance'}
            <Text color="green.700">
              {Number(formatEther(balance)).toFixed(2)} {token}
            </Text>
          </Flex>
        )}
      </div>
    </Stack>
  )
}
