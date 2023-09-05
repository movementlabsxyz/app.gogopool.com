import { BigNumber } from 'ethers'
import * as React from 'react'

import { formatEther, parseEther } from 'ethers/lib/utils.js'

// 🙏 Prayer hands in chat
// Logic is similar to https://www.npmjs.com/package/big-number-input npm package

export type BigNumberInputProps = {
  onChange: (value: BigNumber) => void
  bnValue: BigNumber
  placeholder?: string
  max?: BigNumber
  min?: BigNumber
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'min' | 'max' | 'value' | 'onChange'>

export function BigNumberInput({
  bnValue,
  max,
  min,
  onChange,
  placeholder = '0.00',
  ...props
}: BigNumberInputProps) {
  const [inputValue, setInputvalue] = React.useState('')
  React.useEffect(() => {
    if (bnValue.eq('0') && inputValue == '') {
      setInputvalue('')
      return
    }
    let parseInputValue: BigNumber
    try {
      parseInputValue = parseEther(inputValue)
    } catch {
      // do nothing
    }

    if (!parseInputValue || !parseInputValue.eq(bnValue)) {
      setInputvalue(formatEther(bnValue))
    }
  }, [bnValue, inputValue])

  const updateValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget

    if (value === '') {
      setInputvalue(value)
      onChange(BigNumber.from('0'))
      return
    }

    let bigNumValue: BigNumber
    try {
      bigNumValue = parseEther(value)
    } catch (e) {
      // don't update the input on invalid values
      return
    }

    const invalidValue = (min && bigNumValue.lt(min)) || (max && bigNumValue.gt(max))
    if (invalidValue) {
      return
    }

    setInputvalue(value)
    onChange(bigNumValue)
  }

  const inputProps = {
    placeholder,
    onChange: updateValue,
    type: 'text',
    value: inputValue,
  }

  return <input {...inputProps} {...props} />
}
