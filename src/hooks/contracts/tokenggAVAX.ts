import { Contract, providers, utils } from "ethers";
import { useState } from "react";
import useAsyncEffect from "use-async-effect";

import TokenggAVAX from "../../contracts/TokenggAVAX.json";
import { useStorageAddress } from "../storage";

const useTokenContract = (provider: providers.Web3Provider | undefined) => {
  const [contract, setContract] = useState<Contract | undefined>(undefined);

  const tokenContractAddress = useStorageAddress("TokenggAVAX");

  useAsyncEffect(async () => {
    if (!provider || !tokenContractAddress) return;
    const i = new utils.Interface(TokenggAVAX.abi);
    const c = new Contract(tokenContractAddress, i, await provider.getSigner());
    setContract(c);
  }, [provider, tokenContractAddress]);

  return contract;
};

export default useTokenContract;
