import { FunctionComponent, ReactNode } from 'react'

import {
  Modal as ChakraModal,
  ModalBody as ChakraModalBody,
  ModalHeader as ChakraModalHeader,
  ModalProps as ChakraModalProps,
  ModalBodyProps,
  ModalContent,
  ModalFooter,
  ModalHeaderProps,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react'

export interface ModalProps extends ChakraModalProps {
  isOpen: boolean
  onClose: () => void
  headerImage?: ReactNode
  ctaButton?: ReactNode
}

export const Modal: FunctionComponent<ModalProps> = ({
  children,
  ctaButton,
  headerImage,
  isOpen,
  onClose,
  ...rest
}) => {
  return (
    <ChakraModal isCentered isOpen={isOpen} onClose={onClose} {...rest}>
      <ModalOverlay />
      <ModalContent maxWidth="600px">
        {headerImage && <VStack>{headerImage}</VStack>}
        {children}
        {ctaButton && (
          <ModalFooter gap="4" p="0">
            {ctaButton}
          </ModalFooter>
        )}
      </ModalContent>
    </ChakraModal>
  )
}

export const ModalHeader: FunctionComponent<ModalHeaderProps> = ({ children, ...rest }) => {
  return (
    <ChakraModalHeader p="0 0 8px 0" {...rest}>
      {children}
    </ChakraModalHeader>
  )
}

export const ModalBody: FunctionComponent<ModalBodyProps> = ({ children, ...rest }) => {
  return (
    <ChakraModalBody p="0 0 24px 0" {...rest}>
      {children}
    </ChakraModalBody>
  )
}

const _default = Object.assign(Modal, { ModalHeader, ModalBody })

export default _default
