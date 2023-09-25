import { BigNumber, constants } from 'ethers'

import { CopyIcon } from '@chakra-ui/icons'
import { Box, Divider, Flex, Heading, Spacer, Text, useToast } from '@chakra-ui/react'
import { shortenTransactionHash } from '@usedapp/core'
import Image from 'next/image'
import { FiInfo } from 'react-icons/fi'
import { useAccount, useBalance } from 'wagmi'

import { Tooltip } from '@/common/components/Tooltip'
import useTokenGGPContract from '@/hooks/contracts/tokenGGP'
import { useGetContractCollateralizationRatio, useGetGGPStake } from '@/hooks/useStake'
import { HexString } from '@/types/cryptoGenerics'
import { displayBN } from '@/utils/numberFormatter'

import AccessDefi from '/public/assets/img/large_assets/access-defi.svg'

interface UnstakeModalSuccessProps {
  withdrawAmount: BigNumber
  transactionHash: HexString
}

export const UnstakeModalSuccess = ({
  transactionHash,
  withdrawAmount,
}: UnstakeModalSuccessProps) => {
  const { address: account } = useAccount()
  const { address: ggpAddress } = useTokenGGPContract()
  const { data: ggpBalanceMaybe } = useBalance({
    address: account,
    token: ggpAddress,
  })
  const { data: ggpStake } = useGetGGPStake(account)
  const { data: straightRatio } = useGetContractCollateralizationRatio(account)

  const ggpBalance = ggpBalanceMaybe?.value || BigNumber.from(0)

  const toast = useToast()
  const copyText = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      position: 'top',
      description: 'Copied!',
      status: 'info',
      duration: 2000,
      isClosable: true,
    })
  }

  return (
    <Box px="6" py="8">
      <Flex align="center" gap="4">
        <Box>
          <Heading fontSize="60px" fontWeight={500} lineHeight={'66px'}>
            Success!
          </Heading>
          <Text fontWeight={500} mt="2">
            You&apos;ve successfully unstaked{' '}
            <strong>{parseFloat(displayBN(withdrawAmount, 18))} GGP</strong> Tokens and they have
            been sent to your wallet.
          </Text>
        </Box>
        <Spacer />
        <Image alt="Success" height="128" src={AccessDefi} width="128" />
      </Flex>
      <Divider borderColor="blue.100" my="7" />
      <Text fontSize={16}>
        <strong>UNSTAKING RECEIPT INFORMATION</strong>
      </Text>
      <Box as="span" fontSize={14} fontWeight={700}>
        <Flex align="center" gap="4px" py="3">
          <Text textColor="grey.400">TOTAL GGP BALANCE</Text>
          <Tooltip
            content={
              <Text>
                This is the total amount of GGP you have in your wallet and in the protocol.
              </Text>
            }
            placement="top"
          >
            <FiInfo color="#A7A7B1" size="14px" />
          </Tooltip>
          <Spacer />
          <Text>{displayBN(ggpBalance)}</Text>
        </Flex>
        <Flex align="center" gap="4px" py="3">
          <Text textColor="grey.400">TOTAL GGP STAKED</Text>
          <Tooltip
            content={
              <Text>This is the amount of GGP you have staked in the protocol currently.</Text>
            }
            placement="top"
          >
            <FiInfo color="#A7A7B1" size="14px" />
          </Tooltip>
          <Spacer />
          <Text>{displayBN(ggpStake)}</Text>
        </Flex>
        <Flex py="3">
          <Text textColor="grey.400">GGP AMOUNT SENT TO YOUR WALLET</Text>
          <Spacer />
          <Text>{parseFloat(displayBN(withdrawAmount, 18))}</Text>
        </Flex>
        <Flex align="center" gap="4px" py="3">
          <Text textColor="grey.400">COLLATERALIZATION</Text>
          <Tooltip
            content={
              <Text>
                This collateralization ratio is based on your new GGP staked amount in the protocol.
                This percentage impacts the amount of GGP rewards you will receive.
              </Text>
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
        <Divider borderColor="blue.100" opacity="60%" />
        <Flex align="center" gap="4px" py="3">
          <Text textColor="grey.400">TRANSACTION HASH</Text>
          <Tooltip
            content={<Text>You can use this hash to verify your transaction on Snowtrace.</Text>}
            placement="top"
          >
            <FiInfo color="#A7A7B1" size="14px" />
          </Tooltip>
          <Spacer />
          <Flex align="center" cursor="pointer" gap="2" onClick={() => copyText(transactionHash)}>
            <Text>{shortenTransactionHash(transactionHash)}</Text>
            <CopyIcon />
          </Flex>
        </Flex>
        <Flex py="3">
          <Text textColor="grey.400">YOUR WALLET ADDRESS</Text>
          <Spacer />
          <Flex align="center" cursor="pointer" gap="2" onClick={() => copyText(account)}>
            <Text>{shortenTransactionHash(account)}</Text>
            <CopyIcon />
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}
