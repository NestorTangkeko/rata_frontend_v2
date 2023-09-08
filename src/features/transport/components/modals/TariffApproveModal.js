import React from 'react'
import Modal from 'components/Modal';
import { Button,Flex, ModalBody } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { useSelector } from 'react-redux';
import { getTariffState } from 'lib/redux';
import {useBulkApproveTariffMutation} from 'lib/redux/api/tariff.api.slice';
import { Table } from 'components/table';
import { toast } from 'react-toastify';
function TariffApproveModal({
    isOpen,
    onClose
}) {
    const [approveTariffs, {isLoading}] = useBulkApproveTariffMutation();
    const {selectedRows} = useSelector(getTariffState);
    const columnHelper = createColumnHelper();
    const columns = React.useMemo(() => [
        columnHelper.accessor('tariff_id',{
            header:'Tariff ID',
        }),
        
        columnHelper.accessor('tariff_desc',{
            header:'Description'
        }),
        
        columnHelper.accessor('tariff_status',{
            header:'Status'
        }),
    ],[])

    const handleApprove = async() =>{
        await approveTariffs(selectedRows)
        .unwrap().then(result => {
            toast.success('Success')
            onClose();
        })
    }
   
    return (
        <Modal title='Approve Tariffs' size='50%' isOpen={isOpen} onClose={onClose}>
            <ModalBody>
                <Flex direction={'column'} gap={'2'}>
                    <Flex justify={'flex-end'}>
                        <Button colorScheme='orange' isLoading={isLoading} onClick={handleApprove}>Approve</Button>
                    </Flex>
                    <Table
                        columns={columns}
                        data={selectedRows}
                    />
                </Flex>  
            </ModalBody>
            
        </Modal>
    )
}

export default TariffApproveModal