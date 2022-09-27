import { useContractRead } from "wagmi";

import useNOPClaimContract from "./contracts/nopClaim";

export const useCanClaim = (ownerAddress: string) => {
  const { address, contractInterface } = useNOPClaimContract();

  return useContractRead({
    addressOrName: address,
    contractInterface,
    functionName: "canClaim",
    args: [ownerAddress],
  });
};

export const useGetClaimRewardsAmount = (ownerAddress: string) => {
  const { address, contractInterface } = useNOPClaimContract();

  return useContractRead({
    addressOrName: address,
    contractInterface,
    functionName: "getClaimRewardsAmount",
    args: [ownerAddress],
  });
};
