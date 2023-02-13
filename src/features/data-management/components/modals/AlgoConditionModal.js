import React from 'react';
import Modal from 'components/Modal';
import {Flex} from '@chakra-ui/react';

const AlgoConditionModal = ({
    isOpen,
    onClose
}) => {
  return (
    <Modal title='Condition Builder' isOpen={isOpen} onClose={onClose} size='80%'>
        <Flex direction={'column'} gap='2'>
        </Flex>
    </Modal>
  )
}

export default AlgoConditionModal