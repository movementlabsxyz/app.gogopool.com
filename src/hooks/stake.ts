import { BigNumber } from "ethers";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

import useStakingContract from "./contracts/staking";

// approve has to be called first
const useStake = (amount: BigNumber) => {
  const { address: stakingAddress, contractInterface } = useStakingContract();

  const { config } = usePrepareContractWrite({
    addressOrName: stakingAddress,
    contractInterface,
    functionName: "stakeGGP",
    args: [amount],
  });

  const resp = useContractWrite(config);

  return {
    ...resp,
    ready: resp?.write !== undefined,
  };
};

export default useStake;
