import { forwardRef } from 'react'

import { Box, BoxProps, Heading, TextProps } from '@chakra-ui/react'

export interface BoxPropsWithStyles extends BoxProps {
  outer?: boolean
  customStyles?: React.CSSProperties
}

interface TextPropsWithStyles extends TextProps {
  customStyles?: React.CSSProperties
}

export const Card = forwardRef<HTMLDivElement, BoxPropsWithStyles>(
  (
    {
      backgroundColor = 'white',
      borderRadius = '1.25rem',
      boxShadow = 'default',
      children,
      customStyles,
      height = 'auto',
      maxHeight = 'auto',
      maxWidth = '588px', // 24px
      minWidth = '334px',
      outer = false, // 8px
      p = '1.5rem',
      width = 'auto',
      ...rest
    },
    ref,
  ) => {
    return (
      <Box
        bg={backgroundColor}
        borderColor="grey.200"
        borderRadius={borderRadius}
        borderWidth={outer && '1px'}
        boxShadow={boxShadow}
        height={height}
        maxHeight={maxHeight}
        maxWidth={outer && maxWidth}
        minWidth={outer && minWidth}
        p={p}
        ref={ref}
        sx={customStyles}
        width={outer ? 'full' : width}
        {...rest}
      >
        {children}
      </Box>
    )
  },
)

Card.displayName = 'Card'

export const Title = forwardRef<HTMLDivElement, TextPropsWithStyles>(
  ({ children, customStyles, ...rest }, ref) => {
    return (
      <Heading fontWeight="bold" ref={ref} size="h5" sx={customStyles} {...rest}>
        {children}
      </Heading>
    )
  },
)

Title.displayName = 'Title'

export const Content = forwardRef<HTMLDivElement, BoxPropsWithStyles>(
  ({ children, customStyles, ...rest }, ref) => {
    return (
      <Box ref={ref} {...rest} sx={customStyles}>
        {children}
      </Box>
    )
  },
)

Content.displayName = 'Content'

export const Footer = forwardRef<HTMLDivElement, BoxPropsWithStyles>(
  ({ children, customStyles, ...rest }, ref) => {
    return (
      <Box mt="8" ref={ref} {...rest} sx={customStyles}>
        {children}
      </Box>
    )
  },
)

Footer.displayName = 'Footer'

const _default = Object.assign(Card, { Title, Content, Footer })

export default _default
