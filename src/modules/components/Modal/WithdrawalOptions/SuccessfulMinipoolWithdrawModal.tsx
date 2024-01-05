import { FunctionComponent } from 'react'

import { CopyIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spacer,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { shortenTransactionHash } from '@usedapp/core'
import { formatUnits } from 'ethers/lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Title } from '@/common/components/Card'
import { useIsNodeIdActive } from '@/hooks/useOonodzNodeIdNFT'
import { HexString } from '@/types/cryptoGenerics'
import Minipool from '@/types/minipool'

interface SuccessfulMinipoolWithdrawModalProps {
  onClose: () => void
  minipool: Minipool
  transactionData: HexString
}

// contract call to determine if they are one-click val

export const SuccessfulMinipoolWithdrawModal: FunctionComponent<
  SuccessfulMinipoolWithdrawModalProps
> = ({ minipool, onClose, transactionData }) => {
  const toast = useToast()
  const router = useRouter()
  const copyTransaction = () => {
    navigator.clipboard.writeText(transactionData)
    toast({
      position: 'top',
      description: 'Copied!',
      status: 'info',
      duration: 2000,
      isClosable: true,
    })
  }

  const {
    data: { isRegistered },
  } = useIsNodeIdActive(minipool.nodeID)

  const handleRelaunchMinipool = () => {
    // Navigate to the create-minipool page and set the state
    router.push('/create-minipool?one-click-relaunch=true') // Update the URL as needed
  }

  return (
    <>
      <ModalHeader bg="blue.500" borderTopRadius="1rem" py="8">
        <Title color="white" fontSize={24}>
          Withdraw to Wallet
        </Title>
        <Text color="white" fontSize={12} opacity="60%">
          WITHDRAW OPTIONS
        </Text>
      </ModalHeader>
      <ModalBody p="0">
        <Stack align="center" gap={2} p="6">
          <Image
            alt="Avax Successfully Withdrawn"
            height={255.52}
            src="/assets/img/withdrawMinipoolOptions/withdrawAvaxSuccess.svg"
            width={452}
          />
          <Flex
            alignItems="center"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            width={350}
          >
            <Text align={'center'} className="text-md" pb={2}>
              {'You have successfully sent ' +
                formatUnits(minipool.avaxNodeOpAmt) +
                ' AVAX plus your ' +
                formatUnits(minipool.avaxNodeOpRewardAmt) +
                ' AVAX rewards to the wallet '}
              <span className="font-bold">{shortenTransactionHash(minipool.owner)}</span>
            </Text>
          </Flex>
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
              <Text textColor="yellow.900">AVAX SENT</Text>
              <Spacer />
              <Text>{formatUnits(minipool.avaxNodeOpInitialAmt)}</Text>
            </Flex>
            <Divider borderColor="yellow.800" opacity="60%" />
            <Flex py="4">
              <Text textColor="yellow.900">AVAX REWARDS SENT</Text>
              <Spacer />
              <Text>
                {formatUnits(
                  minipool.avaxNodeOpAmt
                    .add(minipool.avaxNodeOpRewardAmt)
                    .sub(minipool.avaxNodeOpInitialAmt),
                )}
              </Text>
            </Flex>
            <Divider borderColor="yellow.800" opacity="60%" />
            <Flex py="4">
              <Text textColor="yellow.900">TRANSACTION HASH</Text>
              <Spacer />
              <Flex align="center" cursor="pointer" gap="2" onClick={copyTransaction}>
                <Text>{shortenTransactionHash(transactionData)}</Text>
                <CopyIcon color="yellow.800" />
              </Flex>
            </Flex>
          </Box>
        </Stack>
      </ModalBody>
      <Divider borderColor="blue.100" />
      <ModalFooter>
        <Flex alignItems="center" width="100%">
          <Button className="underline" color="blue.400" onClick={onClose} size="sm" variant="link">
            Close
          </Button>
          <Spacer />
          {isRegistered === true ? (
            <Button onClick={handleRelaunchMinipool} size="md" variant="secondary-filled">
              Relaunch Minipool
            </Button>
          ) : isRegistered === false ? (
            <Link href="/create-minipool-manually">
              <Button size="md" variant="secondary-filled">
                Relaunch Minipool
              </Button>
            </Link>
          ) : (
            <Link href="/create-minipool">
              <Button size="md" variant="secondary-filled">
                Relaunch Minipool
              </Button>
            </Link>
          )}
        </Flex>
      </ModalFooter>
    </>
  )
}
