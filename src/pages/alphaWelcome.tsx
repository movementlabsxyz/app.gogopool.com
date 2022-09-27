import { Center, Divider, HStack, Link, Text, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";

import { Card, Title } from "@/common/components/Card";
import { PageHead } from "@/common/components/PageHead";
import { AddggAVAX, AddGGP } from "@/modules/components/AddToken";
import ANRNodeID from "@/modules/components/ANRNodeID";
import NodeStatistics from "@/modules/components/NodeStatistics";

const AlphaWelcome: NextPage = () => {
  return (
    <>
      <PageHead
        append={false}
        description="Welcome to the Alpha!"
        name="Welcome to the Alpha!"
      />
      <Center>
        <VStack spacing={2} style={{ marginTop: 12 }} maxW="800px">
          <Text fontSize={36} fontWeight="bold">
            Welcome to the Alpha!
          </Text>
          <Divider />
          <Text fontSize={18}>
            We are very excited to have you join the first-ever GGP network.
          </Text>
          <Text fontWeight={"bold"} fontSize={12}>
            The Alpha is a pre-release version of the GGP network. It is not
            intended for production use.
          </Text>
          <Divider />
          <Text fontSize={24} fontWeight="bold">
            Getting Started
          </Text>
          <Text textAlign="center" fontSize={18}>
            To get started, you will need{" "}
            <Link href="https://metamask.io">MetaMask</Link>. You're welcome to
            try any other wallets, however we will only officially support
            Metamask for the duration of our Alpha!
          </Text>
          <Text fontSize={18}>
            Next, you will need to our network to your wallet.{" "}
          </Text>{" "}
          <Text fontSize={18}>
            {" "}
            Adding our network is as easy as connecting your wallet with the
            button above!{" "}
          </Text>{" "}
          <Divider />
          <Text fontSize={24} fontWeight="bold">
            Adding the Tokens
          </Text>
          <Text fontSize={18}>
            Next, click the buttons below to add the tokens to your wallet!
          </Text>
          <HStack spacing={2}>
            <AddGGP />
            <AddggAVAX />
          </HStack>
          <Text fontSize={18}>
            {" "}
            After doing that, head over to the{" "}
            <Link href="https://anr-ggp-faucet.fly.dev/">GGP Faucet</Link> to
            add some funds!{" "}
          </Text>
          <Divider />
          <Text fontSize={24} fontWeight="bold">
            Liquid Staking
          </Text>
          <Text fontSize={18}>
            For Liquid Staking, see our{" "}
            <Link href="https://docs.gogopool.com/readme/staking-with-gogopool/liquid-staking">
              Liquid Staking guide
            </Link>
            !
          </Text>
          <Divider />
          <Text fontSize={24} fontWeight="bold">
            Node Operators
          </Text>
          <Text fontSize={18}>
            For Node Operators, copy the node ID below and head over to our
            <Link href="https://docs.gogopool.com/readme/staking-with-gogopool/running-a-gogopool-node/registering-a-gogopool-node">
              {" "}
              Node Operator guide
            </Link>
            !
          </Text>
          <div>
            <Card marginTop={12} border="1px">
              <Title fontSize={24}>Test Node ID</Title>
              <ANRNodeID />
            </Card>
          </div>
          <Card border="1px">
            <Title fontSize={24}>Node Statistics</Title>
            <Center>
              <NodeStatistics />
            </Center>
          </Card>
        </VStack>
      </Center>
    </>
  );
};

export default AlphaWelcome;
