import React from 'react';
import {SubHeader, Container} from 'layouts';
import {useDisclosure} from '@chakra-ui/react';
import {Button} from '@chakra-ui/react';
import TransmittalModal from '../components/modals/TransmittalModal';

const Transmittal = () => {
    const transmittalDisclosure = useDisclosure();

    return (<>
        <SubHeader title={'Transport Transmittal'}>
			<Button onClick={transmittalDisclosure.onOpen}>Transmittal</Button>
        </SubHeader>
        <Container>
			
        </Container>
        <TransmittalModal isOpen={transmittalDisclosure.isOpen} onClose={transmittalDisclosure.onClose}/>
    </>
  )
}

export default Transmittal