import {
  Input as ChakraInput,
  Flex,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
  Text,
} from '@chakra-ui/react'

const DEFAULT_HEIGHT = 42

type ErrorInputProps =
  | {
      errorText: string
      isInvalid: boolean
    }
  | { errorText?: string; isInvalid?: boolean }

interface CInputProps extends InputProps {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  isMonospaced?: boolean
}

export type CustomInputProps = CInputProps & ErrorInputProps

export const Input = ({
  errorText,
  isMonospaced,
  leftIcon,
  rightIcon,
  ...props
}: CustomInputProps) => {
  return (
    <>
      {leftIcon || rightIcon ? (
        <InputGroup>
          {leftIcon && <InputLeftElement pointerEvents={'none'}>{leftIcon}</InputLeftElement>}
          <ChakraInput
            _hover={{ borderColor: 'grey.300' }}
            _placeholder={{ color: 'grey.500' }}
            borderRadius="full"
            errorBorderColor="error.500"
            fontFamily={isMonospaced ? 'monospace' : 'Jost'}
            height={DEFAULT_HEIGHT}
            outline={0}
            style={{ boxShadow: 'none' }}
            {...props}
          />
          {rightIcon && <InputRightElement pointerEvents={'none'}>{rightIcon}</InputRightElement>}
        </InputGroup>
      ) : (
        <ChakraInput
          _hover={{ borderColor: 'grey.300' }}
          _placeholder={{ color: 'grey.500' }}
          borderRadius="full"
          errorBorderColor="error.500"
          fontFamily="Jost"
          height={DEFAULT_HEIGHT}
          outline={0}
          style={{ boxShadow: 'none' }}
          {...props}
        />
      )}

      {props.isInvalid ? (
        <Flex alignItems="center" justifyContent="flex-start" marginTop={1}>
          <Text color="error.500" fontSize="xs" lineHeight="18px" marginLeft={1}>
            {errorText}
          </Text>
        </Flex>
      ) : null}
    </>
  )
}
