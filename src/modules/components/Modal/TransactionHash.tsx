import { CopyIcon } from "@chakra-ui/icons";
import { Flex, Text, useToast } from "@chakra-ui/react";
import { shortenTransactionHash } from "@usedapp/core";

export const TransactionHash = ({ transactionHash }) => {
  const toast = useToast();

  const copyTransaction = () => {
    navigator.clipboard.writeText(transactionHash);
    toast({
      description: "Copied!",
      status: "info",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <div>
      <Flex
        direction={"row"}
        justify="center"
        pt={2}
        gap={2}
        onClick={copyTransaction}
      >
        <Flex direction={"row"} justify="center" pt={2}>
          <Text>Transaction hash:&nbsp;</Text>
          <Text textAlign="center" color="blue" style={{ cursor: "pointer" }}>
            {" "}
            {shortenTransactionHash(transactionHash)}
          </Text>
        </Flex>
        <div style={{ paddingTop: "5px", cursor: "pointer" }}>
          <CopyIcon />
        </div>
      </Flex>
    </div>
  );
};
