import { HexString } from '@/types/cryptoGenerics'
import Minipool from '@/types/minipool'
import { nodeIDToHex } from '@/utils'

export default function nodeIdErrorerrorMessage(
  minipool: Minipool,
  debouncedNodeId: string,
): { errorMessage: string; formattedNodeId: HexString | null } {
  let errorMessage = ''
  let formattedNodeId = null

  if (debouncedNodeId === '') return { errorMessage, formattedNodeId }

  try {
    formattedNodeId = nodeIDToHex(debouncedNodeId)
  } catch {
    errorMessage = 'NodeID checksum invalid'
  }
  if (minipool && !(minipool.status.toNumber() == 4 || minipool.status.toNumber() == 5)) {
    errorMessage = 'NodeID is already in use'
  }
  if (!debouncedNodeId.startsWith('NodeID-')) {
    errorMessage = "NodeID must start with 'NodeID-'"
  }
  return { errorMessage, formattedNodeId }
}
