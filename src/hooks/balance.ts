import { BigNumber } from "ethers";
import { useState } from "react";
import useAsyncEffect from "use-async-effect";

import useProvider from "./provider";
import { useSelector } from "./redux";

const useBalance = () => {
  const provider = useProvider();
  const { account } = useSelector((state) => state.wallet);
  const [balance, setBalance] = useState<BigNumber>(BigNumber.from(0));

  useAsyncEffect(async () => {
    if (!provider) return;
    if (!account) {
      setBalance(BigNumber.from(0));
      return;
    }
    const b = await provider.getBalance(account);
    setBalance(b);
  }, [account, provider]);

  return balance;
};

export default useBalance;
