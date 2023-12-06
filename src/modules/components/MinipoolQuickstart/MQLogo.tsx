import { Box, Flex, Text } from '@chakra-ui/react'

import { colors } from '@/theme/colors'

export default function MQLogo() {
  return (
    <Flex color={colors.grey[0]} flexDirection="column" w={'full'}>
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        pt={'44px'}
      >
        <img alt="Minipool" src="/assets/img/gogopass/minipool-icon.svg" />
        <Text className="font-domaine text-4xl" mt={2}>
          Your Minipool details
        </Text>
      </Box>

      <Box
        alignItems="center"
        color={colors.grey[0]}
        display="flex"
        flex="1"
        flexDirection="column"
        justifyContent="center"
      >
        <img alt="GoGoPass Logo" src="/assets/img/gogopass/minipool-balloon.svg" />

        <Box
          alignItems="center"
          justifyContent="center"
          my={5}
          textAlign={'center'}
          width={'240px'}
        >
          <Text className="text-sm" color={colors.grey[0]}>
            Your details will update once you complete{' '}
            <Text as="span" className="font-bold">
              all the info
            </Text>{' '}
            on the left
          </Text>
        </Box>
      </Box>
    </Flex>
  )
}
