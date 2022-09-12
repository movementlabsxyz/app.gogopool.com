import { Divider, Link, Text, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";

import { Card, Title } from "@/common/components/Card";
import { PageHead } from "@/common/components/PageHead";
import ANRNodeID from "@/modules/components/ANRNodeID";

const AlphaWelcome: NextPage = () => {
  return (
    <>
      <PageHead
        append={false}
        description="Welcome to the Alpha!"
        name="Welcome to the Alpha!"
      />
      <VStack spacing={2} style={{ marginTop: 12 }}>
        <Text fontSize={36} fontWeight="bold">
          Welcome to the Alpha!
        </Text>
        <Divider width="50%" />
        <Text fontSize={18}>
          We are very excited to have you join the first-ever GGP network.
        </Text>
        <Text fontWeight={"bold"} fontSize={12}>
          The Alpha is a pre-release version of the GGP network. It is not
          intended for production use.
        </Text>
        <Divider width="50%" />
        <Text fontSize={36} fontWeight="bold">
          Getting Started
        </Text>
        <Text fontSize={18}>
          For Liquid Staking, see our{" "}
          <Link
            href="https://docs.gogopool.com/readme/staking-with-gogopool/liquid-staking"
            fontWeight="semibold"
            color="blue.400"
          >
            Liquid Staking guide
          </Link>
          !
        </Text>
        <Text fontSize={18}>
          For Node Operators, copy the node ID below and head over to our
          <Link
            href="https://docs.gogopool.com/readme/staking-with-gogopool/running-a-gogopool-node/registering-a-gogopool-node"
            fontWeight="semibold"
            color="blue.400"
          >
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
        {/* <Card border="1px">
          <Title fontSize={24}>Node Statistics</Title>
          <Center>
            <NodeStatistics />
          </Center>
        </Card> */}
      </VStack>
    </>
  );
};

export default AlphaWelcome;
