import { BigNumber, providers } from "ethers";
import { useEffect, useState } from "react";

import useOneInchOracle from "./contracts/oneInchOracle";
import useTokenContract from "./contracts/tokenggAVAX";

const useExchangeRate = (provider: providers.Web3Provider | undefined) => {
  const [exchangeRate, setExchangeRate] = useState<BigNumber>(
    BigNumber.from(0)
  );
  const oracle = useOneInchOracle(provider);
  const token = useTokenContract(provider);

  useEffect(() => {
    if (!provider) return;
    if (!oracle || !token) return;
    const getExchangeRate = async () => {
      const rate = await oracle.getRateToEth(token?.address, true);
      setExchangeRate(rate);
    };
    getExchangeRate();
  }, [provider, oracle, token]);

  return exchangeRate;
};

export default useExchangeRate;
