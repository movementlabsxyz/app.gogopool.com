import { BigNumber, providers } from "ethers";
import { useEffect, useState } from "react";

import useTokenGGPContract from "./contracts/tokenGGP";

export const useGGPBalance = (provider: providers.Web3Provider | undefined, address: string): BigNumber => {
  const [balance, setBalance] = useState<BigNumber>(BigNumber.from("0"))
  const token = useTokenGGPContract(provider);
  
  const getBalance = async () => {
        const ggpBalance = await token.balanceOf(address)
        setBalance(ggpBalance)
  }

  useEffect(() => {
    if (token && address) {
        getBalance()
    }
  }, [token, address])
  
  return balance
  }