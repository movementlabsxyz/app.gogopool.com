import { Box, VStack } from '@chakra-ui/react'

import { PageHead } from '@/common/components/PageHead'
import { MoveLiquidStaking } from '@/modules/components/MoveLiquidStaking'
import { SidebarNavbar } from '@/modules/components/SidebarNavbar/SidebarNavbar'

const Stake = () => {
  return (
    <Box className="bg-[#F7F9FF] pt-8" minH="full">
      <PageHead append={false} description="Liquid Staking" name="Liquid Staking" />
      <VStack spacing="8">
        <MoveLiquidStaking />
      </VStack>
    </Box>
  )
}

Stake.getLayout = function getLayout(page) {
  return <SidebarNavbar>{page}</SidebarNavbar>
}

export default Stake
