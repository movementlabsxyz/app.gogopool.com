import { Box, Center, Text, useToken, VStack } from "@chakra-ui/react";
import { ClimbingBoxLoader } from "react-spinners";

import { Card, Title } from "@/common/components/Card";
import formatLabel from "@/utils/currency";

export interface TotalMinipoolValueProps {
  vsCurrency?: string;
  totalValue?: number;
  avaxValue?: number;
  ggpValue?: number;
  avaxStake?: number;
  ggpStake?: number;
  isLoading?: boolean;
}

const TotalMinipoolValue = ({
  vsCurrency = "usd",
  totalValue = 0,
  avaxValue = 0,
  ggpValue = 0,
  avaxStake = 0,
  ggpStake = 0,
  isLoading = false,
}: TotalMinipoolValueProps) => {
  const color = useToken("colors", "blue.400");

  return (
    <Card
      border={"1px solid"}
      borderRadius={10}
      display="flex"
      flexDirection="column"
      width="25rem"
    >
      <Title fontSize={"2xl"}>Total Minipool Value</Title>
      {isLoading && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <ClimbingBoxLoader color={color} />
        </Box>
      )}
      {!isLoading && (
        <Center>
          <VStack>
            <Text textAlign="center" fontSize={"2xl"} fontWeight={"bold"}>
              {formatLabel(totalValue, vsCurrency)}
            </Text>
            <Text textAlign="center" fontSize={"xl"} color="grey.500">
              {formatLabel(avaxValue, vsCurrency)} in AVAX |{" "}
              {formatLabel(ggpValue, vsCurrency)} in GGP
            </Text>
            <Text textAlign="center" fontSize={"md"} color="grey.500">
              {avaxStake.toLocaleString()} AVAX | {ggpStake.toLocaleString()}{" "}
              GGP
            </Text>
          </VStack>
        </Center>
      )}
    </Card>
  );
};

export default TotalMinipoolValue;
