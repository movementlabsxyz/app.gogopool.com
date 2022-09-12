import { Box, Flex, HStack, Link } from "@chakra-ui/react";
import Image from "next/image";

import ConnectButton from "@/common/components/ConnectButton";

export const NavigationBar = () => {
  return (
    <Box
      p="0.75rem 1.5rem 0.75rem 1.5rem"
      borderBottomWidth="1px"
      borderBottomColor="#0000001A"
      bgColor="grey.0"
      h="70px"
    >
      <Flex alignItems="center" justifyContent="space-between">
        <HStack gap={6}>
          <Link href="/">
            <Image src={"/assets/img/nav/logo.svg"} width={118} height={32} />
          </Link>
          <HStack gap={2}>
            <Link href="/alphaWelcome" color="blue.400" fontWeight="bold">
              Welcome
            </Link>
            <Link
              href="https://docs.gogopool.com"
              color="blue.400"
              fontWeight="bold"
            >
              Docs
            </Link>
            <Link href="/liquidStaking" color="blue.400" fontWeight="bold">
              Liquid Staking
            </Link>
            <Link href="/nodeOperator" color="blue.400" fontWeight="bold">
              Node Operator
            </Link>
          </HStack>
        </HStack>

        <Flex alignItems="center">
          <ConnectButton />
        </Flex>
      </Flex>
    </Box>
  );
};
