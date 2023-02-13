import React from 'react';
import {SubHeader,Container} from 'layouts';
import DraftBillTable from '../../components/tables/DraftBillTable';
import { useDisclosure } from '@chakra-ui/react';
import DraftBillModal from 'features/transport/components/modals/DraftBillModal';
import DataExport from 'components/data-export';
import {useCheckAccess} from 'hooks'

const DraftBill = () => {
    const hasAccess = useCheckAccess({header_id:'transport_operations'})
    const {isOpen,onClose,onOpen} =useDisclosure();
    const [draftBillDetails, setDraftBillDetails] = React.useState(null)

    const handleGetDetails = (data) => {
        setDraftBillDetails(data)
        onOpen()
    }

    

    return (
        <>
            <SubHeader title={'Draft Bills'}>
                <DataExport
                    hidden={!hasAccess.export}
                    route={'/transport/draft-bill'}
                />
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

export default DraftBill