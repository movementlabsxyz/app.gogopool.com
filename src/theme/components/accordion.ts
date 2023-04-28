import { ComponentStyleConfig } from '@chakra-ui/react'

export const Accordion: ComponentStyleConfig = {
  parts: ['container', 'button', 'panel'],
  baseStyle: {
    container: {
      rounded: 'lg',
      borderWidth: '0',
      _last: { borderWidth: '0' },
    },
    button: {
      p: '4',
      rounded: 'lg',
      _expanded: { roundedBottom: 'none' },
    },
    panel: {
      px: '6',
      py: '4',
    },
  },
}
