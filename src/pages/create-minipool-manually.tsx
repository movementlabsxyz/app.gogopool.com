import { useState } from 'react'

import { Box } from '@chakra-ui/react'

import { PageHead } from '@/common/components/PageHead'
import { SidebarNavbar } from '@/modules/components/SidebarNavbar/SidebarNavbar'
import { Wizard } from '@/modules/components/Wizard'

function NodeOperator() {
  const [currentStep, setCurrentStep] = useState<number>(1)

  return (
    <Box className="bg-[#F7F9FF] py-8" minH="full">
      <PageHead
        append={false}
        description="Stake AVAX on the GoGoPool Protocol."
        name="Create Minipool"
      />
      <Wizard currentStep={currentStep} setCurrentStep={setCurrentStep} />
    </Box>
  )
}

NodeOperator.getLayout = function getLayout(page) {
  return <SidebarNavbar>{page}</SidebarNavbar>
}

export default NodeOperator
