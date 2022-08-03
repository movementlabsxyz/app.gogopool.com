import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  FormControl,
  Hide,
  Show,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { BigNumber, utils } from "ethers";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { useAccount, useBalance } from "wagmi";

import { Button } from "@/common/components/Button";
import { Card, Content, Footer, Title } from "@/common/components/Card";
import { InfoCircleIcon } from "@/common/components/CustomIcon";
import { SwapIcon } from "@/common/components/CustomIcon/SwapIcon";
import { Tooltip } from "@/common/components/Tooltip";
import useCoinPrice from "@/hooks/coinPrice";
import useTokenggAVAXContract from "@/hooks/contracts/tokenggAVAX";
import useDeposit from "@/hooks/deposit";
import useExchangeRate from "@/hooks/ggexchange";
import { useStorageAddress } from "@/hooks/storage";
import { roundedBigNumber } from "@/utils/numberFormatter";

import { DepositDrawer } from "../Drawer";
import { DepositModal } from "../Modal";
import { RewardForm } from "./RewardForm";
import { StakeForm } from "./StakeForm";
import { Statistics } from "./Statistics";

const statisticData = [
  {
    label: (
      <>
        Annual Percentage Rate
        <Tooltip
          placement="right"
          content="Percentage reward you get per year on your staked AVAX."
        >
          <Box as="span">
            <InfoCircleIcon fill="grey.600" className="ml-1" />
          </Box>
        </Tooltip>
      </>
    ),
    value: "~7.20%",
  },
  {
    label: (
      <>
        Exchange Rate
        <Tooltip
          placement="right"
          content="Rate of exchange between AVAX and ggAVAX."
        >
          <Box as="span">
            <InfoCircleIcon fill="grey.600" className="ml-1" />
          </Box>
        </Tooltip>
      </>
    ),
    value: "1 AVAX = 0.0000 sAVAX",
  },
  {
    label: <># of Stakers</>,
    value: "0",
  },
  {
    label: <>Total AVAX Staked</>,
    value: "0 AVAX",
  },
  {
    label: <>sAVAX Market Cap</>,
    value: "$0",
  },
  {
    label: (
      <>
        Unstaking Cooldown Period
        <Tooltip
          placement="right"
          content="The waiting period before all funds become available."
        >
          <Box as="span">
            <InfoCircleIcon fill="grey.600" className="ml-1" />
          </Box>
        </Tooltip>
      </>
    ),
    value: "0 days",
  },
  {
    label: (
      <>
        Redemption Period
        <Tooltip
          placement="right"
          content="The time period where redemption is allowed."
        >
          <Box as="span">
            <InfoCircleIcon fill="grey.600" className="ml-1" />
          </Box>
        </Tooltip>
      </>
    ),
    value: "0 days",
  },
];

export const LiquidStaking: FunctionComponent = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { openConnectModal } = useConnectModal();

  const [amount, setAmount] = useState<number>(); // stake value
  const [reward, setReward] = useState<number>(0); // reward value

  const { isConnected, address: account } = useAccount();

  const { address: ggAVAXAddress } = useTokenggAVAXContract();

  // AVAX balance
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    addressOrName: account,
  });

  // ggAVAX balance
  const { data: ggAVAXBalance } = useBalance({
    addressOrName: account,
    token: ggAVAXAddress,
  });

  // deposit the AVAX
  const {
    write: deposit,
    isLoading: isDepositLoading,
    status: depositStatus,
  } = useDeposit(utils.parseEther(amount?.toString() || "0"));

  // ggAVAX to AVAX exchange rate
  const { data: exchangeRate, isLoading: isLoadingExchangeRate } =
    useExchangeRate();

  // Current market price for AVAX
  const { price: AVAXPrice } = useCoinPrice("avalanche-2");

  const isLoading =
    isBalanceLoading || isDepositLoading || isLoadingExchangeRate;

  const handleSwap = () => {
    const temporaryAmount = amount;
    const temporaryReward = reward;

    setAmount(temporaryReward);
    setReward(temporaryAmount);
  };

  useEffect(() => {
    if (depositStatus === "success") {
      (() => onOpen())();
      return;
    }
    if (depositStatus === "error") {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
      });
      return;
    }
  }, [depositStatus]);

  useEffect(() => {
    const rate = parseInt(utils.formatEther(exchangeRate || 0));
    const rewardAmount = rate * amount;
    if (isNaN(rewardAmount)) {
      setReward(0);
    } else {
      setReward(rewardAmount);
    }
  }, [amount, exchangeRate]);

  const displayButton = () => {
    if (!isConnected) {
      return (
        <Button full onClick={openConnectModal}>
          Connect Wallet
        </Button>
      );
    }
    if (balance?.value.lte(utils.parseEther(amount.toString()))) {
      return (
        <Button full disabled variant="destructive-outline">
          Insufficient Funds
        </Button>
      );
    }
    if (depositStatus === "error") {
      return (
        <Button full disabled variant="destructive-outline">
          Deposit Unavailable
        </Button>
      );
    }
    return (
      <Button full disabled={!amount || isLoading} onClick={deposit}>
        {isLoading ? "Loading..." : "Deposit"}
      </Button>
    );
  };

  return (
    <>
      <Show above="sm">
        <DepositModal
          status={depositStatus}
          isOpen={isOpen}
          onClose={() => {
            onClose();
            setAmount(0);
          }}
          successProps={{
            amount: amount,
            token: "AVAX",
          }}
        />
      </Show>
      <Hide above="sm">
        <DepositDrawer
          status={depositStatus}
          isOpen={isOpen}
          onClose={() => {
            onClose();
            setAmount(0);
          }}
          successProps={{
            amount: amount,
            token: "AVAX",
          }}
        />
      </Hide>
      <Card outer>
        <Title>Liquid Staking</Title>
        <Content>
          <FormControl>
            <Box position="relative">
              <Card backgroundColor="grey.100" mb="2">
                <Content>
                  <StakeForm
                    amount={amount}
                    setAmount={setAmount}
                    setReward={setReward}
                    balance={roundedBigNumber(balance?.value || 0)}
                    exchangeRate={AVAXPrice || 0}
                  />
                </Content>
              </Card>
              <Box
                position="absolute"
                bgColor="green.500"
                w="8"
                h="6"
                borderRadius="md"
                className="left-[calc(50%-16px)] bottom-[-16px] cursor-pointer"
                display="flex"
                justifyContent="center"
                alignItems="center"
                onClick={handleSwap}
              >
                <SwapIcon size="16px" />
              </Box>
            </Box>
            <Card p="1rem 1.5rem" backgroundColor="grey.100" mb="4">
              <Content>
                <RewardForm
                  reward={reward}
                  balance={roundedBigNumber(ggAVAXBalance?.value || 0)}
                />
              </Content>
            </Card>
            <Card rounded="12px" p="0" backgroundColor="grey.100" mb="2">
              <Content>
                <Accordion allowToggle>
                  <AccordionItem>
                    <AccordionButton
                      p="1rem 1.5rem"
                      data-testid="liquid-staking-accordion-action"
                    >
                      <Text
                        flex="1"
                        textAlign="left"
                        size="md"
                        fontWeight="bold"
                      >
                        Liquid Staking Statistics
                      </Text>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel p="0 1.5rem 1rem 1.5rem">
                      <Statistics data={statisticData} />
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Content>
            </Card>
          </FormControl>
        </Content>
        <Footer>{displayButton()}</Footer>
      </Card>
    </>
  );
};
