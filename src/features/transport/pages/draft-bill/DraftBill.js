import React from 'react';
import {SubHeader,Container} from 'layouts';
import DraftBillTable from '../../components/tables/DraftBillTable';
import { Button, useDisclosure } from '@chakra-ui/react';
import DraftBillModal from 'features/transport/components/modals/DraftBillModal';
import DraftBillExport from 'features/transport/components/modals/DraftBillExport';
import DraftBillExport2 from 'features/transport/components/modals/DraftBillExport2';
import {useCheckAccess} from 'hooks'

const DraftBill = () => {
    const hasAccess = useCheckAccess({header_id:'transport_operations'})
    const {isOpen,onClose,onOpen} =useDisclosure();
    const exportModal = useDisclosure();
    const [draftBillDetails, setDraftBillDetails] = React.useState(null)
    const [filters, setFilters] = React.useState([])

    const handleGetDetails = (data) => {
        setDraftBillDetails(data)
        onOpen()
    }

    const handleFilter = (filters) => {
        setFilters(filters)
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
                    handleFilter = { handleFilter }
                />

            </Container>
            <DraftBillModal isOpen={isOpen} onClose={onClose} data={draftBillDetails}/>
            <DraftBillExport2 isOpen={exportModal.isOpen} onClose={exportModal.onClose} filters={filters}/>
        </>
    )
}

export default DraftBill