import { BigNumber, constants } from 'ethers'

import { CopyIcon } from '@chakra-ui/icons'
import { Box, Divider, Flex, Spacer, Stack, Text, useToast } from '@chakra-ui/react'
import { shortenTransactionHash } from '@usedapp/core'
import Image from 'next/image'
import stakeSuccess from 'public/assets/img/large_assets/stake-success.svg'
import { useAccount } from 'wagmi'

import { useGetContractCollateralizationRatio, useGetGGPStake } from '@/hooks/useStake'
import { HexString } from '@/types/cryptoGenerics'
import { displayBN } from '@/utils/numberFormatter'

interface ClaimAndRestakeModalSuccessProps {
  restakeAmount: BigNumber
  claimAmount: BigNumber
  transactionHash: HexString
}

export const ClaimAndRestakeModalSuccess = ({
  claimAmount,
  restakeAmount,
  transactionHash,
}: ClaimAndRestakeModalSuccessProps) => {
  const { address: account } = useAccount()
  const { data: ggpStake } = useGetGGPStake(account)
  const { data: straightRatio } = useGetContractCollateralizationRatio(account)

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
      <Image alt="Success!" height={251} src={stakeSuccess} width={353} />
      <Text align="center" width="480px">
        You&apos;ve successfully claimed{' '}
        <strong>{parseFloat(displayBN(claimAmount, 18))} GGP</strong> Tokens and restaked{' '}
        <strong>{parseFloat(displayBN(restakeAmount, 18))} GGP.</strong> Thanks for helping bring
        blockchain to the world!
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
          <Text textColor="yellow.900">GGP RESTAKED</Text>
          <Spacer />
          <Text>{displayBN(restakeAmount)}</Text>
        </Flex>
        <Divider borderColor="yellow.800" opacity="60%" />
        <Flex py="4">
          <Text textColor="yellow.900">TOTAL GGP STAKED</Text>
          <Spacer />
          <Text>{displayBN(ggpStake)}</Text>
        </Flex>
        <Divider borderColor="yellow.800" opacity="60%" />
        <Flex py="4">
          <Text textColor="yellow.900">GGP SENT TO WALLET</Text>
          <Spacer />
          <Text>{displayBN(claimAmount)}</Text>
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
