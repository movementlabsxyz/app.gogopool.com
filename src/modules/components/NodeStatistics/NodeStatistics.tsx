import { Box, Skeleton, Stack, Text } from "@chakra-ui/react";
import { BigNumber, utils } from "ethers";
import ms from "ms";
import { FunctionComponent, ReactElement } from "react";
import { useAccount } from "wagmi";

import { Address } from "@/common/components/Address";
import { useAllMinipools } from "@/hooks/minipool";
// import useMinipoolByID from "@/hooks/useMinipoolByID";
// import useMinipoolsByOwner from "@/hooks/useMinipoolsByOwner";
// import useMinipoolsByStatus from "@/hooks/useMinipoolsByStatus";
import Minipool, { displayName, MinipoolKeys } from "@/types/minipool";

export interface StatsProps {
  address?: string;
  nodeID?: string;
}
// TODO make the "status" field a string instead of an int
const formatData = (
  input: Minipool
): { label: string | ReactElement; value: string | ReactElement }[] => {
  if (!input) {
    return [];
  }
  const keys = Object.keys(input);
  return keys
    .filter((key) => {
      if (key.toLowerCase().includes("time")) {
        return false;
      }
      return Number.isNaN(Number(key));
    })
    .map((key) => {
      const value = input[key];
      // if (key.toLowerCase().includes("time")) {
      //   return {
      //     label: key,
      //     value: new Date(value.toNumber() * 1000).toLocaleString(),
      //   };
      // }
      if (key === "duration") {
        return {
          label: displayName(key as MinipoolKeys),
          value: ms(value * 1000, { long: true }),
        };
      }
      if (key === "delegationFee") {
        const fee = value as unknown as BigNumber;
        return {
          label: displayName(key as MinipoolKeys),
          value: fee.div(10000).toString() + "%",
        };
      }

      if (key === "status") {
        const status = value as unknown as BigNumber;
        return {
          label: displayName(key as MinipoolKeys),
          value: status.toString(),
        };
      }

      if (BigNumber.isBigNumber(value)) {
        return {
          label: displayName(key as MinipoolKeys),
          value: utils.formatEther(value),
        };
      }

      if (value?.toLowerCase().startsWith("0x")) {
        return {
          label: displayName(key as MinipoolKeys),
          value: (
            <Address fontWeight="bold" copyable={true} truncate={true}>
              {value}
            </Address>
          ),
        };
      }

      if (typeof value === "string") {
        return { label: displayName(key as MinipoolKeys), value };
      }

      return {
        label: displayName(key as MinipoolKeys),
        value: value.toString(),
      };
    });
};

export const Statistics: FunctionComponent<StatsProps> = ({
  address,
  nodeID,
}) => {
  // const minipoolsByOwner = useMinipoolsByOwner(address || "");
  // const minipoolByID = useMinipoolByID(nodeID || "");

  // const minipools = [...minipoolsByOwner];
  // if (minipoolByID) {
  //   minipools.push(minipoolByID);
  // }

  const { isConnected } = useAccount();

  const { minipools, isLoading } = useAllMinipools();

  const skeletons = Array.from({ length: 10 }, (_, i) => (
    <Skeleton endColor="blue.200" width="500px" key={i} height="18px" />
  ));

  if (!isConnected) {
    return <Text>Please connect a wallet to see node statistics.</Text>;
  }

  if (isLoading) {
    return (
      <Box gap="0.25rem">
        <Stack gap={1}>{skeletons}</Stack>
      </Box>
    );
  }

  if (minipools.length === 0) {
    return (
      <Box gap="0.25rem">
        <Text size="sm" color="grey.600" display="flex" flexDir="row">
          No minipools found.
        </Text>
      </Box>
    );
  }

  const data = formatData(minipools[0]);

  return (
    <Box width="500px" gap="0.25rem">
      {data.map(({ label, value }, index) => (
        <Box
          display="flex"
          flexDir="row"
          justifyContent="space-between"
          key={index}
        >
          <Text
            size="sm"
            color="grey.600"
            display="flex"
            flexDir="row"
            alignItems="center"
          >
            {label}
          </Text>
          <Text size="sm" fontWeight="bold">
            {value}
          </Text>
        </Box>
      ))}
    </Box>
  );
};
