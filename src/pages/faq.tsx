import { Box, VStack } from '@chakra-ui/react'

import { PageHead } from '@/common/components/PageHead'
import { SidebarLayout } from '@/common/components/SidebarLayout'
import { Faqs } from '@/modules/components/Faqs'

const FAQ = () => {
  return (
    <Box className="bg-[#F7F9FF] py-24" minH="full">
      <PageHead append={false} description="FAQ" name="FAQ" />
      <VStack spacing="8">
        <Faqs />
      </VStack>
    </Box>
  )
}

FAQ.getLayout = function getLayout(page) {
  return <SidebarLayout>{page}</SidebarLayout>
}

export default FAQ
