import { Box, Flex, Text, useTheme } from "@chakra-ui/react";
import { useState } from "react";

import { Button } from "@/common/components/Button";
import {
  NodeOperatorIcon,
  PlayButtonIcon,
  RewardIcon,
} from "@/common/components/CustomIcon";
import { PageHead } from "@/common/components/PageHead";
import { SidebarLayoutHOC } from "@/common/components/SidebarLayout";
import { Wizard } from "@/modules/components/Wizard";

function NodeOperator() {
  const theme = useTheme();
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
      </Flex>
      <Wizard currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <Flex
        mb="80px"
        mt={{ base: 0, md: "100px" }}
        justifyContent={{ base: "center", md: "space-between" }}
        direction={{ base: "column", md: "row" }}
      >
        {/* I'm not sure we need these. - Chandler 
        <Button
          disabled
          onClick={() => setCurrentStep((s) => s - 1)}
          _disabled={{
            boxShadow: `inset 0 0 0 2px ${theme.colors.blue[500]}`,
            opacity: 0.4,
          }}
          variant="secondary-outline"
          w={{ base: "full", md: "144px" }}
          mt={{ base: 8, md: 0 }}
        >
          <Text>Previous</Text>
        </Button>
        <Button
          disabled
          onClick={() => setCurrentStep((s) => s + 1)}
          variant="secondary-outline"
          w={{ base: "full", md: "144px" }}
          mt={{ base: 6, md: 0 }}
        >
          <Text>Next</Text>
        </Button> */}
      </Flex>
    </Box>
  );
}

const menu = [
  { name: "New GGP Node", icon: NodeOperatorIcon, url: "/nodeoperator" },
  { name: "GGP Reward", icon: RewardIcon, url: "/ggpreward" },
];

const Layout = SidebarLayoutHOC({ header: "Welcome Node Operator! 👋🏼", menu });

NodeOperator.layout = Layout;

export default NodeOperator;
