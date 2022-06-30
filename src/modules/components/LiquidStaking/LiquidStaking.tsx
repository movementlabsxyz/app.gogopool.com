import { Box, FormControl, Text } from "@chakra-ui/react";

import { Button } from "@/common/components/Button";
import { Card, Content, Footer, Title } from "@/common/components/Card";

import { StakeForm } from "./StakeForm";

export const LiquidStaking = () => {
  return (
    <Card>
      <Title>Liquid Staking</Title>
      <Content>
        <FormControl>
          <Card width="auto" rounded="4" backgroundColor="grey.100" mb="2">
            <Content>
              <StakeForm />
            </Content>
          </Card>
          <Card
            width="auto"
            rounded="4"
            p="1rem 1.5rem"
            backgroundColor="grey.100"
            mb="4"
          >
            <Content>
              <Box
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
            p="1rem 1.5rem"
            backgroundColor="grey.100"
            mb="2"
          >
            <Text size="md" fontWeight="bold">
              Liquid Staking Statistics
            </Text>
          </Card>
        </FormControl>
      </Content>
      <Footer>
        <Button full={true}>Connect wallet</Button>
      </Footer>
    </Card>
  );
};
