import React from 'react';
import {SubHeader, Container} from 'layouts';
import {useDisclosure} from '@chakra-ui/react';
import {Button} from '@chakra-ui/react';
import TransmittalModal from '../components/modals/TransmittalModal';
import {useCheckAccess} from 'hooks';
import AsciiTable from '../components/tables/AsciiTable';
import TransmittalExport from '../components/modals/TransmittalExport';

const Transmittal = () => {
    const hasAccess = useCheckAccess({header_id:'transport_operations'})
    const transmittalDisclosure = useDisclosure();
    const reTransmitDiscolosure = useDisclosure();
    const exportDisclosure = useDisclosure();

    return (<>
        <SubHeader title={'Transport Transmittal'}>
          <Button colorScheme='orange' onClick={exportDisclosure.onOpen}>Export</Button>
			    <Button colorScheme='orange' onClick={transmittalDisclosure.onOpen} hidden={!hasAccess.create}>Transmit Draft Bills</Button>
          <Button colorScheme='orange' onClick={reTransmitDiscolosure.onOpen} hidden={!hasAccess.create}>Retransmit</Button>
        </SubHeader>
        <Container>
          <AsciiTable/>
        </Container>
        <TransmittalModal isOpen={transmittalDisclosure.isOpen} onClose={transmittalDisclosure.onClose} isRetransmit='false'/>
        <TransmittalModal isOpen={reTransmitDiscolosure.isOpen} onClose={reTransmitDiscolosure.onClose} isRetransmit='true'/>
        <TransmittalExport isOpen={exportDisclosure.isOpen} onClose={exportDisclosure.onClose}/>
    </>
  )
}

export default Transmittal