import { Box, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

import { NavigationBar } from "@/modules/components/NavigationBar";
import { MenuItemType } from "@/types/shared";

import Sidebar from "./Sidebar";

type SidebarLayoutProps = {
  menu: MenuItemType[];
  header: ReactNode;
};

export const SidebarLayoutHOC =
  ({ menu, header }: SidebarLayoutProps) =>
  ({ children }) => {
    return (
      <div className="relative h-full min-h-full">
        <NavigationBar />
        <Flex maxH="calc(100vh - 58px)">
          <Sidebar header={header} menuItems={menu} />
          <Box className="grow overflow-y-scroll">{children}</Box>
        </Flex>
      </div>
    );
  };
