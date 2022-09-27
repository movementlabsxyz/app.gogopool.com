import { useContractRead } from "wagmi";

import useRewardsPoolContract from "./contracts/rewardsPool";

// this gets the start time of the last interval
// If we have gone past an interval and someone calls syncRewards
// then we start the new period
export const useClaimIntervalStartTime = () => {
  const { address: rewardsAddr, contractInterface: rewardsInterface } =
    useRewardsPoolContract();

  const {
    data: lastClaimIntervalStartTime,
    isLoading: isLoadingClaimIntervalStartTime,
  } = useContractRead({
    addressOrName: rewardsAddr,
    contractInterface: rewardsInterface,
    functionName: "getClaimIntervalTimeStart",
  });

  return {
    lastClaimIntervalStartTime,
    isLoadingClaimIntervalStartTime,
  };
};

// this returns in seconds
export const useClaimIntervalTime = () => {
  const { address: rewardsAddr, contractInterface: rewardsInterface } =
    useRewardsPoolContract();

  const { data: claimIntervalTime, isLoading: isLoadingClaimIntervalTime } =
    useContractRead({
      addressOrName: rewardsAddr,
      contractInterface: rewardsInterface,
      functionName: "getClaimIntervalTime",
    });

  return {
    claimIntervalTime,
    isLoadingClaimIntervalTime,
  };
};
