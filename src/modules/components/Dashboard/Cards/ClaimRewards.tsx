import { Divider, Flex, Spacer, Text, useToken } from "@chakra-ui/react";
import ms from "ms";
import { ClimbingBoxLoader } from "react-spinners";

import { Button } from "@/common/components/Button";
import { Card, Content, Title } from "@/common/components/Card";
import { Tooltip } from "@/common/components/Tooltip";

export interface ClaimRewardsProps {
  nextClaimTime: Date;
  claimIntervalTime: number;
  isLoading?: boolean;
  userCanClaim?: boolean;
  openClaimModal: () => void;
}

const ClaimRewards = ({
  nextClaimTime,
  claimIntervalTime,
  isLoading = false,
  openClaimModal,
  userCanClaim = false,
}: ClaimRewardsProps) => {
  const claimTooltipContent = (
    <Flex>
      <span>You have no rewards available.</span>
    </Flex>
  );
  return (
    <Card
      border={"1px solid"}
      borderRadius={10}
      display="flex"
      flexDirection="column"
      width="30rem"
    >
      <Title fontSize={"2xl"}>Next Reward Cycle</Title>{" "}
      {isLoading && (
        <Content>
          <ClimbingBoxLoader color={useToken("color", "blue.400")} />
        </Content>
      )}
      {!isLoading && (
        // is there someway to get the total amount of rewards
        // that a person has received. in ggp rewards
        <Content>
          <Flex gap={8}>
            <Flex gap={1.5} justifyContent="left" flexDir="column">
              <Text>
                Next Claim:{" "}
                <b>
                  {nextClaimTime.toLocaleDateString("en-us", {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}{" "}
                </b>
              </Text>
              <Divider />
              <Text>
                Claim Duration: <b>{ms(claimIntervalTime, { long: true })}</b>
              </Text>
            </Flex>
            <Spacer />
            {!userCanClaim && (
              <Tooltip placement="top" content="No rewards available">
                <div>
                  <Button disabled={true} onClick={openClaimModal}>
                    Claim
                  </Button>
                </div>
              </Tooltip>
            )}
            {userCanClaim && <Button onClick={openClaimModal}>Claim</Button>}
          </Flex>
        </Content>
      )}{" "}
    </Card>
  );
};

export default ClaimRewards;
