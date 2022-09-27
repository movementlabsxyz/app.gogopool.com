import { useToast } from "@chakra-ui/react";

import { Button, ButtonProps } from "@/common/components/Button";
import useTokenggAVAXContract from "@/hooks/contracts/tokenggAVAX";
import addToken from "@/utils/addToken";

const AddggAVAX = (props: ButtonProps) => {
  const toast = useToast();
  const { address } = useTokenggAVAXContract();

  const handleAddToken = () => {
    if (address) {
      const success = addToken(address, "ggAVAX");
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
      Add ggAVAX
    </Button>
  );
};

export default AddggAVAX;
