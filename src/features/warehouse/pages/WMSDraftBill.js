import React from 'react';
import {SubHeader,Container} from 'layouts';
import { useDisclosure } from '@chakra-ui/react';
import DraftBillTable from '../components/table/DraftBillTable';

import DraftBillModal from '../components/modals/DraftBillModal';

const WMSDraftBill = () => {
    const {isOpen,onClose,onOpen} =useDisclosure();
    const [draftBillDetails, setDraftBillDetails] = React.useState(null)

    const handleGetDetails = (data) => {
        console.log(data)
        setDraftBillDetails(data)
        onOpen()
    }
    
    return (<>
        <SubHeader title={'Warehouse Draft Bills'}>
            </SubHeader>
            <Container>
                <DraftBillTable
                    handleGetDetails = {handleGetDetails}
                />
            </Container>
            <DraftBillModal isOpen={isOpen} onClose={onClose} data={draftBillDetails}/>
        </>
    )
}

export default WMSDraftBill