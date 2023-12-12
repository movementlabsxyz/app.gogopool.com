import { FunctionComponent } from 'react'

import {
  Modal as ChakraModal,
  Divider,
  Flex,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react'
import Image from 'next/image'
import { AiFillStar } from 'react-icons/ai'
import { BsGraphUpArrow } from 'react-icons/bs'
import { FiInfo } from 'react-icons/fi'

import { Button } from '@/common/components/Button'
import { Title } from '@/common/components/Card'

import avaxIcon from '/public/assets/img/token/avax.png'
import ggavaxIcon from '/public/assets/img/token/gg-avax.svg'

import { Tooltip } from '@/common/components/Tooltip'

interface UnstakeModalProps {
  onClose(): void
}

export const RoiComparisonModal: FunctionComponent<UnstakeModalProps> = ({ onClose }) => {
  return (
    <ChakraModal isCentered isOpen={true} onClose={onClose}>
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent border="0px" maxWidth="600px" p="0">
        <ModalHeader bg="blue.500" borderTopRadius="1rem" py="8">
          <Flex align="center" gap="2">
            <BsGraphUpArrow color="white" />
            <Title color="white" fontSize={24}>
              ROI Comparison Chart
            </Title>
          </Flex>
        </ModalHeader>
        <ModalBody p="0">
          {/* This whole thing should probably be a table, but we don't have any styling
          set up for table elements and it was causing problems */}
          <SimpleGrid columns={2} fontSize={16} fontWeight={700} lineHeight="24px" spacing={0}>
            <Flex
              align="center"
              borderRight="1px"
              borderRightColor="#dbd7fb99" // 60% opacity blue.100 to match dividers
              gap="4"
              justify="center"
              p="6"
            >
              <Image alt="AVAX" src={avaxIcon} width={24} />
              <Text>Avalanche Validator Solo</Text>
            </Flex>
            <Flex align="center" gap="4" justify="center" p="6">
              <Image alt="GGAvax" src={ggavaxIcon} width={24} />
              <Text>GoGoPool Validator</Text>
            </Flex>
          </SimpleGrid>
          <Divider borderColor="blue.100" />
          <SimpleGrid columns={2} fontSize={14} fontWeight={700} lineHeight="22px" spacing={0}>
            <Flex
              align="start"
              borderRight="1px"
              borderRightColor="#dbd7fb99" // 60% opacity blue.100 to match dividers
              justify="start"
              p="6"
            >
              <Stack gap="4" width="100%">
                <Flex>
                  <Text color="grey.400">UPFRONT COST</Text>
                  <Spacer />
                  <Stack spacing={0} textAlign="right">
                    <Text>2000 AVAX</Text>
                    {/* Hack to line up the rows, invisible period */}
                    <Text fontSize={10} lineHeight="16px" opacity={0}>
                      .
                    </Text>
                  </Stack>
                </Flex>
                <Flex>
                  <Text color="grey.400">VALIDATOR FEE</Text>
                  <Spacer />
                  <Text>2 AVAX</Text>
                </Flex>
                <Flex>
                  <Text color="grey.400">AVAX REWARDS</Text>
                  <Spacer />
                  <Text>5.54 AVAX</Text>
                </Flex>
                <Flex>
                  <Text color="grey.400">ROI</Text>
                  <Spacer />
                  <Text>4.75%</Text>
                </Flex>
              </Stack>
            </Flex>
            <Flex align="start" justify="start" p="6">
              <Stack gap="4" width="100%">
                <Flex align="start">
                  <Flex align="center" gap="3px">
                    <Text color="grey.400">UPFRONT COST</Text>
                    <Tooltip
                      content={
                        <Text>
                          To start a Minipool you only need to have 1000 AVAX and a minimum of 100
                          AVAX
                        </Text>
                      }
                      placement="top"
                    >
                      <FiInfo color="#A7A7B1" />
                    </Tooltip>
                  </Flex>
                  <Spacer />
                  <Stack spacing={0} textAlign="right">
                    <Text>1000 AVAX</Text>
                    <Text color="blue.400" fontSize={10} lineHeight="16px">
                      +100 AVAX IN GGP
                    </Text>
                  </Stack>
                </Flex>
                <Flex>
                  <Text color="grey.400">VALIDATOR FEE</Text>
                  <Spacer />
                  <Text>2 AVAX</Text>
                </Flex>
                <Flex>
                  <Text color="grey.400">AVAX REWARDS</Text>
                  <Spacer />
                  <Text>2.256 AVAX</Text>
                </Flex>
                <Flex>
                  <Flex align="center" color="blue.500" gap="1">
                    <Text>GGP REWARDS</Text>
                    {/* -2px margin to get better optical alignment */}
                    <AiFillStar size="16px" style={{ marginTop: '-2px' }} />
                  </Flex>
                  <Spacer />
                  <Text>270 GGP</Text>
                </Flex>
                <Flex>
                  <Text color="grey.400">ROI</Text>
                  <Spacer />
                  <Text>30%</Text>
                </Flex>
              </Stack>
            </Flex>
          </SimpleGrid>
        </ModalBody>
        <Divider borderColor="blue.100" />
        <ModalFooter>
          <Flex alignItems="center" width="100%">
            <Button
              className="underline"
              color="blue.400"
              onClick={onClose}
              size="sm"
              variant="link"
            >
              Close
            </Button>
            <Spacer />
            <Button
              _hover={{ backgroundColor: 'blue.600' }}
              backgroundColor="blue.500"
              color="white"
              size="sm"
              variant="primary"
            >
              <a
                href="https://gogopool.dappling.network/calculator"
                rel="noreferrer"
                target="_blank"
              >
                Customize with ROI Calculator
              </a>
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  )
}
