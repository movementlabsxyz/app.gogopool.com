import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";

import useStakingContract from "./contracts/staking";

// approve has to be called first
export const useStakeGGP = (amount: BigNumber) => {
  const { address: stakingAddress, contractInterface } = useStakingContract();

  const { config } = usePrepareContractWrite({
    addressOrName: stakingAddress,
    contractInterface,
    functionName: "stakeGGP",
    args: [amount],
  });

  return useContractWrite(config);
};

// getAVAXStake
export const useGetAVAXStake = (stakerAddr: string) => {
  const { address: stakingAddress, contractInterface } = useStakingContract();

  const { data, isLoading, isError } = useContractRead({
    addressOrName: stakingAddress,
    contractInterface: contractInterface,
    functionName: "getAVAXStake",
    args: [stakerAddr],
    watch: true,
  });

  return { data: Number(formatEther(data || 0)), isLoading, isError };
};

// getGGPStake
export const useGetGGPStake = (stakerAddr: string, watch = false) => {
  const { address, contractInterface } = useStakingContract();

  const { data, isLoading, isError } = useContractRead({
    addressOrName: address,
    contractInterface: contractInterface,
    functionName: "getGGPStake",
    args: [stakerAddr],
    watch,
  });

  return { data: Number(formatEther(data || 0)), isLoading, isError };
};

export const useGetTotalGGPStake = () => {
  const { address, contractInterface } = useStakingContract();

  return useContractRead({
    addressOrName: address,
    contractInterface,
    functionName: "getTotalGGPStake",
  });
};

export const useGetStakerCount = () => {
  const { address, contractInterface } = useStakingContract();

  return useContractRead({
    addressOrName: address,
    contractInterface,
    functionName: "getStakerCount",
  });
};

export const useRequireValidStaker = (stakerAddr: string) => {
  const { address, contractInterface } = useStakingContract();

  return useContractRead({
    addressOrName: address,
    contractInterface: contractInterface,
    functionName: "requireValidStaker",
    args: [stakerAddr],
  });
};
