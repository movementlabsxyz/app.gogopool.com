import { useState } from 'react'

import { Radio, RadioGroup } from '@chakra-ui/react'

import CollatDetails from './CollatDetails'
import CollatoralizationRadio from './CollatoralizationRadio'

export default function WelcomeRewards() {
  const [collat, setCollat] = useState('10')

  return (
    <div className="flex w-full flex-wrap justify-around gap-y-3 pt-11">
      <div className="flex grow basis-[380px]">
        <RadioGroup
          className="flex flex-col justify-between gap-3"
          onChange={setCollat}
          value={collat}
        >
          <CollatoralizationRadio
            checked={collat === '10'}
            details="Interested in starting small? Our protocol allows for you to stake as little as 10% in GGP for collatoral to match the 1000 AVAX needed."
            radio=<Radio colorScheme={'purple'} value={'10'}>
              <div className="text-lg font-semibold text-blue-900">10% Collateralization</div>
            </Radio>
          />
          <CollatoralizationRadio
            checked={collat === '150'}
            details="Go big or go home? By going to the max of 150% ratio, you maximize the best opportunity for rewards. Watch those earnings fly in!"
            radio=<Radio colorScheme={'purple'} value={'150'}>
              <div className="text-lg font-semibold text-blue-900">150% Collateralization</div>
            </Radio>
          />
        </RadioGroup>
      </div>

      {collat === '10' && (
        <CollatDetails
          avaxDeposited={1000}
          avaxRewards={6.25}
          collatPercent={10}
          ggpRewards={116.08}
          ggpStaked={596.89}
          roi={2.33}
        />
      )}
      {collat === '150' && (
        <CollatDetails
          avaxDeposited={1000}
          avaxRewards={6.25}
          collatPercent={150}
          ggpRewards={1681.45}
          ggpStaked={8953.52}
          roi={11.52}
        />
      )}
    </div>
  )
}
