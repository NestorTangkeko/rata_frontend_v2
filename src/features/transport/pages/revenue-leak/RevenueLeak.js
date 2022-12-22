import React from 'react'
import {SubHeader,Container} from 'layouts';
import RevenueLeakTable from '../../components/tables/RevenueLeakTable';

import RevenueLeakDtlModal from 'features/transport/components/modals/RevenueLeakDtlModal';
import { useDisclosure, Button } from '@chakra-ui/react';
import ReplanModal from 'features/transport/components/modals/ReplanModal';


const RevenueLeak = () => {
    const detailsDisclosure = useDisclosure();
    const replanDisclosure = useDisclosure();
    const [selectedHeader, setDetails] = React.useState([])

    const handleOpen = (data) => {
        detailsDisclosure.onOpen()
        setDetails(data.details)
    }

    const handleOpenReplan = () => {
        replanDisclosure.onOpen();
    }

    return (
        <>
            <SubHeader title={'Revenue Leaks'}>
                <Button colorScheme={'orange'} onClick={handleOpenReplan}>Replan</Button>
            </SubHeader>
            <Container>
                <RevenueLeakTable handleOpen={handleOpen} />
                <RevenueLeakDtlModal isOpen={detailsDisclosure.isOpen} onClose={detailsDisclosure.onClose} data={selectedHeader}/>
                <ReplanModal isOpen={replanDisclosure.isOpen} onClose={replanDisclosure.onClose}/>
            </Container>
        </>  
    )
}

export default RevenueLeak