import { Contract, providers, utils } from "ethers";
import { useState } from "react";
import useAsyncEffect from "use-async-effect";

// this will be changed to the real contract when its available
import OneInchOracle from "../../contracts/OneInchMock.json";

const useOneInchOracle = (provider: providers.Web3Provider | undefined) => {
  const [contract, setContract] = useState<Contract | undefined>(undefined);

  // this will be changed to the real contract when its available
  // const oneInchOracleAddress = useStorageAddress("OneInchOracle");
  // testnet address that isn't in storage for some reason
  const oneInchOracleAddress = "0x5DB9A7629912EBF95876228C24A848de0bfB43A9";

  useAsyncEffect(() => {
    if (!provider || !oneInchOracleAddress) return;
    const i = new utils.Interface(OneInchOracle.abi);
    const c = new Contract(oneInchOracleAddress, i, provider.getSigner());
    setContract(c);
  }, [provider, oneInchOracleAddress]);

  return contract;
};

export default useOneInchOracle;
