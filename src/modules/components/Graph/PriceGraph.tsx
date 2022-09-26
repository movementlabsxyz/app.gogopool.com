import { Box, useToken } from "@chakra-ui/react";
import { ClimbingBoxLoader } from "react-spinners";
import {
  LineSegment,
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryTheme,
  VictoryVoronoiContainer,
} from "victory";

import useCoinPriceHistory from "@/hooks/useCoinPriceHistory";
import formatLabel from "@/utils/currency";

export interface PriceGraphProps {
  currencyID?: string;
  vsCurrency?: string;
  tooltip?: boolean;
  title?: string;
}

const PriceGraph = ({
  currencyID = "avalanche-2",
  vsCurrency = "usd",
  tooltip = false,
  themeColor = "blue.400",
}) => {
  // TODO vsCurrency no worko
  const { data, isLoading } = useCoinPriceHistory(currencyID, vsCurrency);

  const color = useToken("colors", themeColor);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <ClimbingBoxLoader color={color} />
      </Box>
    );
  }

  return (
    <VictoryChart height={200} width={700}>
      <VictoryLine
        data={data}
        x="date"
        y="price"
        style={{
          data: { stroke: "blue" },
          labels: { fontSize: 12 },
        }}
      />
    </VictoryChart>
  );
};

export default PriceGraph;
