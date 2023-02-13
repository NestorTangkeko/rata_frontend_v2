import React from 'react';
import {SubHeader, Container} from 'layouts';
import {useDisclosure} from '@chakra-ui/react';
import {Button} from '@chakra-ui/react';
import TransmittalModal from '../components/modals/TransmittalModal';
import {useCheckAccess} from 'hooks';

const Transmittal = () => {
    const hasAccess = useCheckAccess({header_id:'transport_operations'})
    const transmittalDisclosure = useDisclosure();

    return (<>
        <SubHeader title={'Transport Transmittal'}>
			  <Button onClick={transmittalDisclosure.onOpen} hidden={!hasAccess.create}>Transmittal</Button>
        </SubHeader>
        <Container>
			
        </Container>
        <TransmittalModal isOpen={transmittalDisclosure.isOpen} onClose={transmittalDisclosure.onClose}/>
    </>
  )
}

export default Transmittal