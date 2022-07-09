import { Contract, providers, utils } from "ethers";
import { useState } from "react";
import useAsyncEffect from "use-async-effect";

import TokenGGP from "../../contracts/TokenGGP.json";
import { useStorageAddress } from "../storage";

const useTokenGGPContract = (provider: providers.Web3Provider | undefined) => {
  const [contract, setContract] = useState<Contract | undefined>(undefined);

  const tokenContractAddress = useStorageAddress("TokenGGP");

  useAsyncEffect(() => {
    if (!provider || !tokenContractAddress) return;
    const i = new utils.Interface(TokenGGP.abi);
    const c = new Contract(tokenContractAddress, i, provider.getSigner());
    setContract(c);
  }, [provider, tokenContractAddress]);

  return contract;
};

export default useTokenGGPContract;
