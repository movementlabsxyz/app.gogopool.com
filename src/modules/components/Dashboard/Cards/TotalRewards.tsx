import { Text, VStack } from '@chakra-ui/react'

import { Card, Title } from '@/common/components/Card'

export interface TotalRewardsProps {
  rewards: string
}

const TotalRewards = ({ rewards }: TotalRewardsProps) => {
  return (
    <Card
      borderRadius={10}
      className="my-2 border shadow-lg"
      display="flex"
      flexDirection="column"
      width="30rem"
    >
      <Title fontSize={'2xl'}>Total Rewards</Title>
      <VStack>
        <Text fontSize={'2xl'} fontWeight={'bold'}>
          {rewards}
        </Text>
      </VStack>
    </Card>
  )
}

export default TotalRewards
