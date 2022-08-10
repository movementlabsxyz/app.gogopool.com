import { BigNumber } from "ethers";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

import useStakingContract from "./contracts/staking";
import useTokenGGPContract from "./contracts/tokenGGP";

export const useApproveGGP = (amount: BigNumber) => {
  const { address: ggpTokenAddress, contractInterface } = useTokenGGPContract();

  const { address: stakingAddr } = useStakingContract();

  const { config } = usePrepareContractWrite({
    addressOrName: ggpTokenAddress,
    contractInterface,
    functionName: "approve",
    args: [stakingAddr, amount],
  });

  const resp = useContractWrite(config);

  return {
    ...resp,
    ready: resp?.write !== undefined,
  };
};

export default useApproveGGP;
