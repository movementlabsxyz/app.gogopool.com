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
import { FunctionComponent } from "react";

import { Button } from "@/common/components/Button";
import { Card, Content, Footer, Title } from "@/common/components/Card";
import { SwapIcon } from "@/common/components/CustomIcon/SwapIcon";
import { Tooltip } from "@/common/components/Tooltip";

import { RewardForm } from "./RewardForm";
import { StakeForm } from "./StakeForm";
import { Statistics } from "./Statistics";

const statisticData = [
  {
    label: (
      <>
        Annual Percentage Rate
        <Tooltip placement="right" content="Explanation here">
          <span className="ml-1 h-3 w-3 rounded-full bg-red-500" />
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
          <span className="ml-1 h-3 w-3 rounded-full bg-red-500" />
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
          <span className="ml-1 h-3 w-3 rounded-full bg-red-500" />
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
          <span className="ml-1 h-3 w-3 rounded-full bg-red-500" />
        </Tooltip>
      </>
    ),
    value: "0 days",
  },
];

export const LiquidStaking: FunctionComponent = () => {
  return (
    <Card outer>
      <Title>Liquid Staking</Title>
      <Content>
        <FormControl>
          <Box position="relative">
            <Card backgroundColor="grey.100" mb="2">
              <Content>
                <StakeForm />
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
            >
              <SwapIcon size="16px" />
            </Box>
          </Box>
          <Card p="1rem 1.5rem" backgroundColor="grey.100" mb="4">
            <Content>
              <RewardForm reward={0} balance={0} />
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
        <Button full={true}>Connect wallet</Button>
      </Footer>
    </Card>
  );
};
