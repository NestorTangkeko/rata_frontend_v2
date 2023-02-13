import React from 'react';
import Modal from 'components/Modal';
import { Flex} from '@chakra-ui/react';
import AlgorithmInfo from '../AlgorithmInfo';
import AlgoDetailTable from '../tables/AlgoDetailTable';


const AlgoModal = ({
    header,
    details,
    isOpen,
    onClose
}) => {
  return (
    <Modal title='Algorithm Details' isOpen={isOpen} onClose={onClose} size='50%'>
        <Flex direction={'column'} gap='2'>
            <AlgorithmInfo data={header}/>
            <AlgoDetailTable data={details}/>
        </Flex>
    </Modal>
  )
}

export default AlgoModal