import React from 'react'

import { Button, useDisclosure } from '@chakra-ui/react'
import { Container, SubHeader } from 'layouts'
import JVCreationTable from '../components/table/JVCreationTable';


const JVReversal = () => {
    const {onClose,isOpen,onOpen} = useDisclosure();
    const exportDisclosure = useDisclosure();

    return (<>
        <SubHeader title={'JV Creation'}>
            <Button size={'sm'} colorScheme='orange' onClick={()=>{}}>
                Generate
            </Button>
        </SubHeader>
        <Container>
            <JVCreationTable/>
        </Container>
    </>
  )
}

export default JVReversal