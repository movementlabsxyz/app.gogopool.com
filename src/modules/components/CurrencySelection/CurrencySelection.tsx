import { HStack, Select, Text } from '@chakra-ui/react'

import { SUPPORTED_CURRENCIES } from '@/constants/coingecko'

export interface CurrencySelectionProps {
  currency: string
  setCurrency: (currency: string) => void
  disabled?: boolean
}

const options = SUPPORTED_CURRENCIES.map((currency) => {
  return (
    <option key={currency} value={currency}>
      {currency.toUpperCase()}
    </option>
  )
})

const CurrencySelection = ({ currency, disabled, setCurrency }: CurrencySelectionProps) => {
  return (
    <HStack gap={1}>
      <Text fontWeight="bold">Currency</Text>
      <Select
        disabled={disabled}
        maxW="8rem"
        onChange={(e) => {
          setCurrency(e.target.value)
        }}
        value={currency}
      >
        {options}
      </Select>
    </HStack>
  )
}

export default CurrencySelection
