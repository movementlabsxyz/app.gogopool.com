import { useContractRead } from "wagmi";

import useStakingContract from "./contracts/staking";
import useTokenGGPContract from "./contracts/tokenGGP";

const useGGPAllowance = (address: string | undefined) => {
  const { address: tokenAddr, contractInterface } = useTokenGGPContract();
  const { address: stakingAddr } = useStakingContract();

  const resp = useContractRead({
    addressOrName: tokenAddr,
    contractInterface: contractInterface,
    functionName: "allowance",
    args: [address, stakingAddr],
  });

  return resp;
};

export default useGGPAllowance;
