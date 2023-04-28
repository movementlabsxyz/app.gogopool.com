import { Dispatch, SetStateAction } from 'react'

import { Divider, FormLabel, Text } from '@chakra-ui/react'
import { NumericFormat } from 'react-number-format'

import { AVAXPillUnit } from '../Dashboard/Cards/AVAXPillUnit'
import { GGPPillUnit } from '../Dashboard/Cards/GGPPillUnit'

export interface StakeFormProps {
  amount: number
  setAmount: Dispatch<SetStateAction<number>>
  setReward: Dispatch<SetStateAction<number>>
  balance: number
  token?: string
  header?: string
}

export const StakeForm = ({
  amount,
  balance,
  header,
  setAmount,
  setReward,
  token = 'AVAX',
}: StakeFormProps): JSX.Element => {
  const handleMaxClick = () => {
    setAmount(balance)
    setReward(0) // change Reward accordingly
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="relative w-full">
          <NumericFormat
            autoFocus
            className="w-full rounded-xl bg-gray-50 p-2 pr-16 text-3xl"
            min={0}
            onValueChange={({ floatValue }) => {
              setAmount(floatValue)
              setReward(0) // change Reward accordingly
            }}
            placeholder="0.0"
            thousandSeparator
            value={amount}
          />
          <button className="absolute top-0 right-0 h-full px-4" onClick={handleMaxClick}>
            Max
          </button>
        </div>
        {token === 'AVAX' ? (
          <AVAXPillUnit value={null} />
        ) : (
          <GGPPillUnit title="ggAVAX" value={null} />
        )}
      </div>
      <Divider borderColor="grey.300" display={{ base: null, sm: 'none' }} mb="2" mt="2" />
      <FormLabel htmlFor="stake-avax-form" id="stake-avax" mb="1">
        <Text color="grey.600">{header || 'Amount to stake'}</Text>
      </FormLabel>
      {balance ? (
        <div className="flex justify-end">
          <Text color="grey.600" size="xs">
            {`Balance ${balance.toLocaleString()} ${token}`}
          </Text>
        </div>
      ) : null}
    </>
  )
}
