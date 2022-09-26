import { useToast } from "@chakra-ui/react";

import { Button, ButtonProps } from "@/common/components/Button";
import useTokenGGPContract from "@/hooks/contracts/tokenGGP";
import addToken from "@/utils/addToken";

const AddGGP = (props: ButtonProps) => {
  const toast = useToast();
  const { address } = useTokenGGPContract();

  const handleAddToken = () => {
    if (address) {
      const success = addToken(address, "GGP");
      if (!success) {
        toast({
          title: "Error",
          description: "Could not add token to wallet.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Error",
        description: "Could not add token to wallet.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Button {...props} onClick={handleAddToken}>
      Add GGP Token
    </Button>
  );
};

export default AddGGP;
