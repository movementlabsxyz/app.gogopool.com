import { Box, Text } from '@chakra-ui/react'
import Image from 'next/image'

import fixingGogos from '/public/assets/img/large_assets/fixing-gogos.svg'

import { SidebarNavbar } from '@/modules/components/SidebarNavbar/SidebarNavbar'

const WorkInProgress = () => {
  return (
    <Box
      className="flex h-full flex-col items-center justify-center space-y-6 bg-[#F7F9FF] p-8"
      minH="full"
    >
      <div className="p-4">
        <Image alt="logo" height={420} src={fixingGogos} width={420} />
      </div>
      <Text className="max-w-[500px] text-center font-domaine text-blue-900" fontSize={32}>
        This page is a work in progress. Please come visit another time.
      </Text>
    </Box>
  )
}

WorkInProgress.getLayout = function getLayout(page) {
  return <SidebarNavbar>{page}</SidebarNavbar>
}

export default WorkInProgress
