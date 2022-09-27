import { BigNumber } from "ethers";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

import useTokenContract from "./contracts/tokenggAVAX";

const useRedeem = (amount: BigNumber) => {
  const { address, contractInterface } = useTokenContract();

  const { config } = usePrepareContractWrite({
    addressOrName: address,
    contractInterface,
    functionName: "redeemAVAX",
    args: [amount],
  });

  const resp = useContractWrite(config);

  return {
    ...resp,
    ready: resp?.write !== undefined,
  };
};

export default useRedeem;
