import { useContractRead } from 'wagmi'

import useStakingContract from './contracts/staking'
import useTokenGGPContract from './contracts/tokenGGP'

const useGGPAllowance = (address: string | undefined) => {
  const { abi, address: tokenAddr } = useTokenGGPContract()
  const { address: stakingAddr } = useStakingContract()

  const resp = useContractRead({
    address: tokenAddr as `0x${string}`,
    abi: abi,
    functionName: 'allowance',
    args: [address, stakingAddr],
    watch: true,
  })

  return resp
}

export default useGGPAllowance
