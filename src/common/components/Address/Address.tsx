import { FunctionComponent, PropsWithChildren, ReactNode } from 'react'

import {
  Box,
  Stack,
  Text,
  TextProps,
  useColorModeValue,
  useTheme,
  useToast,
} from '@chakra-ui/react'

import { CopyIcon } from '@/common/components/CustomIcon/CopyIcon'

interface CopyableAddressProps {
  text?: string
}

export interface AddressProps extends Omit<TextProps, 'onCopy'> {
  startLength?: number
  lastLength?: number
  truncate?: boolean
  ellipsis?: ReactNode
  copyable?: CopyableAddressProps | boolean
  copyIfClicked?: boolean
  hasIcon?: boolean
}

export const Address: FunctionComponent<PropsWithChildren<AddressProps>> = ({
  children,
  startLength = 5,
  lastLength = -4,
  truncate = true,
  ellipsis = '..',
  copyable,
  fontSize = 'sm',
  fontWeight = 400,
  hasIcon = true,
  copyIfClicked = false,
  ...props
}): JSX.Element => {
  const toast = useToast()
  const { colors } = useTheme()
  const string = (copyable as CopyableAddressProps)?.text || children.toString()
  const startLetter = string.slice(0, startLength)
  const lastLetter = string.slice(lastLength)
  const textColor = useColorModeValue(colors.grey[1000], colors.grey[0])

  const handleCopy = (): void => {
    navigator.clipboard.writeText(string)
    toast({
      position: 'top',
      title: 'Copied to clipboard!',
      status: 'success',
    })
  }

  return (
    <Stack
      alignItems="center"
      direction="row"
      gap="2px"
      onClick={copyIfClicked ? () => handleCopy() : undefined}
    >
      <Text color={textColor} fontSize={fontSize} fontWeight={fontWeight} {...props}>
        {truncate ? startLetter + ellipsis + lastLetter : children}
      </Text>
      {Boolean(copyable) && hasIcon && (
        <Box aria-label="copy" as="button" onClick={handleCopy}>
          <CopyIcon size="16" />
        </Box>
      )}
    </Stack>
  )
}
