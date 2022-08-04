import { useContractRead } from "wagmi";

import useTokenggAVAXContract from "@/hooks/contracts/tokenggAVAX";
import { roundedBigNumber } from "@/utils/numberFormatter";

import useExchangeRate from "./ggexchange";

// gets the liquid staking statistics from the contract
const useLiquidStakingData = () => {
  const { address: ggAVAXAddr, contractInterface: ggAVAXInterface } =
    useTokenggAVAXContract();

  const {
    data: exchangeRate,
    isLoading: isExchangeRateLoading,
    // status: exchangeRateStatus,
  } = useExchangeRate();

  const {
    data: totalStakedAVAX,
    isLoading: isStakingBalanceLoading,
    // status: totalStakedAVAXStatus,
  } = useContractRead({
    addressOrName: ggAVAXAddr,
    contractInterface: ggAVAXInterface,
    functionName: "totalReleasedAssets",
  });

  const apr = 1 - roundedBigNumber(exchangeRate, 4);

  const isLoading = isExchangeRateLoading || isStakingBalanceLoading;

  return {
    exchangeRate,
    isLoading,
    totalStakedAVAX,
    apr,
  };
};

export default useLiquidStakingData;
