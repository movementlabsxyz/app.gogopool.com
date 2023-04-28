import { ComponentStyleConfig } from '@chakra-ui/react'

export const Drawer: ComponentStyleConfig = {
  parts: ['overlay', 'dialog'],
  baseStyle: {
    dialog: {
      bgColor: 'grey.0',
      padding: '24px 32px',
      borderWidth: '1px',
      borderColor: 'grey.200',
      borderRadius: '16px 16px 0 0',
    },
    overlay: {
      bgColor: 'blackAlpha.600',
    },
  },
}
