import { useState } from 'react'

import { Box } from '@chakra-ui/react'

import { PageHead } from '@/common/components/PageHead'
import { SidebarLayout } from '@/common/components/SidebarLayout'
import { Wizard } from '@/modules/components/Wizard'

function NodeOperator() {
  const [currentStep, setCurrentStep] = useState<number>(1)

  return (
    <Box className="bg-[#F7F9FF] py-24" minH="full">
      <PageHead
        append={false}
        description="Stake AVAX on the GoGoPool Protocol."
        name="Create Minipool"
      />
      {/* A tutorial should be made. See issue #79
      <Flex justifyContent="flex-end">
        <Button
          bg="white"
          leftIcon={<PlayButtonIcon />}
          size="xs"
          height={10}
          outline="2px solid #C6C6C6"
          margin="16px 0 32px 0"
        >
          <Text color="#686686" fontWeight={{ base: "normal", md: "bold" }}>
            Watch a quick tutorial
          </Text>
        </Button>
      </Flex> */}
      <Wizard currentStep={currentStep} setCurrentStep={setCurrentStep} />
    </Box>
  )
}

NodeOperator.getLayout = function getLayout(page) {
  return <SidebarLayout>{page}</SidebarLayout>
}

export default NodeOperator
