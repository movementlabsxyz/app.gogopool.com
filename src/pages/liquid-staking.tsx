import { Box, VStack } from '@chakra-ui/react'

import { PageHead } from '@/common/components/PageHead'
import { SidebarLayout } from '@/common/components/SidebarLayout'
import { LiquidStaking } from '@/modules/components/LiquidStaking'

const Stake = () => {
  return (
    <Box className="bg-[#F7F9FF] py-24" minH="full">
      <PageHead append={false} description="Liquid Staking" name="Liquid Staking" />
      <VStack spacing="8">
        <LiquidStaking />
      </VStack>
    </Box>
  )
}

Stake.getLayout = function getLayout(page) {
  return <SidebarLayout>{page}</SidebarLayout>
}

export default Stake
