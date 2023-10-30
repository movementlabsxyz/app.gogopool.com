import { BigNumber } from 'ethers'

import { Box, useDisclosure } from '@chakra-ui/react'
import { useAccount } from 'wagmi'

import { DashboardContainer } from '@/common/components/Container'
import { PageHead } from '@/common/components/PageHead'
import useCeres from '@/hooks/useCeres'
import { useGetGGPRewards } from '@/hooks/useStake'
import Rewards from '@/modules/components/Dashboard/Cards/Rewards/Rewards'
import TotalStaked from '@/modules/components/Dashboard/Cards/TotalStaked'
import DashboardHeader from '@/modules/components/Dashboard/DashboardHeader'
import MinipoolTable from '@/modules/components/MinipoolTable'
import { ClaimAndRestakeModal } from '@/modules/components/Modal/ClaimAndRestakeModal'
import SurveyV2 from '@/modules/components/Modal/Survey/SurveyV2'
import { SidebarNavbar } from '@/modules/components/SidebarNavbar/SidebarNavbar'

const Dashboard = () => {
  const { address } = useAccount()
  const { data: ceresData, isLoading: ceresLoading } = useCeres()
  const { data: rewardsToClaimMaybe } = useGetGGPRewards(address)
  const rewardsToClaim = rewardsToClaimMaybe || BigNumber.from(0)

  const { isOpen, onClose, onOpen } = useDisclosure()
  const { isOpen: surveyIsOpen, onClose: surveyClose, onOpen: surveyOpen } = useDisclosure()

  if (ceresLoading) {
    return null
  }

  return (
    <Box className="bg-[#F7F9FF]" minH="full">
      <SurveyV2 surveyClose={surveyClose} surveyIsOpen={surveyIsOpen} />
      <PageHead append={false} description="Node Operator Dashboard" name="Dashboard" />
      <DashboardContainer>
        <ClaimAndRestakeModal
          isOpen={isOpen}
          onClose={onClose}
          openSurvey={surveyOpen}
          ownerAddress={address}
          rewardsToClaim={rewardsToClaim}
          status={'success'}
        />
        <DashboardHeader ceresData={ceresData} />
        <Box className="space-y-6 bg-[#F7F9FF] py-8" minH="full">
          <div className="flex shrink flex-wrap justify-around gap-4">
            <TotalStaked />
            <Rewards
              address={address}
              ceresData={ceresData}
              openClaimModal={onOpen}
              rewardsToClaim={rewardsToClaim}
            />
          </div>
          <MinipoolTable openSurvey={surveyOpen} ownerAddress={address} />
        </Box>
      </DashboardContainer>
    </Box>
  )
}

Dashboard.getLayout = function getLayout(page) {
  return <SidebarNavbar>{page}</SidebarNavbar>
}

export default Dashboard
