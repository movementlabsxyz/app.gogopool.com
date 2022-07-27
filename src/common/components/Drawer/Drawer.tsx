import {
  Drawer as ChakraDrawer,
  DrawerBody as ChakraDrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader as ChakraDrawerHeader,
  DrawerOverlay,
  DrawerProps as ChakraDrawerProps,
  ModalBodyProps as DrawerBodyProps,
  ModalHeaderProps as DrawerHeaderProps,
  VStack,
} from "@chakra-ui/react";
import { FunctionComponent, ReactNode } from "react";

export interface DrawerProps extends ChakraDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  headerImage?: ReactNode;
  ctaButton?: ReactNode;
}

export const Drawer: FunctionComponent<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  headerImage,
  ctaButton,
  ...rest
}) => {
  return (
    <ChakraDrawer
      placement="bottom"
      isOpen={isOpen}
      onClose={onClose}
      {...rest}
    >
      <DrawerOverlay />
      <DrawerContent>
        {headerImage && <VStack>{headerImage}</VStack>}

        {children}
        {ctaButton && (
          <DrawerFooter p="0" gap="4">
            {ctaButton}
          </DrawerFooter>
        )}
      </DrawerContent>
    </ChakraDrawer>
  );
};

export const DrawerHeader: FunctionComponent<DrawerHeaderProps> = ({
  children,
  ...rest
}) => {
  return (
    <ChakraDrawerHeader p="0 0 8px 0" {...rest}>
      {children}
    </ChakraDrawerHeader>
  );
};

export const DrawerBody: FunctionComponent<DrawerBodyProps> = ({
  children,
  ...rest
}) => {
  return (
    <ChakraDrawerBody p="0 0 24px 0" {...rest}>
      {children}
    </ChakraDrawerBody>
  );
};

const _default = Object.assign(Drawer, { DrawerHeader, DrawerBody });

export default _default;
