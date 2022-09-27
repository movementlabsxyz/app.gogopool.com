import { Center, Flex, useDisclosure, VStack } from "@chakra-ui/react";
import { formatUnits } from "ethers/lib/utils";
import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { useAccount } from "wagmi";

import { Button } from "@/common/components/Button";
import { PageHead } from "@/common/components/PageHead";
import useCoinPrice from "@/hooks/coinPrice";
import { useCanClaim } from "@/hooks/useNOPClaim";
import { useClaimIntervalTime } from "@/hooks/useRewards";
import useSelectedCurrency from "@/hooks/useSelectedCurrency";
import { useGetAVAXStake, useGetGGPStake } from "@/hooks/useStake";
import {
  ClaimRewards,
  TokenPrices,
  TotalMinipoolValue,
  TotalRewards,
} from "@/modules/components/Dashboard";
import MinipoolTable from "@/modules/components/MinipoolTable";
import { ClaimRewardsModal } from "@/modules/components/Modal/ClaimRewardsModal";

const NextLink = Link;

const calculateTotalValue = (avaxAmt, GGPAmt, currency = "usd") => {
  const { price: AVAXPrice } = useCoinPrice("avalanche-2", currency);
  const { price: GGPPrice } = useCoinPrice("rocket-pool", currency);

  const avaxValue = avaxAmt * AVAXPrice;
  const ggpValue = GGPAmt * GGPPrice;
  return { totalValue: avaxValue + ggpValue, avaxValue, ggpValue };
};

const calculateTotalRewards = (minipools) => {
  if (!minipools) {
    return 0;
  }
  let totalRewards = 0;
  minipools.forEach((minipool) => {
    totalRewards += Number(formatUnits(minipool.avaxNodeOpRewardAmt));
  });
  return totalRewards;
};

const Dashboard: NextPage = () => {
  const { address } = useAccount();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [lookupToken, setLookupToken] = useState("avalanche-2");
  const { selectedCurrency: lookupCurrency } = useSelectedCurrency();

  const { claimIntervalTime, isLoadingClaimIntervalTime } =
    useClaimIntervalTime();
  const claimIntervalTimeNumber = claimIntervalTime
    ? claimIntervalTime.toNumber() * 1000
    : 0;

  // TODO Fix this math with correct startTime rather than Date.now()
  const nextClaimTime = new Date(Date.now() + claimIntervalTimeNumber);
  const isLoadingInterval = isLoadingClaimIntervalTime;
  const isLoadingValue = isLoadingClaimIntervalTime;
  // const canClaim = Date.now() < nextClaimTime.getMilliseconds();

  const { data: avaxStake } = useGetAVAXStake(address);
  const { data: ggpStake } = useGetGGPStake(address);
  const { totalValue, avaxValue, ggpValue } = calculateTotalValue(
    avaxStake,
    ggpStake,
    lookupCurrency
  );

  const { data: canClaim } = useCanClaim(address);

  // sadly this is the only way to convert the value to a boolean
  const userCanClaim = canClaim as unknown as boolean;

  const swapLookupToken = () => {
    if (lookupToken === "avalanche-2") {
      // This should be changed to GGP
      // once its listed on coingecko
      setLookupToken("rocket-pool");
    } else {
      setLookupToken("avalanche-2");
    }
  };

  return (
    <>
      <PageHead
        append={false}
        description="Node Operator Dashboard"
        name="Dashboard"
      />
      <ClaimRewardsModal
        status={"success"}
        ownerAddress={address}
        isOpen={isOpen}
        onClose={() => {
          onClose();
        }}
        successProps={{
          amount: 100,
          token: "GGP",
        }}
      />

      <Center marginTop={2}>
        <VStack>
          <Flex minWidth={"max-content"} gap={2} align="center" wrap="wrap">
            <ClaimRewards
              userCanClaim={userCanClaim}
              nextClaimTime={nextClaimTime}
              claimIntervalTime={claimIntervalTimeNumber}
              isLoading={isLoadingInterval}
              openClaimModal={onOpen}
            />
            <TotalRewards
              rewards={calculateTotalRewards(undefined).toLocaleString()}
            />
            <TotalMinipoolValue
              vsCurrency={lookupCurrency}
              totalValue={totalValue}
              avaxValue={avaxValue}
              ggpValue={ggpValue}
              avaxStake={avaxStake}
              ggpStake={ggpStake}
              isLoading={isLoadingValue}
            />
          </Flex>
          <TokenPrices
            currencyID={lookupToken}
            vsCurrency={lookupCurrency}
            onSwap={swapLookupToken}
            tooltip
          />
          <MinipoolTable ownerAddress={address} />
          <Flex
            minWidth={"max-content"}
            flexDir="column"
            gap={2}
            align="center"
            wrap="wrap"
          >
            <NextLink href="/nodeOperator" passHref>
              <Button> Create a Minipool </Button>
            </NextLink>
          </Flex>
        </VStack>
      </Center>
    </>
  );
};

export default Dashboard;
