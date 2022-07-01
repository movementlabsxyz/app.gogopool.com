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

import { StakeForm } from "./StakeForm";

export const LiquidStaking: FunctionComponent = () => {
  const statisticData = [
    {
      label: (
        <>
          Annual Percentage Rate
          <div className="ml-1 h-3 w-3 rounded-full bg-red-500" />
        </>
      ),
      value: "~7.20%",
    },
    {
      label: (
        <>
          Exchange Rate
          <div className="ml-1 h-3 w-3 rounded-full bg-red-500" />
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
          <div className="ml-1 h-3 w-3 rounded-full bg-red-500" />
        </>
      ),
      value: "0 days",
    },
    {
      label: (
        <>
          Redemption Period
          <div className="ml-1 h-3 w-3 rounded-full bg-red-500" />
        </>
      ),
      value: "0 days",
    },
  ];

  return (
    <Card>
      <Title>Liquid Staking</Title>
      <Content position="relative">
        <FormControl>
          <Card width="auto" rounded="4" backgroundColor="grey.100" mb="2">
            <Content>
              <StakeForm />
            </Content>
          </Card>
          <Box // TODO: Add icon and functionality
            position="absolute"
            bgColor="green.500"
            w="8"
            h="6"
            borderRadius="md"
            className="left-[calc(50%-16px)] top-[148px] cursor-pointer"
          />
          <Card
            width="auto"
            rounded="4"
            p="1rem 1.5rem"
            backgroundColor="grey.100"
            mb="4"
          >
            <Content>
              <Box // I am not sure what to call this section. Need advice on component name
                display="flex"
                flexDir="row"
                justifyContent="space-between"
                alignItems="center"
                mb="2.5"
              >
                <Text size="sm" fontWeight="600" className="text-grey-600">
                  RECEIVE ggpAVAX
                </Text>
                <Box display="flex" flexDir="row" alignItems="center">
                  <div className="mr-2 h-6 w-6 rounded-full bg-red-500" />
                  <Text size="xxl" fontWeight="bold">
                    0
                  </Text>
                </Box>
              </Box>
              <Box>
                <Text size="xs" className="text-grey-600">
                  BALANCE: 0 GGP-AVAX
                </Text>
              </Box>
            </Content>
          </Card>
          <Card
            width="auto"
            rounded="4"
            p="0"
            backgroundColor="grey.100"
            mb="2"
          >
            <Content>
              {
                // I am not sure what to call this section. Need advice on component name
              }
              <Accordion allowToggle>
                <AccordionItem borderWidth="0" _last={{ borderWidth: "0" }}>
                  <AccordionButton p="1rem 1.5rem">
                    <Text flex="1" textAlign="left" size="md" fontWeight="bold">
                      Liquid Staking Statistics
                    </Text>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel p="1rem 1.5rem">
                    <Box gap="0.25rem">
                      {statisticData.map(({ label, value }) => (
                        <Box
                          display="flex"
                          flexDir="row"
                          justifyContent="space-between"
                        >
                          <Text
                            size="sm"
                            color="grey.600"
                            display="flex"
                            flexDir="row"
                            alignItems="center"
                          >
                            {label}
                          </Text>
                          <Text size="sm" fontWeight="bold">
                            {value}
                          </Text>
                        </Box>
                      ))}
                    </Box>
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
