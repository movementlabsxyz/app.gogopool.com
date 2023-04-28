import { ethers } from 'ethers'

import { useContractRead, useNetwork } from 'wagmi'

import { storageAddresses } from '../constants/storageAddresses'

import Storage from '@/contracts/Storage.json'

export type HexString = `0x${string}`

export const useGetUint = (args) => {
  const { chain } = useNetwork()
  const addr = storageAddresses[chain?.id]

  return useContractRead({
    address: addr,
    abi: Storage.abi,
    functionName: 'getUint',
    args: [args],
  })
}

export const useGetAddress = (key: string, storageAddr?: string) => {
  const { chain } = useNetwork()
  const addr: HexString = storageAddr || storageAddresses[chain?.id]

  const args = ethers.utils.solidityKeccak256(['string', 'string'], ['contract.address', key])

  const resp = useContractRead<typeof Storage.abi, string, HexString>({
    address: addr,
    abi: Storage.abi,
    functionName: 'getAddress',
    args: [args],
  })

  return resp
}
