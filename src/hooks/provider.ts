import { providers } from "ethers";
import { useEffect, useState } from "react";

export const useProvider = () => {
  const [provider, setProvider] = useState<providers.Web3Provider | undefined>(undefined);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (window.ethereum) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setProvider(new providers.Web3Provider(window.ethereum));
    }
  }, []);

  return provider;
};

export default useProvider;
