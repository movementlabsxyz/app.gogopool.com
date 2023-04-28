import { Box, useToken } from '@chakra-ui/react'
import { ClimbingBoxLoader } from 'react-spinners'
import { VictoryChart, VictoryLine } from 'victory'

import useCoinPriceHistory from '@/hooks/useCoinPriceHistory'

export interface PriceGraphProps {
  currencyID?: string
  vsCurrency?: string
  title?: string
}

const PriceGraph = ({
  currencyID = 'avalanche-2',
  themeColor = 'blue.400',
  vsCurrency = 'usd',
}) => {
  // TODO vsCurrency no worko
  const { data, isLoading } = useCoinPriceHistory(currencyID, vsCurrency)

  const color = useToken('colors', themeColor)

  if (isLoading) {
    return (
      <Box alignItems="center" display="flex" justifyContent="center">
        <ClimbingBoxLoader color={color} />
      </Box>
    )
  }

  return (
    <VictoryChart height={200} width={700}>
      <VictoryLine
        data={data}
        style={{
          data: { stroke: 'blue' },
          labels: { fontSize: 12 },
        }}
        x="date"
        y="price"
      />
    </VictoryChart>
  )
}

export default PriceGraph
