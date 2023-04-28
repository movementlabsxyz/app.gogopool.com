import { Box, useDisclosure } from '@chakra-ui/react'
import { useAccount } from 'wagmi'

import { PageHead } from '@/common/components/PageHead'
import { SidebarLayout } from '@/common/components/SidebarLayout'
import Rewards from '@/modules/components/Dashboard/Cards/Rewards'
import TotalStaked from '@/modules/components/Dashboard/Cards/TotalStaked'
import MinipoolTable from '@/modules/components/MinipoolTable'
import { ClaimAndRestakeModal } from '@/modules/components/Modal/ClaimAndRestakeModal'

const Dashboard = () => {
  const { address, isConnected } = useAccount()

  const { isOpen, onClose, onOpen } = useDisclosure()

  // TODO Fix this math with correct startTime rather than Date.now()

  // this is returning a big number idk why
  // https://discord.com/channels/939938177618165791/942176409957302352/1034478557117816884
  // const { data: ratio } = useGetCollateralizationRatio(address);

  // Here is where I'm going to get the data
  // I think it should be apparent what the user is claiming for when they claim
  // Previous period and the amount of rewards that the user should get if they claim
  // and the next period?
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
