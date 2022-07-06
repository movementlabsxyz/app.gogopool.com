import { Box, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";

import { AvalancheIcon } from "@/common/components/CustomIcon/AvalancheIcon";

interface Props {
  reward: number;
  balance: number;
}

export const RewardForm: FunctionComponent<Props> = ({ reward, balance }) => {
  return (
    <>
      <Box
        display="flex"
        flexDir="row"
        justifyContent="space-between"
        alignItems="center"
        mb="2.5"
      >
        <Text size="sm" fontWeight="600" color="grey.600">
          RECEIVE ggpAVAX
        </Text>
        <Box display="flex" flexDir="row" alignItems="center">
          <AvalancheIcon />
          <Text ml="2" size="xxl" fontWeight="bold">
            {reward}
          </Text>
        </Box>
      </Box>
      <Box>
        <Text size="xs" color="grey.600">{`BALANCE: ${balance} GGP-AVAX`}</Text>
      </Box>
    </>
  );
};
