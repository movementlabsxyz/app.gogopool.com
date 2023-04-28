import { FunctionComponent, PropsWithChildren, ReactElement } from 'react'

import { Box, Button as ChakraButton, ButtonProps as ChakraButtonProps } from '@chakra-ui/react'
import { motion } from 'framer-motion'

export interface ButtonProps extends ChakraButtonProps {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  variant?: 'link' | 'primary' | 'secondary-filled' | 'secondary-outline' | 'destructive-outline'
  iconLeft?: ReactElement
  iconRight?: ReactElement
  iconOnly?: ReactElement
  full?: boolean
  onClick?: () => void
}

export const Button: FunctionComponent<PropsWithChildren<ButtonProps>> = ({
  children,
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
    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <ChakraButton
        className="font-jost hover:bg-indigo-50 focus:bg-indigo-200"
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
          <Box
            alignItems="center"
            columnGap="2"
            display="flex"
            flexDir="row"
            justifyContent="center"
          >
            {iconLeft}
            {children}
            {iconRight}
          </Box>
        )}
      </ChakraButton>
    </motion.button>
  )
}
