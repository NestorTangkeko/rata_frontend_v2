import React from 'react';
import {Modal as CIModal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    //ModalFooter,
    ModalBody,
    ModalCloseButton,
    Divider,
    //Button
} from '@chakra-ui/react';

const Modal = ({size,title,isOpen,onClose,children}) => {
  return (
    <CIModal closeOnEsc={false} closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay/>
        <ModalContent minWidth={size}>
          <ModalHeader>{title}</ModalHeader>
          {
            onClose ?  <ModalCloseButton /> : null
          }
          <Divider/>
          <ModalBody>
            {children}
          </ModalBody>
        </ModalContent>
    </CIModal>
  )
}

export default Modal