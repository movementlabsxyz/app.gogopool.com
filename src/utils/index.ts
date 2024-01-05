import { ethers } from 'ethers'

import { BinTools } from 'avalanche'
import { Buffer } from 'buffer/' // note: the slash is important!

import { HexString } from '@/types/cryptoGenerics'

const bintools = BinTools.getInstance()

// Take 0xF29Bce5F34a74301eB0dE716d5194E4a4aEA5d7A and return NodeID-P7oB2McjBGgW2NXXWVYjV8JEDFoW9xDE5
export const nodeIDToHex = (pk: string): HexString => {
  if (!pk.startsWith('NodeID-')) {
    throw new Error("Error: nodeID must start with 'NodeID-'")
  }
  try {
    const pksplit = pk.split('-')
    const buff = bintools.cb58Decode(pksplit[pksplit.length - 1])
    return ethers.utils.getAddress(ethers.utils.hexlify(buff))
  } catch (e) {
    throw new Error("Error: nodeID must start with 'NodeID-'")
  }
}

export const nodeHexToID = (h) => {
  const b = Buffer.from(ethers.utils.arrayify(ethers.utils.getAddress(h)))
  return `NodeID-${bintools.cb58Encode(b)}`
}

export const shortenNodeId = (nodeId: string) => {
  return nodeId.slice(0, 12).concat('...').concat(nodeId.slice(-6))
}

export const nodeIDRemovePrefix = (pk: string): string => {
  const prefix = 'NodeID-'
  if (!pk.startsWith(prefix)) {
    throw new Error("Error: nodeID must start with 'NodeID-'")
  }
  // Extracting the NodeID
  const startIndex = pk.indexOf(prefix)
  return pk.substring(startIndex + prefix.length)
}
