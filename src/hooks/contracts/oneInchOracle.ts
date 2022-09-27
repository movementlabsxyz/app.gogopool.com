// import { useStorageAddress } from "../storage";
import { utils } from "ethers";

import OneInchOracle from "@/contracts/OneInchMock.json";

const useOneInchOracle = () => {
  // this will be changed to the real contract when its available
  // const {data, isLoading, isError} = useStorageAddress("OneInchOracle");
  // testnet address that isn't in storage for some reason
  const oneInchOracleAddress = "0x5DB9A7629912EBF95876228C24A848de0bfB43A9";

  const contractInterface = new utils.Interface(OneInchOracle.abi);

  return { address: oneInchOracleAddress, contractInterface };
};

export default useOneInchOracle;
