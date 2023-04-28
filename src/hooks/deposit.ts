import { BigNumber } from 'ethers'

import { useAddRecentTransaction } from '@rainbow-me/rainbowkit'
import { formatEther } from 'ethers/lib/utils'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'

import useTokenContract from './contracts/tokenggAVAX'

const useDeposit = (amount: BigNumber) => {
  const { abi, address } = useTokenContract()
  const addRecentTransaction = useAddRecentTransaction()

  const { config } = usePrepareContractWrite({
    address,
    abi,
    functionName: 'depositAVAX',
    enabled: !amount.eq(BigNumber.from(0)),
    args: [],
    overrides: {
      value: amount,
    },
  })

  const resp = useContractWrite({
    ...config,
    onSuccess(data) {
      addRecentTransaction({
        hash: data.hash,
        description: `Deposit ${formatEther(amount)} AVAX`,
      })
    },
  })

  return {
    ...resp,
    ready: resp?.write !== undefined,
  }
}

export default useDeposit
