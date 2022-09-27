import { parseUnits } from "ethers/lib/utils";
import { useContractRead } from "wagmi";

import useTokenggAVAX from "./contracts/tokenggAVAX";

const useExchangeRate = () => {
  const { address: tokenggAVAXAddr, contractInterface: tokenggAVAXInterface } =
    useTokenggAVAX();

  const resp = useContractRead({
    addressOrName: tokenggAVAXAddr,
    contractInterface: tokenggAVAXInterface,
    functionName: "previewDeposit",
    args: [parseUnits("1.0")],
  });

  return resp;
};

export default useExchangeRate;
