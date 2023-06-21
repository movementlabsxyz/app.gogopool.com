import { NODE_ID_LEN } from './consts'

import Minipool from '@/types/minipool'
import { nodeIDToHex } from '@/utils'

export default function nodeIdErrorMessage(minipool: Minipool, debouncedNodeId: string): string {
  let message = ''
  if (debouncedNodeId === '') return ''
  try {
    nodeIDToHex(debouncedNodeId)
  } catch (e) {
    message = 'NodeID checksum invalid'
  }
  if (minipool && !(minipool.status.toNumber() == 4 || minipool.status.toNumber() == 5)) {
    message = 'NodeID is already in use'
  }
  if (debouncedNodeId.length !== NODE_ID_LEN) {
    message = 'NodeID must be 40 characters'
  }
  if (!debouncedNodeId.startsWith('NodeID-')) {
    message = "NodeID must start with 'NodeID-'"
  }
  return message
}
