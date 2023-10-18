import React from 'react';
import {SubHeader,Container} from 'layouts';
import DraftBillTable from '../../components/tables/DraftBillTable';
import { Button, useDisclosure } from '@chakra-ui/react';
import DraftBillModal from 'features/transport/components/modals/DraftBillModal';
import DraftBillExport from 'features/transport/components/modals/DraftBillExport';
import {useCheckAccess} from 'hooks'

const DraftBill = () => {
    const hasAccess = useCheckAccess({header_id:'transport_operations'})
    const {isOpen,onClose,onOpen} =useDisclosure();
    const exportModal = useDisclosure();
    const [draftBillDetails, setDraftBillDetails] = React.useState(null)

    const handleGetDetails = (data) => {
        setDraftBillDetails(data)
        onOpen()
    }

    

    return (
        <>
            <SubHeader title={'Draft Bills'}>
                <Button 
                    hidden={!hasAccess.export}
                    colorScheme='orange'
                    onClick={exportModal.onOpen}
                >
                    Export
                </Button>
                {/* <DataExport
                    hidden={!hasAccess.export}
                    route={'/transport/draft-bill'}
                /> */}
            </SubHeader>
            <Container>
                <DraftBillTable 
                    handleGetDetails = {handleGetDetails}
                />

            </Container>
            <DraftBillModal isOpen={isOpen} onClose={onClose} data={draftBillDetails}/>
            <DraftBillExport isOpen={exportModal.isOpen} onClose={exportModal.onClose}/>
        </>
    )
}

export default DraftBill