import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { formatUnits } from "ethers/lib/utils";

import { Card, Title } from "@/common/components/Card";
import { useMinipoolsByOwner } from "@/hooks/minipool";
import { MinipoolStatus } from "@/types/minipool";
import { nodeHexToID } from "@/utils";

export interface MinipoolTableProps {
  ownerAddress: string;
}

const MinipoolTable = ({ ownerAddress }: MinipoolTableProps) => {
  const { minipools } = useMinipoolsByOwner(ownerAddress);

  return (
    <Card>
      <Title> My Nodes </Title>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Node ID</Th>
            <Th>Status</Th>
            <Th>AVAX</Th>
            <Th>Start Time</Th>
            <Th>End Time</Th>
          </Tr>
        </Thead>
        <Tbody>
          {minipools?.map((minipool) => {
            return (
              <Tr>
                <Td>{nodeHexToID(minipool.nodeID)}</Td>
                <Td>{MinipoolStatus[minipool.status]}</Td>
                <Td>
                  {formatUnits(
                    minipool.avaxNodeOpAmt.add(minipool.avaxLiquidStakerAmt)
                  )}
                </Td>
                <Td>{formatUnits(minipool.startTime)}</Td>
                <Td>{formatUnits(minipool.endTime)}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
};

export default MinipoolTable;
