import { ComponentStyleConfig } from '@chakra-ui/react'

export const Modal: ComponentStyleConfig = {
  parts: ['overlay', 'dialog'],
  baseStyle: {
    dialog: {
      bgColor: 'grey.0',
      p: '32px 48px',
      borderWidth: '1px',
      borderColor: 'grey.200',
      borderRadius: '16px',
    },
    overlay: {
      bgColor: 'blackAlpha.600',
    },
  },
}
