import { parseUnits } from 'ethers/lib/utils'
import { useContractRead } from 'wagmi'

import useTokenggAVAX from './contracts/tokenggAVAX'

const useExchangeRate = () => {
  const { abi: tokenggAVAXInterface, address: tokenggAVAXAddr } = useTokenggAVAX()

  const resp = useContractRead({
    address: tokenggAVAXAddr,
    abi: tokenggAVAXInterface,
    functionName: 'previewDeposit',
    args: [parseUnits('1.0')],
  })

  return resp
}

export default useExchangeRate
