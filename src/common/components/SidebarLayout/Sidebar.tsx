import { Box, BoxProps, Flex, FlexProps, Link, Text } from "@chakra-ui/react";
import Image from "next/image";
import { ReactNode } from "react";

import { IconType, MenuItemType } from "@/types/shared";

interface SidebarProps extends BoxProps {
  onClose?: () => void;
  header: ReactNode;
  menuItems: MenuItemType[];
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  url: string;
  children: ReactNode;
  isActive: boolean;
}

const NavItem = ({ icon, isActive, children, url, ...rest }: NavItemProps) => {
  return (
    <Link
      href={url}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        paddingLeft={6}
        alignItems="center"
        cursor="pointer"
        height={10}
        fontWeight={isActive ? "bold" : "normal"}
        background={isActive ? "#00000040" : ""}
        _hover={{ background: "#00000040", fontWeight: "bold" }}
        {...rest}
      >
        {icon({ className: "mr-4", stroke: "white" })}
        {children}
      </Flex>
    </Link>
  );
};

const Sidebar = ({ header, menuItems, ...rest }: SidebarProps) => {
  const activeMenuIndex = 0

  return (
    <Flex
      color="white"
      justifyContent="space-between"
      direction="column"
      minW="312px"
      bg="blue.500"
      h="calc(100vh - 58px)"
      display={{ base: "none", md: "flex" }}
      w={{ base: "none", md: "312px" }}
      {...rest}
    >
      <Box>
        <Text padding={6} fontWeight="medium">
          {header}
        </Text>
        {menuItems.map((link, index) => (
          <NavItem
            key={link.name}
            icon={link.icon}
            url={link.url}
            isActive={activeMenuIndex === index}
          >
            {link.name}
          </NavItem>
        ))}
      </Box>
      <Flex justifyContent="center" marginBottom={8}>
        <Image src="/assets/images/balloon_menu.png" width={210} height={238} />
      </Flex>
    </Flex>
  );
};

export default Sidebar;
