import { Box, Button, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'

import { colors } from '@/theme/colors'

const EntryIllustration = () => {
  return (
    <Box color={colors.grey[0]} display="flex" flexDirection="column" height="100%">
      <Box
        alignItems="center"
        color={colors.grey[0]}
        display="flex"
        flex="1"
        flexDirection="column"
        justifyContent="center"
      >
        <img alt="GoGoPass Logo" src="/assets/img/gogopass/surprise-box.svg" />
      </Box>
    </Box>
  )
}

const CreateMinipoolEntry = ({ onMinipoolQuickStartClick }) => {
  return (
    <Box
      className="flex h-full flex-col items-center justify-center bg-[#F8F8FD] p-8"
      maxW={'1280px'}
      minH="full"
    >
      <Box
        alignItems="center"
        borderRadius="32px"
        display="flex"
        flexDirection="row"
        gap={10}
        justifyContent="space-between"
      >
        <Flex
          alignItems="center"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          width={'50%'}
        >
          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
            gap={4}
            justifyContent="space-between"
          >
            <Box
              alignItems="center"
              bg={colors.grey[0]}
              border="1px"
              borderColor="#D2D7FC"
              borderRadius="16px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              p={8}
            >
              <Box display="flex" flexDirection="column" justifyContent="start" mb={6} w="full">
                <Text className="text-xl font-bold" mb={2}>
                  One-click Minipool Creation
                </Text>
                <Text>
                  Create a Minipool with a <span className="font-bold">one-click experience</span>.
                  No need to get a NodeID or go through the process of staking GGP. All you do is
                  provide the AVAX, select validation length, and we take care of the rest.
                </Text>
              </Box>
              <Box
                alignItems="center"
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                w="100%"
              >
                <Text className="text-md font-bold" color={colors.success[500]}>
                  Recommended
                </Text>
                <Button
                  onClick={onMinipoolQuickStartClick}
                  size="sm"
                  variant="secondary-filled"
                  w="30%"
                >
                  Try it out
                </Button>
              </Box>
            </Box>
            <Box
              alignItems="center"
              bg={colors.grey[0]}
              border="1px"
              borderColor="#D2D7FC"
              borderRadius="16px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              p={8}
            >
              <Box display="flex" flexDirection="column" justifyContent="start" mb={6} w="full">
                <Text className="text-xl font-bold" mb={2}>
                  Manual Setup
                </Text>
                <Text>
                  Want to customize your experience and{' '}
                  <span className="font-bold">use your own hardware</span>? Try our manual approach
                  that has helped so many node operators get started with their specifications in
                  mind.
                </Text>
              </Box>

              <Box
                alignItems="center"
                display="flex"
                flexDirection="row"
                justifyContent="end"
                w="100%"
              >
                <Link href="/create-minipool-manually">
                  <Button
                    border="1px"
                    borderColor="#CFC9E2"
                    color={colors.blue[500]}
                    size="sm"
                    variant="secondary"
                  >
                    Use Manual Setup
                  </Button>
                </Link>
              </Box>
            </Box>
          </Box>
        </Flex>

        <Flex alignItems="center" h="100%" justifyContent="center" w={'50%'}>
          <EntryIllustration />
        </Flex>
      </Box>
    </Box>
  )
}

export default CreateMinipoolEntry
