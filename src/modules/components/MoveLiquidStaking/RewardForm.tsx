import { BigNumber } from 'ethers'
import { FunctionComponent } from 'react'

import { Divider, FormLabel, Text } from '@chakra-ui/react'

import { AVAXPillUnit } from '../Dashboard/Cards/AVAXPillUnit'
import { GGPPillUnit } from '../Dashboard/Cards/GGPPillUnit'

import { BigNumberInput } from '@/common/components/Input/BigNumberInput'
import { displayBN } from '@/utils/numberFormatter'

interface Props {
  reward: BigNumber
  balance: BigNumber
  token?: string
}

export const RewardForm: FunctionComponent<Props> = ({ balance, reward, token = 'ggAVAX' }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <BigNumberInput
          autoFocus
          bnValue={reward}
          className="mr-2 w-full rounded-xl bg-gray-50 p-2 text-3xl disabled:bg-gray-200"
          disabled
          max={balance}
          min={BigNumber.from(0)}
          onChange={() => undefined}
          placeholder="0.0"
        />
        {token === 'AVAX' ? (
          <AVAXPillUnit value={null} />
        ) : (
          <GGPPillUnit title="ggAVAX" value={null} />
        )}
      </div>
      <Divider borderColor="grey.300" display={{ base: null, sm: 'none' }} mb="2" mt="2" />
      <FormLabel htmlFor="stake-avax-form" id="stake-avax" mb="1">
        <Text color="grey.600">Tokens received</Text>
      </FormLabel>
      <div className="flex justify-end">
        <Text color="grey.600" size="xs">
          {`Balance ${displayBN(balance)} ${token}`}
        </Text>
      </div>
    </>
  )
}
