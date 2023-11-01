import { FunctionComponent } from 'react'

import {
  Modal as ChakraModal,
  Divider,
  List,
  ListItem,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
} from '@chakra-ui/react'

import { Button } from '@/common/components/Button'
import { Title } from '@/common/components/Card'
import useCeres from '@/hooks/useCeres'

interface RewardFaqModalProps {
  onClose(): void
}

export const RewardFaqModal: FunctionComponent<RewardFaqModalProps> = ({ onClose }) => {
  const { data: ceresData, isLoading: ceresLoading } = useCeres()
  const { cutoffDate, nextCutoffDate, nextRewardsDate } = (() => {
    if (ceresLoading) {
      return { cutoffDate: '...', nextCutoffDate: '...', nextRewardsDate: '...' }
    }

    const oneMonthInSeconds = 24 * 60 * 60 * 30
    const cutoffInSeconds =
      ceresData.rewardsCycleStartTime.value + ceresData.rewardsEligibilityMinSeconds.value
    const cutoffDate = new Date(cutoffInSeconds * 1000)
    const nextCutoffDate = new Date((cutoffInSeconds + oneMonthInSeconds) * 1000)
    const nextRewardsDate = new Date(
      (ceresData.rewardsCycleStartTime.value + oneMonthInSeconds * 2) * 1000,
    )

    return {
      cutoffDate: cutoffDate.toLocaleDateString(),
      nextCutoffDate: nextCutoffDate.toLocaleDateString(),
      nextRewardsDate: nextRewardsDate.toLocaleDateString(),
    }
  })()

  return (
    <ChakraModal isCentered isOpen={true} onClose={onClose}>
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent border="0px" maxWidth="600px" p="0">
        <ModalHeader bg="blue.500" borderTopRadius="1rem" py="8">
          <Title color="white" fontSize={24}>
            How to earn Rewards
          </Title>
        </ModalHeader>
        <ModalBody p="10">
          <List spacing={6}>
            <ListItem maxW={490}>
              <Text
                fontFamily={'Jost'}
                fontSize={16}
                fontWeight={'700'}
                lineHeight={'24px'}
                pb={2}
                textTransform={'uppercase'}
              >
                When will I see my rewards?
              </Text>
              <Text color="grey.800" fontSize={14} lineHeight="22px">
                Reward cycles occur every 30 days. A Minipool must stake for at least 15 days during
                that cycle to earn rewards. That means you must launch your Minipool before certain
                dates to earn rewards for that cycle.{' '}
                <strong>The rewards eligibility cut off date is the last day</strong> that your
                Minipool can begin staking on the P-Chain to earn for that 30 day cycle.
              </Text>
            </ListItem>
            <ListItem maxW={490}>
              <Text
                fontFamily={'Jost'}
                fontSize={16}
                fontWeight={'700'}
                lineHeight={'24px'}
                pb={2}
                textTransform={'uppercase'}
              >
                Missed the Awards Eligibility?
              </Text>
              <Text color="grey.800" fontSize={14} lineHeight="22px">
                If you&apos;ve missed the rewards eligibilty cut off date of{' '}
                <strong>{cutoffDate}</strong>, there is still an opportunity to earn from the next
                rewards cycle. You will be eligible for rewards if your Minipool is launched before{' '}
                <strong>{nextCutoffDate}</strong> and you will recieve rewards on{' '}
                <strong>{nextRewardsDate}</strong> for that cycle.
              </Text>
            </ListItem>
            <ListItem maxW={490}>
              <Text
                fontFamily={'Jost'}
                fontSize={16}
                fontWeight={'700'}
                lineHeight={'24px'}
                pb={2}
                textTransform={'uppercase'}
              >
                How much can I stake to earn?
              </Text>
              <Text color="grey.800" fontSize={14} lineHeight="22px">
                You may stake as much GGP as you want, however,{' '}
                <strong>
                  please note that we only reward up to 150% of your staked GGP colleralization.
                </strong>{' '}
                That means, if you stake 160% you will only be eligible for rewards based on the
                150% portion and not the remaining 10%.
              </Text>
            </ListItem>
          </List>
        </ModalBody>
        <Divider borderColor="blue.100" />
        <ModalFooter>
          <Button
            className="underline"
            color="blue.400"
            onClick={onClose}
            p={5}
            size="sm"
            variant="link"
          >
            Close
          </Button>
          <Spacer />
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  )
}
