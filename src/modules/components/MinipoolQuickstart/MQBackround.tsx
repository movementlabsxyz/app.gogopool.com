import { Flex } from '@chakra-ui/react'

export default function MQBackground({ children }) {
  return (
    <Flex alignItems={'center'} bg={'#F8F8FD'} justifyContent={'center'} minH={'full'} p={'32px'}>
      {children}
    </Flex>
  )
}
