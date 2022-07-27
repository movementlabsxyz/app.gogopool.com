import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";

import { AvalancheIcon } from "@/common/components/CustomIcon/AvalancheIcon";

interface Props {
  reward: number;
  balance: number;
}

export const RewardForm: FunctionComponent<Props> = ({ reward, balance }) => {
  return (
    <>
      <Flex
        flexDir={{ base: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ base: "flex-start", sm: "center" }}
        mb={{ base: "14px", sm: "2.5" }}
      >
        <Text size="sm" fontWeight="600" color="grey.600">
          RECEIVE ggpAVAX
        </Text>
        <Flex flexDir="row" alignItems="center">
          <AvalancheIcon />
          <Text ml="2" size="xxl" fontWeight="bold">
            {reward ?? 0}
          </Text>
        </Flex>
      </Flex>
      <Divider
        borderColor="grey.300"
        mb="2"
        display={{ base: null, sm: "none" }}
      />
      <Box>
        <Text size="xs" color="grey.600">{`BALANCE: ${balance} GGP-AVAX`}</Text>
      </Box>
    </>
  );
};
