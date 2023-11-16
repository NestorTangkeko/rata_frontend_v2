import React from 'react'
import {SubHeader,Container} from 'layouts';
import RevenueLeakTable from '../../components/tables/RevenueLeakTable';

import RevenueLeakDtlModal from 'features/transport/components/modals/RevenueLeakDtlModal';
import { useDisclosure, Button } from '@chakra-ui/react';
import ReplanModal from 'features/transport/components/modals/ReplanModal';
import DataExport from 'components/data-export';
import {useLazyGetDetailsQuery} from 'lib/redux/api/leak.api.slice';
import {useCheckAccess} from 'hooks';

const RevenueLeak = () => {
    const hasAccess = useCheckAccess({header_id:'transport_operations'})
    const detailsDisclosure = useDisclosure();
    const replanDisclosure = useDisclosure();
    const [selectedHeader, setDetails] = React.useState([]);
    const [getDetails,{isLoading}] = useLazyGetDetailsQuery()

    const handleOpen = async (br_no) => {
        //console.log(br_no);
        await getDetails(br_no).unwrap().then(result => {
            setDetails(result)
            detailsDisclosure.onOpen()
        })    
    }

    const handleOpenReplan = () => {
        replanDisclosure.onOpen();
    }

    return (
        <>
            <SubHeader title={'Revenue Leaks'}>
                <DataExport hidden={!hasAccess.export} route={'transport/revenue-leak'}/>
                <Button hidden={!hasAccess.create} colorScheme={'orange'} onClick={handleOpenReplan}>Replan</Button>
            </SubHeader>
            <Container>
                <RevenueLeakTable handleOpen={handleOpen} />
                <RevenueLeakDtlModal isLoading={isLoading} isOpen={detailsDisclosure.isOpen} onClose={detailsDisclosure.onClose} data={selectedHeader}/>
                <ReplanModal isOpen={replanDisclosure.isOpen} onClose={replanDisclosure.onClose}/>
            </Container>
        </>  
    )
}

export default RevenueLeak