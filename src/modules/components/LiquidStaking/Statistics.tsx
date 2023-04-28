import { FunctionComponent, ReactElement } from 'react'

import { Box, Text } from '@chakra-ui/react'

interface Props {
  data: { label: ReactElement; value: ReactElement | string }[]
}

export const Statistics: FunctionComponent<Props> = ({ data }) => {
  return (
    <Box className="space-y-2" gap="0.25rem">
      {data.map(({ label, value }, index) => (
        <Box display="flex" flexDir="row" justifyContent="space-between" key={index}>
          <Text
            alignItems="center"
            as="div"
            color="grey.600"
            display="flex"
            flexDir="row"
            size="sm"
          >
            {label}
          </Text>
          <Text as="div" fontWeight="bold" size="sm">
            {value}
          </Text>
        </Box>
      ))}
    </Box>
  )
}
