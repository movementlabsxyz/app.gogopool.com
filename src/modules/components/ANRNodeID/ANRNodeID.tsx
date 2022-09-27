import { Box, Skeleton } from "@chakra-ui/react";

import { Address } from "@/common/components/Address";
import useANRNodes from "@/hooks/useANRNodes";

const ANRNodeID = () => {
  const { nodeID, isLoading, isError } = useANRNodes();

  if (isLoading) {
    return (
      <Box gap="0.25rem">
        <Skeleton width="315px" height="20px" />
      </Box>
    );
  }

  if (isError || !nodeID) {
    return <div>Error. Please try again later.</div>;
  }

  // For some reason I cannot truncate unless it adds
  // commas to the start and end of the string.
  return (
    <Address truncate={false} copyable>
      {" "}
      {nodeID}{" "}
    </Address>
  );
};

export default ANRNodeID;
