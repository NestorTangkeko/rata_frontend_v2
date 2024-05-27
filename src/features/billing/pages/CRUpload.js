import { Button, useDisclosure } from '@chakra-ui/react'
import { Container, SubHeader } from 'layouts'
import React from 'react'
import UploadCRModal from '../components/modals/UploadCRModal'
import CRTable from '../components/table/CRTable'



const CRUpload = () => {
    const {onClose,isOpen,onOpen} = useDisclosure();
    

    return (<>
    <SubHeader title={'Confirmation Receipt Upload'}>
        <Button size={'sm'} colorScheme='orange' onClick={onOpen}>
            Upload
        </Button>
        <Button size={'sm'} colorScheme='orange'>
            Export
        </Button>
    </SubHeader>
    <Container>
        <CRTable/>
    </Container>  
    <UploadCRModal isOpen={isOpen} onClose={onClose}/>
  </>
  
  )
}

export default CRUpload