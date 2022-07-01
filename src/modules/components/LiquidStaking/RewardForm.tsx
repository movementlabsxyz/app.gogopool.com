import { Box, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";

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
        <Text size="sm" fontWeight="600" className="text-grey-600">
          RECEIVE ggpAVAX
        </Text>
        <Box display="flex" flexDir="row" alignItems="center">
          <div className="mr-2 h-6 w-6 rounded-full bg-red-500" />
          <Text size="xxl" fontWeight="bold">
            {reward}
          </Text>
        </Box>
      </Box>
      <Box>
        <Text size="xs" className="text-grey-600">
          {`BALANCE: ${balance} GGP-AVAX`}
        </Text>
      </Box>
    </>
  );
};
