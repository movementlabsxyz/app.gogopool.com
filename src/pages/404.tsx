import { Box, Link, Text } from '@chakra-ui/react'

import notFound from '/public/assets/img/large_assets/404.svg'

import Image from 'next/image'

import contact from '@/common/components/crisp/contact'
import { SidebarNavbar } from '@/modules/components/SidebarNavbar/SidebarNavbar'

const Error404 = (): JSX.Element => {
  return (
    <Box
      className="flex flex-col items-center justify-center space-y-6 bg-[#F7F9FF] p-8"
      minH="full"
    >
      <div style={{ width: '300px', height: '460px' }}>
        <Image alt="not found" height={0} src={notFound} width={0} />
      </div>
      <div>
        <Text className="max-w-[500px] text-center font-domaine text-blue-900" fontSize={32}>
          <span className="text-red-500">404 Error:</span> Page Not Found.
        </Text>
        <br></br>
        <Link onClick={contact}>
          <Text className="max-w-[500px] text-center font-domaine text-blue-900" fontSize={24}>
            Questions? Connect though our ChatBox.
          </Text>
        </Link>
      </div>
    </Box>
  )
}

Error404.getLayout = function getLayout(page) {
  return <SidebarNavbar>{page}</SidebarNavbar>
}

export default Error404
