import { Box } from "@chakra-ui/react";
import { useState } from "react";

import { NodeOperatorIcon, RewardIcon } from "@/common/components/CustomIcon";
import { PageHead } from "@/common/components/PageHead";
import { SidebarLayoutHOC } from "@/common/components/SidebarLayout";
import { Wizard } from "@/modules/components/Wizard";

function NodeOperator() {
  const [currentStep, setCurrentStep] = useState<number>(1);

  return (
    <Box
      bg="#FF21130D"
      minH="full"
      p={{ base: 4, md: 6 }}
      pt={{ base: 0, md: 2 }}
    >
      <PageHead
        append={false}
        description="Node Operator description"
        name="Node Operator"
      />
      {/* A tutorial should be made. See issue #79 
      <Flex justifyContent="flex-end">
        <Button
          bg="white"
          leftIcon={<PlayButtonIcon />}
          size="xs"
          height={10}
          outline="2px solid #C6C6C6"
          margin="16px 0 32px 0"
        >
          <Text color="#686686" fontWeight={{ base: "normal", md: "bold" }}>
            Watch a quick tutorial
          </Text>
        </Button>
      </Flex> */}
      <Wizard currentStep={currentStep} setCurrentStep={setCurrentStep} />
    </Box>
  );
}

const menu = [
  { name: "New GGP Node", icon: NodeOperatorIcon, url: "/nodeOperator" },
  { name: "GGP Reward", icon: RewardIcon, url: "/ggpreward" },
];

const Layout = SidebarLayoutHOC({ header: "Welcome Node Operator! 👋🏼", menu });

NodeOperator.layout = Layout;

export default NodeOperator;
