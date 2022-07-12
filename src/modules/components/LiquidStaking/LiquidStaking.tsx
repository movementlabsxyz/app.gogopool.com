import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  FormControl,
  Text,
} from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";

import { Button } from "@/common/components/Button";
import { Card, Content, Footer, Title } from "@/common/components/Card";
import { SwapIcon } from "@/common/components/CustomIcon/SwapIcon";
import { Tooltip } from "@/common/components/Tooltip";
import useDeposit from "@/hooks/deposit";
import useWallet from "@/hooks/wallet";

import { RewardForm } from "./RewardForm";
import { StakeForm } from "./StakeForm";
import { Statistics } from "./Statistics";

const statisticData = [
  {
    label: (
      <>
        Annual Percentage Rate
        <Tooltip placement="right" content="Explanation here">
          <div className="w-3 h-3 ml-1 bg-red-500 rounded-full" />
        </Tooltip>
      </>
    ),
    value: "~7.20%",
  },
  {
    label: (
      <>
        Exchange Rate
        <Tooltip placement="right" content="Explanation here">
          <div className="w-3 h-3 ml-1 bg-red-500 rounded-full" />
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
        <Tooltip placement="right" content="Explanation here">
          <div className="w-3 h-3 ml-1 bg-red-500 rounded-full" />
        </Tooltip>
      </>
    ),
    value: "0 days",
  },
  {
    label: (
      <>
        Redemption Period
        <Tooltip placement="right" content="Explanation here">
          <div className="w-3 h-3 ml-1 bg-red-500 rounded-full" />
        </Tooltip>
      </>
    ),
    value: "0 days",
  },
];

export const LiquidStaking: FunctionComponent = () => {
  const { account, activate, provider } = useWallet();
  const { send } = useDeposit(provider);

  const [amount, setAmount] = useState<number>(0);

  const handleDeposit = async () => {
    await send(amount);
  };

  const handleConnect = () => {
    activate();
  };

  return (
    <Card color="#000000">
      <Title>Liquid Staking</Title>
      <Content position="relative">
        <FormControl>
          <Card width="auto" rounded="4" backgroundColor="grey.100" mb="2">
            <Content>
              <StakeForm amount={amount} setAmount={setAmount} />
            </Content>
          </Card>
          <Box
            position="absolute"
            bgColor="green.500"
            w="8"
            h="6"
            borderRadius="md"
            className="left-[calc(50%-16px)] top-[148px] cursor-pointer"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <SwapIcon size="16px" />
          </Box>
          <Card width="auto" rounded="4" p="1rem 1.5rem" backgroundColor="grey.100" mb="4">
            <Content>
              <RewardForm reward={0} balance={0} />
            </Content>
          </Card>
          <Card width="auto" rounded="4" p="0" backgroundColor="grey.100" mb="2">
            <Content>
              <Accordion allowToggle>
                <AccordionItem>
                  <AccordionButton p="1rem 1.5rem" data-testid="liquid-staking-accordion-action">
                    <Text flex="1" textAlign="left" size="md" fontWeight="bold">
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
      <Footer>
        {account ? (
          <Button full disabled={!amount} onClick={handleDeposit}>
            Deposit
          </Button>
        ) : (
          <Button full onClick={handleConnect}>
            Connect wallet
          </Button>
        )}
      </Footer>
    </Card>
  );
};
