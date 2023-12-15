import { PropsWithChildren } from 'react'

import { Box, Flex, Spacer } from '@chakra-ui/react'
import { FiInfo } from 'react-icons/fi'

import { Tooltip } from '@/common/components/Tooltip'

interface TableBadgeProps {
  color: string
  tooltipContent?: React.ReactNode
  use?: 'FILL' | 'OUTLINE'
}

export const TableBadge = ({
  children,
  color,
  tooltipContent,
  use = 'FILL',
}: PropsWithChildren<TableBadgeProps>) => {
  return (
    <Tooltip content={tooltipContent} isDisabled={!tooltipContent} placement="top">
      <Box
        bgColor={use === 'FILL' ? color : 'white'}
        border={use === 'FILL' ? '0px' : '1px'}
        borderColor={color}
        borderRadius="2px"
        cursor={tooltipContent ? 'pointer' : 'default'}
        fontFamily="Jost"
        fontSize="10px"
        fontWeight="800"
        lineHeight="22px"
        px={3}
        py={1}
        textColor={use === 'FILL' ? 'white' : color}
        textTransform="uppercase"
        width="120px"
      >
        <Flex align="center" justify="space-between" width="100">
          <Box as="span">{children}</Box>
          <Spacer />
          <FiInfo color={use === 'FILL' ? 'white' : color} size={14} />
        </Flex>
      </Box>
    </Tooltip>
  )
}
