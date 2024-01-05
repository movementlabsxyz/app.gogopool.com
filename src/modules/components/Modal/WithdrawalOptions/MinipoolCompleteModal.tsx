import { FunctionComponent } from 'react'

import {
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
} from '@chakra-ui/react'
import { formatUnits } from 'ethers/lib/utils'

import { Title } from '@/common/components/Card'
interface MinipoolCompleteModalProps {
  onClose(): void
  minipool
  showWithdrawMinipool
  setTransactionData
}

export const MinipoolCompleteModal: FunctionComponent<MinipoolCompleteModalProps> = ({
  minipool,
  onClose,
  showWithdrawMinipool,
}) => {
  return (
    <>
      <ModalHeader bg="blue.500" borderTopRadius="1rem" py="8">
        <Title color="white" fontSize={24}>
          Withdraw Options
        </Title>
      </ModalHeader>
      <ModalBody p="0">
        <Stack align="center" gap={2} p="6">
          <Image
            alt="Minipool Complete"
            height={255.52}
            src="/assets/img/withdrawMinipoolOptions/minipoolCompleteSuccess.svg"
            width={452}
          />
          <Flex
            alignItems="center"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            width={350}
          >
            <Text align={'center'} className="text-md">
              Congratulations! You got{' '}
              <span className="font-bold">{formatUnits(minipool.avaxNodeOpRewardAmt)} AVAX</span> in
              staking rewards. Increase your ROI by staking more GGP and relaunching your Minipool.
            </Text>
            {/* There should be a conditional here, that determines which button to show based one oneclick or manual */}
            {/* <Button
              m="4"
              onClick={showOneClickWithdraw}
              size="md"
              sx={{ boxShadow: `0 16px 16px 0 ${colors.blue[100]}` }}
              variant="secondary-filled"
            >
              {' '}
              Withdraw and Relaunch...
            </Button> */}
          </Flex>
        </Stack>
      </ModalBody>
      <Divider borderColor="blue.100" />
      <ModalFooter>
        <Flex alignItems="center" width="100%">
          <Button className="underline" color="blue.400" onClick={onClose} size="sm" variant="link">
            Close
          </Button>
          <Spacer />
          <Button onClick={showWithdrawMinipool} size="sm" variant="secondary-outline">
            Withdraw All AVAX
          </Button>
        </Flex>
      </ModalFooter>
    </>
  )
}
