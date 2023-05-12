import { FunctionComponent } from 'react'

import { Divider, Flex, FormLabel, Spacer, Text } from '@chakra-ui/react'
import { useChainModal } from '@rainbow-me/rainbowkit'
import { NumericFormat } from 'react-number-format'
import { useNetwork } from 'wagmi'

import { GGPPillUnit } from '../../Dashboard/Cards/GGPPillUnit'
import { ErrorMessage } from '../../Wizard/components/ErrorMessage'
import { MAX_RATIO } from '../../Wizard/components/StakeButton'

import { Button } from '@/common/components/Button'
import { useGetCollateralRatio } from '@/hooks/useGetCollateralRatio'

export interface ClaimAndRestakeModalProps {
  withdraw: any
  rewardsToClaim: any
  withdrawAmount: any
  setWithdrawAmount: any
  onClose: any
  ggpStake: any
}

export const UnstakeInput: FunctionComponent<ClaimAndRestakeModalProps> = ({
  ggpStake,
  onClose,
  rewardsToClaim,
  setWithdrawAmount,
  withdraw,
  withdrawAmount,
}) => {
  const { chain } = useNetwork()
  const { openChainModal } = useChainModal()

  const ratio = useGetCollateralRatio({ avaxAmount: 0, ggpAmount: -withdrawAmount })

  return (
    <Flex direction="column" gap={2}>
      <div className="mb-2 border-b border-gray-200 pb-5">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          <span>Unstake</span>
        </h3>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">Remove an amount from the protocol</p>
      </div>

      <div className="flex items-center justify-between">
        <NumericFormat
          className="mr-2 w-full rounded-xl bg-gray-50 p-2"
          max={rewardsToClaim}
          min={0}
          onValueChange={({ floatValue }) => {
            setWithdrawAmount(floatValue)
          }}
          placeholder="0.0"
          thousandSeparator
          value={withdrawAmount || 0}
        />
        <GGPPillUnit value={null} />
      </div>
      <Divider borderColor="grey.300" display={{ base: null, sm: 'none' }} mb="2" mt="2" />
      <FormLabel id="stake-avax" mb="1">
        <Text color="grey.600">Amount to unstake</Text>
      </FormLabel>

      <a
        className="text-right text-xs hover:underline"
        href="#"
        onClick={(e) => {
          e.preventDefault()
          setWithdrawAmount(rewardsToClaim)
        }}
      >
        Balance: {ggpStake.toLocaleString()} GGP
      </a>
      <div
        className={`text-right text-xs ${ratio < MAX_RATIO ? 'text-red-500' : 'text-green-700'}`}
      >
        Collateralization ratio: {(ratio || 0).toLocaleString()}%
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
          <Button disabled={!withdraw || ratio < MAX_RATIO} onClick={withdraw} variant="primary">
            Unstake
          </Button>
        )}
      </div>

      {ratio < MAX_RATIO && (
        <ErrorMessage message={`Ratio must be above ${MAX_RATIO}% to unstake`} />
      )}
    </Flex>
  )
}
