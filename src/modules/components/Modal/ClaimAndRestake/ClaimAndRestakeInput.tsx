import { FunctionComponent, useState } from 'react'

import { Divider, Flex, FormLabel, Spacer, Text } from '@chakra-ui/react'
import { Collapse } from '@mantine/core'
import { useChainModal } from '@rainbow-me/rainbowkit'
import { NumericFormat } from 'react-number-format'
import { useNetwork } from 'wagmi'

import { GGPPillUnit } from '../../Dashboard/Cards/GGPPillUnit'

import { Button } from '@/common/components/Button'

export interface ClaimAndRestakeModalProps {
  claim: any
  rewardsToClaim: any
  claimAmount: any
  setClaimAmount: any
  onClose: any
}

export const ClaimAndRestakeInput: FunctionComponent<ClaimAndRestakeModalProps> = ({
  claim,
  claimAmount,
  onClose,
  rewardsToClaim,
  setClaimAmount,
}) => {
  const [opened, setOpened] = useState(false)
  const { chain } = useNetwork()
  const { openChainModal } = useChainModal()

  return (
    <Flex direction="column" gap={2}>
      <Collapse in={opened}>
        <div className="flex items-center justify-between">
          <NumericFormat
            className="mr-5 w-full rounded-xl bg-gray-50 p-2"
            max={rewardsToClaim}
            min={0}
            onValueChange={({ floatValue }) => {
              setClaimAmount(floatValue)
            }}
            placeholder="0.0"
            thousandSeparator
            value={claimAmount}
          />
          <GGPPillUnit value={null} />
        </div>
        <Divider borderColor="grey.300" display={{ base: null, sm: 'none' }} mb="2" mt="2" />
        <FormLabel id="stake-avax" mb="1">
          <Text color="grey.600">Amount to remove from protocol</Text>
        </FormLabel>
      </Collapse>

      <div className="flex items-center justify-between">
        <NumericFormat
          className="mr-5 w-full rounded-xl bg-gray-50 p-2 disabled:cursor-not-allowed disabled:bg-gray-200"
          disabled
          min={0}
          placeholder="0.0"
          thousandSeparator
          value={rewardsToClaim - claimAmount < 0 ? 0 : rewardsToClaim - claimAmount}
        />
        <GGPPillUnit value={null} />
      </div>
      <Divider borderColor="grey.300" display={{ base: null, sm: 'none' }} mb="2" mt="2" />
      <FormLabel id="stake-avax" mb="1">
        <Text color="grey.600">Amount to restake into protocol</Text>
      </FormLabel>

      <Spacer />

      <div className="flex items-center justify-end space-x-6">
        <a className="underline" href="#" onClick={() => setOpened(!opened)}>
          Advanced
        </a>
        <a className="underline" href="#" onClick={onClose}>
          Back
        </a>

        {chain?.unsupported && (
          <Button onClick={openChainModal} variant="destructive-outline">
            Wrong network
          </Button>
        )}
        {!chain?.unsupported && (
          <Button disabled={!claim} onClick={claim} variant="primary">
            Claim and Restake
          </Button>
        )}
      </div>
    </Flex>
  )
}
