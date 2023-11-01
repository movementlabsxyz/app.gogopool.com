import { BigNumber, constants } from 'ethers'

import { Box, Button, Flex, Spacer, Text } from '@chakra-ui/react'
import { formatEther } from 'ethers/lib/utils.js'

import { GGPPillUnit } from '../../Dashboard/Cards/GGPPillUnit'

import { Title } from '@/common/components/Card'
import BNWrapper from '@/common/components/Input/BNWrapper'
import { BigNumberInput } from '@/common/components/Input/BigNumberInput'
import { displayBN } from '@/utils/numberFormatter'

type ClaimRestakeStepOneProps = {
  restakeAmount: BigNumber
  straightRatio: BigNumber
  futureRatio: BigNumber
  claimAmount: BigNumber
  rewardsToClaim: BigNumber
  setRestakeAndClaim: (val: BigNumber) => void
}

export default function ClaimRestakeStepOne({
  claimAmount,
  futureRatio,
  restakeAmount,
  rewardsToClaim,
  setRestakeAndClaim,
  straightRatio,
}: ClaimRestakeStepOneProps) {
  return (
    <>
      <Flex align="center" px="6">
        <Box py="5">
          <Text as="strong" color="gray.500" fontSize={14}>
            GGP Rewards:{' '}
          </Text>
          <Text as="strong" fontSize={14}>
            {formatEther(rewardsToClaim)} GGP
          </Text>
        </Box>
        <Spacer />
        <Box>
          <Text as="strong" color="gray.500" fontSize={14}>
            Current Collateralization:{' '}
          </Text>
          <Text as="strong" fontSize={14}>
            {straightRatio.eq(constants.MaxUint256) ? '∞' : displayBN(straightRatio.mul(100))}%
          </Text>
        </Box>
      </Flex>
      <Box pb="24" pt="16" px="20">
        <Title fontWeight="500" lineHeight="40px" width="300px">
          How much do you want to restake?
        </Title>
        <BNWrapper>
          <Box as="span" fontSize={22} fontWeight="500" width={'100%'}>
            <BigNumberInput
              bnValue={restakeAmount}
              className="w-full border-none focus:border-none focus:outline-none"
              max={restakeAmount.add(claimAmount)}
              min={BigNumber.from(0)}
              onChange={(value) => {
                setRestakeAndClaim(value)
              }}
              placeholder="Enter 0 to claim all..."
            />
          </Box>
          <Button
            className="underline"
            color="blue.400"
            onClick={() => {
              setRestakeAndClaim(restakeAmount.add(claimAmount))
            }}
            size="sm"
            variant="link"
          >
            MAX
          </Button>
          <GGPPillUnit />
        </BNWrapper>
        <Flex pt="5">
          <Box>
            <Text as="strong" color="gray.500" fontSize={14}>
              Future Collateralization:{' '}
            </Text>
            <Text as="strong" color="green.700" fontSize={14}>
              {futureRatio.eq(constants.MaxUint256) ? '∞' : displayBN(futureRatio)}%
            </Text>
          </Box>
          <Spacer />
          <Box>
            <Text as="strong" color="gray.500" fontSize={14}>
              Withdraw Amount:{' '}
            </Text>
            <Text as="strong" color="green.700" fontSize={14}>
              {parseFloat(displayBN(claimAmount, 18))} GGP
            </Text>
          </Box>
        </Flex>
      </Box>
    </>
  )
}
