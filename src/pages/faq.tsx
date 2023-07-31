import { Box, VStack } from '@chakra-ui/react'

import { PageHead } from '@/common/components/PageHead'
import { Faqs } from '@/modules/components/Faqs'
import { SidebarNavbar } from '@/modules/components/SidebarNavbar/SidebarNavbar'

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
  return <SidebarNavbar>{page}</SidebarNavbar>
}

export default FAQ
