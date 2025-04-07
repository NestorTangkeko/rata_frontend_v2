import React from 'react'

import { Button, useDisclosure } from '@chakra-ui/react'
import { Container, SubHeader } from 'layouts'
import SoTable from '../components/table/SoTable';
import UploadSoModal from '../components/modals/UploadSoModal';
import ExportSoModal from '../components/modals/ExportSoModal';


const SoUpload = () => {
    const {onClose,isOpen,onOpen} = useDisclosure();
    const exportDisclosure = useDisclosure();

    return (<>
        <SubHeader title={'Sales Order Upload'}>
            <Button size={'sm'} colorScheme='orange' onClick={onOpen}>
                Upload
            </Button>
            <Button size={'sm'} colorScheme='orange' onClick={exportDisclosure.onOpen}>
                Export
            </Button>
        </SubHeader>
        <Container>
            <SoTable/>
        </Container>
        <UploadSoModal isOpen={isOpen} onClose={onClose}/>
        <ExportSoModal isOpen={exportDisclosure.isOpen} onClose={exportDisclosure.onClose}/>
    </>
        
  )
}

export default SoUpload