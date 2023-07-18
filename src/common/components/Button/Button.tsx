import { FunctionComponent, PropsWithChildren, ReactElement } from 'react'

import { Box, Button as ChakraButton, ButtonProps as ChakraButtonProps } from '@chakra-ui/react'

export interface ButtonProps extends ChakraButtonProps {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  variant?:
    | 'link'
    | 'primary'
    | 'secondary-filled'
    | 'secondary-outline'
    | 'tertiary'
    | 'destructive-outline'
  iconLeft?: ReactElement
  iconRight?: ReactElement
  iconOnly?: ReactElement
  full?: boolean
  onClick?: () => void
}

export const Button: FunctionComponent<PropsWithChildren<ButtonProps>> = ({
  children,
  disabled,
  full,
  iconLeft,
  iconOnly,
  iconRight,
  onClick,
  size = 'md',
  variant = 'primary',
  ...props
}) => {
  return (
    <ChakraButton
      className="font-jost transition hover:scale-105 hover:bg-indigo-50"
      disabled={disabled}
      height="full"
      onClick={onClick}
      size={iconOnly ? `iconOnly-${size}` : size}
      variant={variant}
      width={full && '100%'}
      {...props}
    >
      {iconOnly ? (
        iconOnly
      ) : (
        <Box alignItems="center" columnGap="2" display="flex" flexDir="row" justifyContent="center">
          {iconLeft}
          {children}
          {iconRight}
        </Box>
      )}
    </ChakraButton>
  )
}
