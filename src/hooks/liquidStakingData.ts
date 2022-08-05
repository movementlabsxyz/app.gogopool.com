import { useContractRead } from "wagmi";

import useTokenggAVAXContract from "@/hooks/contracts/tokenggAVAX";
import { roundedBigNumber } from "@/utils/numberFormatter";

import useExchangeRate from "./ggexchange";

// gets the liquid staking statistics from the contract
const useLiquidStakingData = () => {
  const { address: ggAVAXAddr, contractInterface: ggAVAXInterface } =
    useTokenggAVAXContract();

  const { data: exchangeRate, isLoading: isExchangeRateLoading } =
    useExchangeRate();

  const { data: totalStakedAVAX, isLoading: isStakingBalanceLoading } =
    useContractRead({
      addressOrName: ggAVAXAddr,
      contractInterface: ggAVAXInterface,
      functionName: "totalReleasedAssets",
    });

  const { data: rewardsCycleLength, isLoading: isRewardsCycleLengthLoading } =
    useContractRead({
      addressOrName: ggAVAXAddr,
      contractInterface: ggAVAXInterface,
      functionName: "rewardsCycleLength",
    });

  const apr = 1 - roundedBigNumber(exchangeRate, 4);

  const isLoading =
    isExchangeRateLoading ||
    isStakingBalanceLoading ||
    isRewardsCycleLengthLoading;

  return {
    exchangeRate,
    isLoading,
    rewardsCycleLength,
    totalStakedAVAX,
    apr,
  };
};

export default useLiquidStakingData;
