/* eslint-disable tailwindcss/no-custom-classname */
import { FunctionComponent } from 'react'

import { Box, Button as ChakraButton, Stack, Text, useToast } from '@chakra-ui/react'
import { shortenTransactionHash } from '@usedapp/core'
import NextLink from 'next/link'
import { TbBrandTwitter } from 'react-icons/tb'

import { Button } from '@/common/components/Button'
import { CopyIcon } from '@/common/components/CustomIcon/CopyIcon'
import { DiscordIcon } from '@/common/components/CustomIcon/DiscordIcon'
import TweetThisButton from '@/common/components/TweetThisButton'

export interface WizardSuccessProps {
  hash: string
}

export const WizardSuccess: FunctionComponent<WizardSuccessProps> = ({ hash }): JSX.Element => {
  const toast = useToast()

  const handleCopy = (): void => {
    toast({
      position: 'top',
      title: 'Copied to clipboard!',
      description: 'Your hash has been copied to your clipboard.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
    navigator.clipboard.writeText(hash)
  }

  return (
    <Stack direction="column" gap="4px">
      <Box
        bg="#FAFAFA"
        border="1px solid #D8D8D8"
        borderRadius="10px"
        color="#686686"
        display="flex"
        flexDirection="column"
        gap="4px"
        justifyContent="center"
        maxWidth="full"
        mx="auto"
        px="24px"
        py="16px"
        width="384px"
      >
        <Text align="center" size="sm">
          Minipool TX Hash:
        </Text>
        <Stack direction="row" justify="center" maxW="full">
          <Text color="#000000" fontWeight={700} overflowWrap="anywhere" size="sm">
            {hash && shortenTransactionHash(hash)}
          </Text>
          <Box aria-label="copy" as="button" onClick={handleCopy}>
            <CopyIcon size="16" />
          </Box>
        </Stack>
      </Box>
      <div className="!my-6 flex w-full justify-center">
        <NextLink href="/dashboard">
          <Button className="max-w-full" full variant="primary">
            Go to dashboard
          </Button>
        </NextLink>
      </div>
      <div className="flex space-x-6">
        <ChakraButton
          as="a"
          colorScheme="twitter"
          href={'https://twitter.com/GoGoPool_'}
          rel="noopener noreferrer"
          rightIcon={<TbBrandTwitter />}
          target="_blank"
          variant="outline"
        >
          Follow Us!
        </ChakraButton>
        <TweetThisButton text="I staked my #AVAX on @GoGoPool_!" />
        <ChakraButton
          as="a"
          className="space-x-2 rounded-xl border border-solid !border-indigo-500 p-2 text-indigo-500 transition-colors hover:bg-indigo-100"
          href="https://discord.gg/RWvx3TugqW"
          rel="noreferrer"
          target="_blank"
          variant="outline"
        >
          <DiscordIcon className="inline" />
          <span>Join Discord</span>
        </ChakraButton>
      </div>
    </Stack>
  )
}
