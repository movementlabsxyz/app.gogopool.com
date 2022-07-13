import { Flex } from "@chakra-ui/react";

import { NodeOperatorIcon, RewardIcon } from "@/common/components/CustomIcon";
import { PageHead } from "@/common/components/PageHead";
import { SidebarLayoutHOC } from "@/common/components/SidebarLayout";
import { Wizard } from "@/modules/components/Wizard";

function Dashboard() {
  return (
    <Flex h="full" bg="#FF21130D" alignItems="center" justifyContent="center">
      <PageHead
        append={false}
        description="Node Operator description"
        name="Node Operator"
      />
      <Wizard />
     
    </Flex>
  );
}

const menu = [
  { name: "Node Operator", icon: NodeOperatorIcon, url: "/dashboard" },
  { name: "GGP Reward", icon: RewardIcon, url: "/dashboard" },
];

const Layout = SidebarLayoutHOC({ header: "Welcome Node Operator! 👋🏼", menu });

Dashboard.layout = Layout;

export default Dashboard;