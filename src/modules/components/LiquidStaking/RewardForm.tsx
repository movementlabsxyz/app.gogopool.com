import { FunctionComponent } from 'react'

import { Divider, FormLabel, Text } from '@chakra-ui/react'
import { NumericFormat } from 'react-number-format'

import { AVAXPillUnit } from '../Dashboard/Cards/AVAXPillUnit'
import { GGPPillUnit } from '../Dashboard/Cards/GGPPillUnit'

import { AvalancheIcon } from '@/common/components/CustomIcon/AvalancheIcon'

interface Props {
  reward: number
  balance: number
  token?: string
  icon?: JSX.Element
}

export const RewardForm: FunctionComponent<Props> = ({
  reward,
  balance,
  token = 'ggAVAX',
  icon = <AvalancheIcon />,
}) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <NumericFormat
          autoFocus
          className="mr-2 w-full rounded-xl bg-gray-50 p-2 text-3xl disabled:bg-gray-200"
          disabled
          min={0}
          placeholder="0.0"
          thousandSeparator
          value={reward}
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
          {`Balance ${balance.toLocaleString()} ${token}`}
        </Text>
      </div>
    </>
  )
}
