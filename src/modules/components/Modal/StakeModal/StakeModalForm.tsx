import { BigNumber, constants } from 'ethers'

import { Box, Divider, Flex, HStack, Link, Spacer, Text } from '@chakra-ui/react'
import { FiInfo } from 'react-icons/fi'
import { useAccount, useBalance } from 'wagmi'

import { GGPPillUnit } from '../../Dashboard/Cards/GGPPillUnit'

import { Button } from '@/common/components/Button'
import { Title } from '@/common/components/Card'
import { BigNumberInput } from '@/common/components/Input/BigNumberInput'
import { Tooltip } from '@/common/components/Tooltip'
import useTokenGGPContract from '@/hooks/contracts/tokenGGP'
import useCeres from '@/hooks/useCeres'
import { useGetFutureRatio } from '@/hooks/useGetFutureRatio'
import { useGetContractCollateralizationRatio, useGetGGPStake } from '@/hooks/useStake'
import { displayBN } from '@/utils/numberFormatter'

const daysInMillis = 1000 * 60 * 60 * 24

interface StakeModalFormProps {
  stakeAmount: BigNumber
  onChange: (value: BigNumber) => void
}

export const StakeModalForm = ({ onChange, stakeAmount }: StakeModalFormProps) => {
  const { address: account } = useAccount()
  const { data: ceresData } = useCeres()
  const { address: ggpAddress } = useTokenGGPContract()
  const { data: ggpBalanceMaybe } = useBalance({
    address: account,
    token: ggpAddress as `0x${string}`,
  })
  const { data: ggpStake } = useGetGGPStake(account)

  const ggpBalance = ggpBalanceMaybe?.value || BigNumber.from(0)

  const { data: straightRatio } = useGetContractCollateralizationRatio(account)
  const futureRatio = useGetFutureRatio({
    additionalGgp: stakeAmount,
  })

  const rewardsStartDateMillis = ceresData.rewardsCycleStartTime.value * 1000
  const nextCycleStartMillis = rewardsStartDateMillis + daysInMillis * 30
  const countdownToStart = nextCycleStartMillis - Date.now()
  const daysUntilCutoff = Math.floor(countdownToStart / daysInMillis)

  return (
    <>
      <Box px="6">
        <Flex align="center">
          <Box py="5">
            <Text as="strong" color="gray.500" fontSize={14}>
              Current Collateralization:{' '}
            </Text>
            <Text as="strong" fontSize={14}>
              {straightRatio.eq(constants.MaxUint256) ? '∞' : displayBN(straightRatio.mul(100))}%
            </Text>
          </Box>
          <Spacer />
          <Box>
            <Text as="strong" color="gray.500" fontSize={14}>
              Unstaked GGP:{' '}
            </Text>
            <Text as="strong" fontSize={14}>
              {' '}
              {parseFloat(displayBN(ggpBalance, 6))}
            </Text>
          </Box>
        </Flex>
      </Box>
      <Divider borderColor="blue.100" />
      <Box px="20" py="24">
        <Flex align="center" gap="4px">
          <Box fontSize={16}>
            <Text as="strong" color="gray.500">
              You currently have{' '}
            </Text>
            <Text as="strong">{parseFloat(displayBN(ggpStake, 6))} GGP staked</Text>
          </Box>
          <Box>
            <Tooltip
              //@ts-expect-error complaining about missing children prop
              chakraUIprops={{ closeDelay: 1000, pointerEvents: 'all' }}
              content={
                <Text>
                  Unstaking GGP could make you ineligible for GGP rewards. The next GGP rewards
                  cycle is in {daysUntilCutoff} days. Learn more about the GGP rewards cycle{' '}
                  <Link
                    color="white"
                    href="https://docs.gogopool.com/design/how-minipools-work/ggp-rewards"
                    target="_blank"
                  >
                    here.
                  </Link>
                </Text>
              }
              placement="top"
            >
              <FiInfo color="#867FA6" size="14px" />
            </Tooltip>
          </Box>
        </Flex>
        <Title fontWeight="500" lineHeight="40px" width="300px">
          How much more do you want to{' '}
          <Box as="span" color="blue.400">
            stake?
          </Box>
        </Title>
        <Box pt="5">
          <HStack
            border="1px"
            borderColor="blue.200"
            borderRadius="6px"
            className="focus-within:border-blue-400 focus-within:outline focus-within:outline-1 focus-within:outline-blue-400"
            pl="4"
            pr="2"
            py="2"
            spacing="2"
          >
            <Box as="span" fontSize={22} fontWeight="500" width={'100%'}>
              <BigNumberInput
                bnValue={stakeAmount}
                className="w-full border-none focus:border-none focus:outline-none"
                max={ggpBalance}
                min={BigNumber.from(0)}
                onChange={(value) => onChange(value)}
                placeholder="Enter staking amount..."
              />
            </Box>
            <Button
              className="underline"
              color="blue.400"
              onClick={() => onChange(ggpBalance)}
              size="sm"
              variant="link"
            >
              MAX
            </Button>
            <GGPPillUnit />
          </HStack>
        </Box>
        <Box pt="5">
          <Text as="strong" color="gray.500" fontSize={14}>
            Future Collateralization:{' '}
          </Text>
          <Text as="strong" color="green.700" fontSize={14}>
            {futureRatio.eq(constants.MaxUint256) ? '∞' : displayBN(futureRatio)}%
          </Text>
        </Box>
      </Box>
    </>
  )
}
