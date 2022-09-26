import { HStack, Text, VStack } from "@chakra-ui/react";

import { Button } from "@/common/components/Button";
import { Card, Title } from "@/common/components/Card";
import useCoinPrice from "@/hooks/coinPrice";
import PriceGraph from "@/modules/components/Graph";
import formatLabel from "@/utils/currency";

export interface TokenPricesProps {
  currencyID?: string;
  vsCurrency?: string;
  width?: number;
  height?: number;
  tooltip?: boolean;
  onSwap?: () => void;
}

export const TokenPrices = ({
  currencyID = "avalanche-2",
  vsCurrency = "usd",
  tooltip = false,
  onSwap,
}: TokenPricesProps) => {
  const { price } = useCoinPrice(currencyID, vsCurrency);
  return (
    <Card
      border={"1px solid"}
      borderRadius={10}
      display="flex"
      flexDirection="column"
      width="100%"
      height="100%"
    >
      <Title fontSize={"2xl"}>Token Prices</Title>
      <VStack>
        <PriceGraph
          tooltip={tooltip}
          vsCurrency={vsCurrency}
          currencyID={currencyID}
        />
      </VStack>
      <HStack gap={2}>
        <Button size="sm" onClick={onSwap}>
          {currencyID === "avalanche-2" ? "AVAX" : "GGP"}
        </Button>
        <Text fontSize={"xl"} fontWeight={"medium"}>
          Current Price: <b>{formatLabel(price, vsCurrency)}</b>
        </Text>
      </HStack>
    </Card>
  );
};

export default TokenPrices;
