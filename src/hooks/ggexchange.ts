import { useContractRead } from "wagmi";

import useOneInchOracle from "./contracts/oneInchOracle";
import useTokenContract from "./contracts/tokenggAVAX";

const useExchangeRate = () => {
  const { address: oracleAddr, contractInterface: oracleInterface } =
    useOneInchOracle();
  const { address: tokenAddr } = useTokenContract();

  const resp = useContractRead({
    addressOrName: oracleAddr,
    contractInterface: oracleInterface,
    functionName: "getRateToEth",
    args: [tokenAddr, true],
  });

  return resp;
};

export default useExchangeRate;
