import { BigNumber } from "ethers";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

import useTokenContract from "./contracts/tokenggAVAX";

const useDeposit = (amount: BigNumber) => {
  const { address, contractInterface } = useTokenContract();

  const { config } = usePrepareContractWrite({
    addressOrName: address,
    contractInterface,
    functionName: "depositAVAX",
    overrides: {
      value: amount,
    },
  });

  const resp = useContractWrite(config);

  return {
    ...resp,
    ready: resp?.write !== undefined,
  };
};

export default useDeposit;
