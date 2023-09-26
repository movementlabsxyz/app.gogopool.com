import { BigNumber, constants } from 'ethers'

import { CopyIcon } from '@chakra-ui/icons'
import { Box, Divider, Flex, Spacer, Stack, Text, useToast } from '@chakra-ui/react'
import { shortenTransactionHash } from '@usedapp/core'
import Image from 'next/image'
import stakeSuccess from 'public/assets/img/large_assets/stake-success.svg'
import { useAccount, useBalance } from 'wagmi'

import useTokenGGPContract from '@/hooks/contracts/tokenGGP'
import useCeres from '@/hooks/useCeres'
import { useGetContractCollateralizationRatio, useGetGGPStake } from '@/hooks/useStake'
import { HexString } from '@/types/cryptoGenerics'
import { displayBN } from '@/utils/numberFormatter'

interface StakeModalSuccessProps {
  stakeAmount: BigNumber
  transactionHash: HexString
}

export const StakeModalSuccess = ({ stakeAmount, transactionHash }: StakeModalSuccessProps) => {
  const { address: account } = useAccount()
  const { data: ceresData } = useCeres()
  const { address: ggpAddress } = useTokenGGPContract()
  const { data: ggpBalanceMaybe } = useBalance({
    address: account,
    token: ggpAddress,
  })
  const { data: ggpStake } = useGetGGPStake(account)
  const { data: straightRatio } = useGetContractCollateralizationRatio(account)

  const ggpBalance = ggpBalanceMaybe?.value || BigNumber.from(0)

  const cycleStart = ceresData.rewardsCycleStartTime.value
  const nextCycleStart = cycleStart + 24 * 60 * 60 * 30
  const nextCycleDate = new Date(nextCycleStart * 1000)

  const toast = useToast()
  const copyTransaction = () => {
    navigator.clipboard.writeText(transactionHash)
    toast({
      position: 'top',
      description: 'Copied!',
      status: 'info',
      duration: 2000,
      isClosable: true,
    })
  }

  return (
    <Stack align="center" gap={2} p="6">
      {/* TODO: Insert success graphic and banner */}
      <Image alt="Success!" height={251} src={stakeSuccess} width={353} />
      <Text align="center" width="480px">
        You&apos;ve successfully staked{' '}
        <strong>{parseFloat(displayBN(stakeAmount, 18))} GGP</strong> Tokens.
      </Text>
      <Box
        backgroundColor="caution.400"
        border="1px"
        borderBottom={'8px'}
        borderColor="yellow.800"
        borderRadius="1rem"
        fontSize={14}
        fontWeight={700}
        px="6"
        py="2"
        textColor="yellow.800"
        width="100%"
      >
        <Flex py="4">
          <Text textColor="yellow.900">TOTAL GGP BALANCE</Text>
          <Spacer />
          <Text>{displayBN(ggpBalance)}</Text>
        </Flex>
        <Divider borderColor="yellow.800" opacity="60%" />
        <Flex py="4">
          <Text textColor="yellow.900">TOTAL GGP STAKED</Text>
          <Spacer />
          <Text>{displayBN(ggpStake)}</Text>
        </Flex>
        <Divider borderColor="yellow.800" opacity="60%" />
        <Flex py="4">
          <Text textColor="yellow.900">NEW GGP STAKED</Text>
          <Spacer />
          <Text>{displayBN(stakeAmount)}</Text>
        </Flex>
        <Divider borderColor="yellow.800" opacity="60%" />
        <Flex py="4">
          <Text textColor="yellow.900">COLLATERALIZATION RATIO</Text>
          <Spacer />
          <Text>
            {straightRatio.eq(constants.MaxUint256) ? '∞' : displayBN(straightRatio.mul(100))}%
          </Text>
        </Flex>
        <Divider borderColor="yellow.800" opacity="60%" />
        <Flex py="4">
          <Text textColor="yellow.900">TRANSACTION HASH</Text>
          <Spacer />
          <Flex align="center" cursor="pointer" gap="2" onClick={copyTransaction}>
            <Text>{shortenTransactionHash(transactionHash)}</Text>
            <CopyIcon color="yellow.800" />
          </Flex>
        </Flex>
      </Box>
    </Stack>
  )
}
