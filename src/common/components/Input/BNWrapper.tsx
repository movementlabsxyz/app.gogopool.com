import { ReactNode } from 'react'

import { Box, HStack } from '@chakra-ui/react'

export default function BNWrapper({ children }: { children: ReactNode }) {
  return (
    <Box pt="5">
      <HStack
        border="1px"
        borderColor="blue.200"
        borderRadius="6px"
        className="focus-within:border-blue-400 focus-within:outline focus-within:outline-1 focus-within:outline-blue-400"
        pl="4"
        pr="2"
        py="2"
        spacing="2"
      >
        {children}
      </HStack>
    </Box>
  )
}
