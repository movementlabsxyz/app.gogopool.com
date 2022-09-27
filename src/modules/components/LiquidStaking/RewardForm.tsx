import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";

import { AvalancheIcon } from "@/common/components/CustomIcon/AvalancheIcon";
import { GGPBallonIcon } from "@/common/components/CustomIcon/GGPBalloonIcon";

interface Props {
  reward: number;
  balance: number;
  token?: string;
  icon?: JSX.Element;
}

export const RewardForm: FunctionComponent<Props> = ({
  reward,
  balance,
  token = "ggAVAX",
  icon = <AvalancheIcon />,
}) => {
  return (
    <>
      <Flex
        flexDir={{ base: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ base: "flex-start", sm: "center" }}
        mb={{ base: "14px", sm: "2.5" }}
      >
        <Text size="sm" fontWeight="600" color="grey.600">
          RECEIVE {token}
        </Text>
        <Flex flexDir="row" alignItems="center">
          {icon}
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
        <Text size="xs" color="grey.600">{`BALANCE: ${balance} ${token}`}</Text>
      </Box>
    </>
  );
};
