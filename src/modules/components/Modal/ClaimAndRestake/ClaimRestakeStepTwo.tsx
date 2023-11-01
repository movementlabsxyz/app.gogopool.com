import { BigNumber, constants } from 'ethers'

import { Box, Divider, Flex, Spacer, Text } from '@chakra-ui/react'
import { FiInfo } from 'react-icons/fi'
import { useAccount } from 'wagmi'

import { Title } from '@/common/components/Card'
import { Tooltip } from '@/common/components/Tooltip'
import { useGetGGPStake } from '@/hooks/useStake'
import { displayBN } from '@/utils/numberFormatter'

type ClaimRestakeStepTwoProps = {
  restakeAmount: BigNumber
  futureRatio: BigNumber
  claimAmount: BigNumber
  straightRatio: BigNumber
}

export default function ClaimRestakeStepTwo({
  claimAmount,
  futureRatio,
  restakeAmount,
  straightRatio,
}: ClaimRestakeStepTwoProps) {
  const { address } = useAccount()
  const { data } = useGetGGPStake(address)
  const newStake = data ? data.add(restakeAmount) : undefined
  return (
    <Box px="16" py="7">
      <Title fontWeight="500" lineHeight="40px">
        Confirm transaction details
      </Title>
      <Text fontSize={16}>
        You are about to restake <b>{parseFloat(displayBN(restakeAmount, 16))} GGP</b> and send{' '}
        <b>{parseFloat(displayBN(claimAmount, 16))} GGP</b> to your wallet address ending{' '}
        <b>{address.slice(-6)}</b>
      </Text>
      <Box fontSize={14} fontWeight={700} py="3" textColor="blue.900">
        <Flex align="center" gap="4px" py="3">
          <Text textColor="grey.400">GGP RESTAKE</Text>
          <Tooltip
            content={
              <Text>
                The amount of GGP you are restaking back into the protocol. You will be unable to
                unstake while your Minipool is running and must wait until its completion in order
                to unstake the amount to your wallet.
              </Text>
            }
            placement="top"
          >
            <FiInfo color="#A7A7B1" size="14px" />
          </Tooltip>
          <Spacer />
          <Text textColor="blue.500">{parseFloat(displayBN(restakeAmount, 16))}</Text>
        </Flex>
        <Flex align="center" gap="4px" py="3">
          <Text textColor="grey.400">TOTAL GGP STAKE</Text>
          <Tooltip
            content={
              <Text>
                This is the total amount you have staked in the protocol that also includes the
                upcoming restake amount above.
              </Text>
            }
            placement="top"
          >
            <FiInfo color="#A7A7B1" size="14px" />
          </Tooltip>
          <Spacer />
          <Text>{newStake ? parseFloat(displayBN(newStake)) : '...'}</Text>
        </Flex>
        <Flex py="3">
          <Text textColor="grey.400">GGP AMOUNT SENT TO YOUR WALLET</Text>
          <Spacer />
          <Text textColor="success.500">{parseFloat(displayBN(claimAmount, 18))}</Text>
        </Flex>
        <Divider borderColor="blue.100" opacity="60%" />

        <Flex align="center" gap="4px" py="3">
          <Text textColor="grey.400">FORMER COLLATERALIZATION</Text>
          <Tooltip
            content={
              <Text>Your collateralization ratio prior to your newly restaked amount above.</Text>
            }
            placement="top"
          >
            <FiInfo color="#A7A7B1" size="14px" />
          </Tooltip>
          <Spacer />
          <Text>
            {straightRatio.eq(constants.MaxUint256) ? '∞' : displayBN(straightRatio.mul(100))}%
          </Text>
        </Flex>
        <Flex align="center" gap="4px" py="3">
          <Text textColor="grey.400">NEW COLLATERALIZATION</Text>
          <Tooltip
            content={
              <Text>
                Your new collateralization ratio that includes the Total GGP Stake listed above. In
                order to increase this percentage, you must stake more GGP.
              </Text>
            }
            placement="top"
          >
            <FiInfo color="#A7A7B1" size="14px" />
          </Tooltip>
          <Spacer />
          <Text>{futureRatio.eq(constants.MaxUint256) ? '∞' : displayBN(futureRatio)}%</Text>
        </Flex>
      </Box>
    </Box>
  )
}
