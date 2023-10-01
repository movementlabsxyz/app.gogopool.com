import { FunctionComponent } from 'react'

import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react'

import { MinipoolTableRow } from './MinipoolTableRow'

import { useMinipoolsByOwner } from '@/hooks/minipool'
import { HexString } from '@/types/cryptoGenerics'

interface MinipoolTableProps {
  ownerAddress: HexString
}

export const MinipoolTable: FunctionComponent<MinipoolTableProps> = ({ ownerAddress }) => {
  const { isLoading, minipools } = useMinipoolsByOwner(ownerAddress)

  if (isLoading) {
    return null
  }

  return (
    <TableContainer className="scroll_shadows">
      <Table>
        <Thead>
          <Tr>
            {/* Idk why I can't get the text color applied via the theme, so I inlined it */}
            <Th color="blue.500">Node ID</Th>
            <Th color="blue.500">Status</Th>
            <Th color="blue.500">Total Staked</Th>
            <Th color="blue.500">Launch Time</Th>
            <Th color="blue.500">Start Time</Th>
            <Th color="blue.500">End Time</Th>
            <Th color="blue.500">Withdraw</Th>
          </Tr>
        </Thead>
        <Tbody>
          {minipools.map((minipool) => (
            <MinipoolTableRow key={minipool.nodeID} minipool={minipool} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
