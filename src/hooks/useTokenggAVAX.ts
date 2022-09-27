import { useContractRead } from "wagmi";

import useTokenggAVAXContract from "./contracts/tokenggAVAX";

export const useBalanceOf = (addr: string) => {
  const { address, contractInterface } = useTokenggAVAXContract();

  return useContractRead({
    addressOrName: address,
    contractInterface,
    functionName: "balanceOf",
    args: [addr],
    watch: true,
  });
};
