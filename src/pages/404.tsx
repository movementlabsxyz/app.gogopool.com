import { Box, Button, Text } from '@chakra-ui/react'

import notFound from '/public/assets/img/large_assets/404.svg'

import Image from 'next/image'

import contact from '@/common/components/crisp/contact'
import { SidebarNavbar } from '@/modules/components/SidebarNavbar/SidebarNavbar'

const Error404 = (): JSX.Element => {
  return (
    <Box className="flex flex-col items-center justify-center space-y-4 bg-[#F7F9FF]" minH="full">
      <div style={{ width: '250px', height: '400px' }}>
        <Image alt="not found" height={0} src={notFound} width={0} />
      </div>
      <Text
        className="max-w-[600px] text-center font-domaine font-semibold text-blue-900"
        fontSize={28}
      >
        Uh Oh. Looks Like you&apos;ve gone off course.
      </Text>
      <Text className="max-w-[600px] text-center font-domaine text-blue-900" fontSize={20}>
        If you believe you were led astray and this page is a surprise, a message to our helpful
        team, will get you back flying high.
      </Text>
      <Button onClick={contact} variant={'secondary-filled'}>
        Chat with us
      </Button>
    </Box>
  )
}

Error404.getLayout = function getLayout(page) {
  return <SidebarNavbar>{page}</SidebarNavbar>
}

export default Error404
