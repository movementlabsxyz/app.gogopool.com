import { Dispatch, ReactNode, SetStateAction } from 'react'

import { Divider, Flex, Stack, Text } from '@chakra-ui/react'
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
  icon?: ReactNode
  disabled?: boolean
  max?: number
  min?: number
  lowerText?: string | ReactNode
}

export const StakeInput = ({
  amount,
  balance,
  currencySymbol,
  disabled,
  exchangeRate,
  icon,
  lowerText,
  max,
  min,
  setAmount,
  title,
  token,
  tooltip,
}: StakeInputProps) => {
  max = max || Infinity
  min = min || 0
  return (
    <Stack bg="grey.100" px="4" py={3} rounded="2xl" width="100%">
      <Flex alignItems="center" gap="2" justifyContent="space-between" mb={2}>
        <NumericFormat
          autoFocus
          className=" mr-2 w-full rounded-xl bg-gray-50 p-2 text-right text-3xl disabled:cursor-not-allowed disabled:bg-gray-200"
          disabled={disabled}
          id="stake-avax-form"
          max={max}
          min={min}
          onValueChange={({ floatValue }) => {
            setAmount && setAmount(floatValue)
          }}
          placeholder="0.0"
          thousandSeparator
          value={amount}
        />
        {token === 'AVAX' ? <AVAXPillUnit /> : <GGPPillUnit />}
      </Flex>
      <Divider borderColor="grey.300" mb="2" mt="2" />
      <div className="flex items-center justify-between">
        <Tooltip content={tooltip} placement="right">
          <Text className="flex items-center" color="grey.600">
            <span>{title}</span>
            {tooltip && (
              <span>
                <InfoCircleIcon className="ml-1 inline h-5 w-5" fill="grey.600" />
              </span>
            )}
          </Text>
        </Tooltip>

        <div className="text-right">
          {balance && (
            <Text color="grey.600" size="xs">
              {`Balance: ${balance} ${token}`}
            </Text>
          )}

          {exchangeRate?.toString() && exchangeRate !== 0 ? (
            <Text color="grey.600">
              1 {token} = {currencySymbol}
              {exchangeRate}
            </Text>
          ) : null}
          {lowerText && (
            <Text color="grey.600" size="xs">
              {lowerText}
            </Text>
          )}
        </div>
      </div>
    </Stack>
  )
}
