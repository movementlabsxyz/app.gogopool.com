import { ComponentStyleConfig } from '@chakra-ui/react'

export const Table: ComponentStyleConfig = {
  parts: ['table', 'th', 'td'],
  baseStyle: {
    table: {},
    th: {
      fontFamily: 'Jost',
      fontSize: '14px',
      lineHeight: '22px',
      fontWeight: 700,
      textTransform: 'uppercase',
    },
    td: {
      fontFamily: 'Jost',
      fontSize: '14px',
      lineHeight: '22px',
      fontWeight: 500,
    },
  },
}
