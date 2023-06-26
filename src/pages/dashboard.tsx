import { Box, useDisclosure } from '@chakra-ui/react'
import { useAccount } from 'wagmi'

import { PageHead } from '@/common/components/PageHead'
import { SidebarLayout } from '@/common/components/SidebarLayout'
import Rewards from '@/modules/components/Dashboard/Cards/Rewards'
import TotalStaked from '@/modules/components/Dashboard/Cards/TotalStaked'
import MinipoolTable from '@/modules/components/MinipoolTable'
import { ClaimAndRestakeModal } from '@/modules/components/Modal/ClaimAndRestakeModal'

const Dashboard = () => {
  const { address } = useAccount()

  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <>
      <PageHead append={false} description="Node Operator Dashboard" name="Dashboard" />
      <ClaimAndRestakeModal
        isOpen={isOpen}
        onClose={onClose}
        ownerAddress={address}
        status={'success'}
      />
      <Box className="space-y-6 bg-[#F7F9FF] p-12" minH="full">
        <TotalStaked />
        <Rewards address={address} openClaimModal={onOpen} />

        <MinipoolTable ownerAddress={address} />
      </Box>
    </>
  )
}

Dashboard.getLayout = function getLayout(page) {
  return <SidebarLayout>{page}</SidebarLayout>
}

export default Dashboard
