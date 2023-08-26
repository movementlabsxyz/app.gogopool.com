import { BigNumber } from 'ethers'

import { Box, useDisclosure } from '@chakra-ui/react'
import { useAccount } from 'wagmi'

import { PageHead } from '@/common/components/PageHead'
import { useGetGGPRewards } from '@/hooks/useStake'
import Rewards from '@/modules/components/Dashboard/Cards/Rewards'
import TotalStaked from '@/modules/components/Dashboard/Cards/TotalStaked'
import MinipoolTable from '@/modules/components/MinipoolTable'
import { ClaimAndRestakeModal } from '@/modules/components/Modal/ClaimAndRestakeModal'
import { SidebarNavbar } from '@/modules/components/SidebarNavbar/SidebarNavbar'

const Dashboard = () => {
  const { address } = useAccount()
  const { data: rewardsToClaimMaybe } = useGetGGPRewards(address)
  const rewardsToClaim = rewardsToClaimMaybe || BigNumber.from(0)

  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <>
      <PageHead append={false} description="Node Operator Dashboard" name="Dashboard" />

      <ClaimAndRestakeModal
        isOpen={isOpen}
        onClose={onClose}
        ownerAddress={address}
        rewardsToClaim={rewardsToClaim}
        status={'success'}
      />
      <Box className="space-y-6 bg-[#F7F9FF] p-8" minH="full">
        <TotalStaked />
        <Rewards address={address} openClaimModal={onOpen} rewardsToClaim={rewardsToClaim} />
        <MinipoolTable ownerAddress={address} />
      </Box>
    </>
  )
}

Dashboard.getLayout = function getLayout(page) {
  return <SidebarNavbar>{page}</SidebarNavbar>
}

export default Dashboard
