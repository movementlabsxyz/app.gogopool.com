import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import { formatUnits } from "ethers/lib/utils";
import Image from "next/image";

import { Button } from "@/common/components/Button";
import { Modal } from "@/common/components/Modal";
import { useGetClaimRewardsAmount } from "@/hooks/useNOPClaim";

export const ClaimRewardsModal = ({
  status,
  ownerAddress,
  isOpen,
  onClose,
  ...modalProps
}) => {
  const { data: rewardAmt } = useGetClaimRewardsAmount(ownerAddress);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      headerImage={
        <Box width="98px" height="98px" mb="8">
          <Image
            src={"/assets/img/token/ggp.svg"}
            width={178}
            height={98}
            alt={`${status}_image`}
          />
        </Box>
      }
      {...modalProps}
    >
      <Flex gap={2} direction="column" align="center">
        <Text textAlign="center" fontSize="xl" fontWeight="semibold">
          Rewards Period: previous period here
        </Text>
        <Text textAlign="center" fontSize="2xl" fontWeight="semibold">
          Reward Amount:{" "}
          {Number(formatUnits(rewardAmt || 0))
            .toFixed(2)
            .toLocaleString()}
        </Text>
        <Spacer />
        <Flex gap={2} direction="row" align="center">
          <Button variant="destructive-outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onClose}>
            Claim
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};
