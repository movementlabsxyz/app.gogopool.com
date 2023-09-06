import { BigNumber, constants } from 'ethers'
import { FunctionComponent } from 'react'

import { Divider, Flex, FormLabel, Spacer, Text } from '@chakra-ui/react'
import { useChainModal } from '@rainbow-me/rainbowkit'
import { useNetwork } from 'wagmi'

import { GGPPillUnit } from '../../Dashboard/Cards/GGPPillUnit'
import { ErrorMessage } from '../../Wizard/components/ErrorMessage'
import { MAX_RATIO } from '../../Wizard/components/StakeButton'

import { Button } from '@/common/components/Button'
import { Title } from '@/common/components/Card'
import { BigNumberInput } from '@/common/components/Input/BigNumberInput'
import { useGetCollateralRatio } from '@/hooks/useGetCollateralRatio'
import { displayBN } from '@/utils/numberFormatter'

interface UnstakeInputProps {
  withdraw: () => void
  rewardsToClaim: BigNumber
  withdrawAmount: BigNumber
  setWithdrawAmount: (arg0: BigNumber) => void
  onClose: () => void
  ggpStake: BigNumber
}

export const UnstakeInput: FunctionComponent<UnstakeInputProps> = ({
  ggpStake,
  onClose,
  rewardsToClaim,
  setWithdrawAmount,
  withdraw,
  withdrawAmount,
}) => {
  const { chain } = useNetwork()
  const { openChainModal } = useChainModal()

  const ratio = useGetCollateralRatio({ ggpAmount: BigNumber.from(0).sub(withdrawAmount) })

  const min = BigNumber.from(0)
  const max = rewardsToClaim.add(ggpStake)

  return (
    <Flex direction="column" gap={2}>
      <div className="border-b border-gray-200 pb-4">
        <Title>Unstake</Title>
        <p className="max-w-4xl text-sm text-gray-500">Remove an amount from the protocol</p>
      </div>

      <div className="flex items-center justify-between">
        <BigNumberInput
          bnValue={withdrawAmount}
          className="mr-2 w-full rounded-xl bg-gray-50 p-2"
          max={max}
          min={min}
          onChange={setWithdrawAmount}
        />
        <GGPPillUnit value={null} />
      </div>
      <Divider borderColor="grey.300" display={{ base: null, sm: 'none' }} mb="2" mt="2" />
      <FormLabel id="stake-avax" mb="1">
        <Text color="grey.600">Amount to unstake</Text>
      </FormLabel>

      <span className="text-right text-xs hover:underline">Balance: {displayBN(ggpStake)} GGP</span>
      <div
        className={`text-right text-xs ${ratio.lt(MAX_RATIO) ? 'text-red-500' : 'text-green-700'}`}
      >
        Collateralization ratio: {ratio.eq(constants.MaxUint256) ? '∞' : displayBN(ratio)}%
      </div>
      <Spacer />
      <div className="flex items-center justify-end space-x-6">
        <a className="underline" href="#" onClick={onClose}>
          Cancel
        </a>
        {chain?.unsupported && (
          <Button onClick={openChainModal} variant="destructive-outline">
            Wrong network
          </Button>
        )}
        {!chain?.unsupported && (
          <Button
            disabled={!withdraw || ratio.lt(MAX_RATIO)}
            onClick={withdraw}
            size="sm"
            variant="primary"
          >
            Unstake
          </Button>
        )}
      </div>

      {ratio.lt(MAX_RATIO) && (
        <ErrorMessage message={`Ratio must be above ${MAX_RATIO}% to unstake`} />
      )}
    </Flex>
  )
}
