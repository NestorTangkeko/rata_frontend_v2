import React from 'react';
import {SubHeader, Container} from 'layouts';
import { useDisclosure } from '@chakra-ui/react';
import TransmittalModal from '../components/modals/transmittalModal';
import {Button} from '@chakra-ui/react';
import {useCheckAccess} from 'hooks';

const Transmittal = () => {
    const hasAccess = useCheckAccess({header_id:'warehouse_operations'})
    const transmittalDisclosure = useDisclosure();
  
    return (<>
        <SubHeader title={'Warehouse Transmittal'}>
			<Button onClick={transmittalDisclosure.onOpen}>Transmittal</Button>
        </SubHeader>
        <Container>
			
        </Container>
        <TransmittalModal isOpen={transmittalDisclosure.isOpen} onClose={transmittalDisclosure.onClose}/>
    </>
  )
}

export default Transmittal