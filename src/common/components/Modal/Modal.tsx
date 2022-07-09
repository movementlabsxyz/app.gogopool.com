import {
  Modal as ChakraModal,
  ModalBody as ChakraModalBody,
  ModalBodyProps,
  ModalContent,
  ModalFooter,
  ModalHeader as ChakraModalHeader,
  ModalHeaderProps,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import { FunctionComponent, PropsWithChildren, ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  headerImage?: ReactNode;
  ctaButton?: ReactNode;
}

export const Modal: FunctionComponent<PropsWithChildren<ModalProps>> = ({
  isOpen,
  onClose,
  children,
  headerImage,
  ctaButton,
}) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxWidth="465px" mt="auto" mb="auto">
        {headerImage && <VStack>{headerImage}</VStack>}
        {children}
        {ctaButton && (
          <ModalFooter p="0" gap="4">
            {ctaButton}
          </ModalFooter>
        )}
      </ModalContent>
    </ChakraModal>
  );
};

export const ModalHeader: FunctionComponent<ModalHeaderProps> = ({
  children,
  ...rest
}) => {
  return (
    <ChakraModalHeader p="0 0 8px 0" {...rest}>
      {children}
    </ChakraModalHeader>
  );
};

export const ModalBody: FunctionComponent<ModalBodyProps> = ({
  children,
  ...rest
}) => {
  return (
    <ChakraModalBody p="0 0 24px 0" {...rest}>
      {children}
    </ChakraModalBody>
  );
};

const _default = Object.assign(Modal, { ModalHeader, ModalBody });

export default _default;
