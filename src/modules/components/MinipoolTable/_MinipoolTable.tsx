import { Fragment, FunctionComponent } from 'react'

import { Table, TableContainer, Tbody, Thead, Tr } from '@chakra-ui/react'

import MinipoolTableHeader from './MinipoolTableHeader'
import { MinipoolTableRow } from './MinipoolTableRow'

import { useMinipoolsByOwner } from '@/hooks/minipool'
import { HexString } from '@/types/cryptoGenerics'

interface MinipoolTableProps {
  ownerAddress: HexString
}

const tableHeaders = [
  'Node ID',
  'Status',
  'Total Staked',
  'Creation Time',
  'Start Time',
  'End Time',
  'Withdraw',
]

export const MinipoolTable: FunctionComponent<MinipoolTableProps> = ({ ownerAddress }) => {
  const { isLoading, minipools } = useMinipoolsByOwner(ownerAddress)

  if (isLoading || !minipools) {
    return null
  }

  return (
    <TableContainer className="scroll_shadows">
      <Table>
        <Thead>
          <Tr>
            {tableHeaders.map((header) => (
              <Fragment key={header}>
                <MinipoolTableHeader color="blue.500">{header}</MinipoolTableHeader>
              </Fragment>
            ))}
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
