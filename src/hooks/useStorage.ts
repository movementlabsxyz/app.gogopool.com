import { ethers } from 'ethers'

import { useContractRead, useNetwork } from 'wagmi'

import { storageAddresses } from '../constants/storageAddresses'

import Storage from '@/contracts/Storage'
import { HexString } from '@/types/cryptoGenerics'

export const useGetUint = (args) => {
  const { chain } = useNetwork()
  const addr = storageAddresses[chain?.id]

  return useContractRead({
    address: addr,
    abi: Storage,
    functionName: 'getUint',
    args: [args],
  })
}

export type AllContracts =
  | 'Oracle'
  | 'Storage'
  | 'MinipoolManager'
  | 'TokenGGP'
  | 'TokenggAVAX'
  | 'Staking'
  | 'OneInchMock'
  | 'RewardsPool'
  | 'ClaimNodeOp'
  | 'ProtocolDAO'
  | 'MinipoolStreamliner'

export const useGetAddress = (key: AllContracts, storageAddr?: string) => {
  const { chain } = useNetwork()
  const addr: HexString = storageAddr || storageAddresses[chain?.id]

  const args = ethers.utils.solidityKeccak256(
    ['string', 'string'],
    ['contract.address', key],
  ) as HexString

  const resp = useContractRead<typeof Storage, string, HexString>({
    address: addr,
    abi: Storage,
    functionName: 'getAddress',
    args: [args],
  })

  return resp
}
