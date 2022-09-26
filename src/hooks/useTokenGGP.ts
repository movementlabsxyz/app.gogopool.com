import { BigNumber } from "ethers";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";

import useStakingContract from "./contracts/staking";
import useTokenGGPContract from "./contracts/tokenGGP";

export const useAllowance = (addr: string, spender: string) => {
  const { address, contractInterface } = useTokenGGPContract();

  return useContractRead({
    addressOrName: address,
    contractInterface,
    functionName: "allowance",
    args: [addr, spender],
  });
};

export const newApproveGGP = (amount: BigNumber) => {
  const { address: ggpTokenAddress, contractInterface } = useTokenGGPContract();
  const { address: stakingAddr } = useStakingContract();
  console.log("tokenggp address", ggpTokenAddress);

  const { config, error } = usePrepareContractWrite({
    addressOrName: ggpTokenAddress,
    contractInterface,
    functionName: "approve",
    args: [stakingAddr, amount],
  });
  console.log("approval error", error);

  return useContractWrite(config);
};
