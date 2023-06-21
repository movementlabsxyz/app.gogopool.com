import { Dispatch, ReactNode, SetStateAction, useState } from 'react'

import { Flex, Stack, Text, useTheme } from '@chakra-ui/react'
import { NumericFormat } from 'react-number-format'

import { AVAXPillUnit } from '../Dashboard/Cards/AVAXPillUnit'
import { GGPPillUnit } from '../Dashboard/Cards/GGPPillUnit'

import { InfoCircleIcon } from '@/common/components/CustomIcon'
import { Tooltip } from '@/common/components/Tooltip'

const parse = (val) => (!val || val < 0 ? 0 : Number(val))

type StakeInputProps = {
  amount: number
  setAmount?: Dispatch<SetStateAction<number>>
  exchangeRate?: number
  currencySymbol?: string
  balance?: string | number
  tooltip?: string
  token: string
  title: string
  note?: string
  icon?: ReactNode
  disabled?: boolean
  max?: number
  min?: number
  lowerText?: string
  lowerTextTooltip?: string
  lowerTextValue?: string | number
  canUseAll?: boolean
}

export const StakeInput = ({
  amount,
  balance,
  canUseAll,
  currencySymbol,
  disabled,
  exchangeRate,
  icon,
  lowerText,
  lowerTextTooltip,
  lowerTextValue,
  max,
  min,
  note,
  setAmount,
  title,
  token,
  tooltip,
}: StakeInputProps) => {
  const { colors } = useTheme()
  max = max || Infinity
  min = min || 0

  const [inputValue, setInputValue] = useState(amount)

  function useAllToken() {
    setInputValue(balance as number)
    setAmount && setAmount(balance as number)
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
            {canUseAll && balance && (
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
        <NumericFormat
          autoFocus
          className="w-full bg-transparent p-2 text-2xl font-medium outline-0 disabled:cursor-not-allowed"
          disabled={disabled}
          id="stake-avax-form"
          max={max}
          min={min}
          onValueChange={({ floatValue }) => {
            setAmount && setAmount(floatValue)
          }}
          placeholder="0.0"
          thousandSeparator
          value={inputValue}
        />
        {token === 'AVAX' ? <AVAXPillUnit /> : <GGPPillUnit />}
      </Flex>
      <div className="flex items-center justify-between">
        {lowerText && (
          <Tooltip content={lowerTextTooltip} placement="right">
            <Flex fontSize="sm" fontWeight="bold">
              {lowerText}
              {lowerTextTooltip && (
                <InfoCircleIcon className="ml-1 inline h-5 w-5" fill="blue.300" />
              )}
              <Text color="green.700" paddingLeft="1">
                {lowerTextValue}
              </Text>
            </Flex>
          </Tooltip>
        )}

        {balance && (
          <Flex fontSize="sm" fontWeight="bold" gap="2">
            Balance:
            <Text color="green.700">
              {balance} {token}
            </Text>
          </Flex>
        )}
      </div>
    </Stack>
  )
}
