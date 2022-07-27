import { Box, ButtonGroup, Text, useTheme } from "@chakra-ui/react";
import { useState } from "react";

import { MenuItemType } from "@/types/shared";

import { Button } from "../Button";

type MobileNavProps = {
  menuItems: MenuItemType[];
};

export const MobileNav = ({ menuItems }: MobileNavProps) => {
  const theme = useTheme();
  const [activeMenu, setActiveMenu] = useState("/nodeoperator");
  const NOT_ACTIVE_COLOR = theme.colors.grey[500];

  return (
    <Box
      display={{ base: "flex", md: "none" }}
      position="fixed"
      width="full"
      justifyContent="center"
      bottom={4}
      zIndex={999}
    >
      <ButtonGroup isAttached>
        {menuItems.map((menu) => {
          const isActive = activeMenu === menu.url;
          return (
            <Button
              key={menu.name}
              width={171}
              rounded="8px"
              bg={isActive ? null : "white"}
              boxShadow={`0 1px 2px ${NOT_ACTIVE_COLOR}`}
              variant={isActive ? "secondary-filled" : "secondary-outline"}
              onClick={() => setActiveMenu(menu.url)}
              leftIcon={menu.icon({
                stroke: isActive ? "white" : NOT_ACTIVE_COLOR,
              })}
            >
              <Text
                color={isActive ? null : "grey.500"}
                fontWeight={isActive ? "bold" : "normal"}
              >
                {menu.name}
              </Text>
            </Button>
          );
        })}
      </ButtonGroup>
    </Box>
  );
};
