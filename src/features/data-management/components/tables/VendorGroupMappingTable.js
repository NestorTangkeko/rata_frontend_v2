import React from 'react';
import {IndeterminateCheckbox, Paginated} from 'components/table';
import {Button, Flex, useDisclosure} from '@chakra-ui/react';
import {createColumnHelper} from '@tanstack/react-table';
import { useUpdateDataMutation } from 'lib/redux/api/data.management.api.slice';
import { SubHeader } from 'layouts';
import { toast } from 'react-toastify';
import RemoveVendorGroupModal from '../modals/RemoveVendorGroupModal';

const VendorGroupMappingTable = ({data,hasEdit}) => {
    const columnHelper = createColumnHelper();
    const [updateVendor, {isLoading}] = useUpdateDataMutation()
    const [selected, setSelected] = React.useState([]);
    const removeModal = useDisclosure();
    
    const columns = [
        {
            id:'select',
            header:({table}) => (
                <IndeterminateCheckbox
                    {...{
                        isChecked: table.getIsAllRowsSelected(),
                        indeterminate: table.getIsSomeRowsSelected(),
                        onChange: table.getToggleAllRowsSelectedHandler(),
                    }}
                />
            ),
            cell:({row}) => (
                <IndeterminateCheckbox
                    {...{
                        isChecked: row.getIsSelected(),
                        disabled: !row.getCanSelect(),
                        indeterminate: row.getIsSomeSelected(),
                        onChange: row.getToggleSelectedHandler(),
                    }}
                />
            )
        },
        columnHelper.accessor('vg_vendor_id',{
            header:'Vendor',
        }),
        columnHelper.accessor('vg_vendor_desc',{
            header:'Description'
        }),
        columnHelper.accessor('location',{
            header:'Location'
        }),
        columnHelper.accessor('vg_vendor_status',{
            header:'Status'
        }),
        columnHelper.display({
            header:'Action',
            cell: props => {
                const row = props.row.original;
                return <Flex direction={'column'}>
                    <Button size={'xs'} colorScheme='red' isLoading={isLoading} onClick={() => handleRemoveVendorRow([row])} isDisabled={!hasEdit}>Remove</Button>
                </Flex>
            }
                
        })
    ]

    const getSelectedRows = React.useCallback((rows = []) => {
        setSelected(rows);
    },[])

    const handleRemoveVendorRow = (vendors) => {
        getSelectedRows(vendors)
        handleOpenModal();
    }
    
    const handleOpenModal = () => {
        removeModal.onOpen();
    }

    const handleRemoveVendors = async (payload) => {

        if (!payload) {
            return removeModal.onClose();
        }
        
        await updateVendor({
            route: `vendor-groups/mapping/${data}`,
            body: payload,
        })
        .unwrap()
        .then(result => {
            console.log(result);
            toast.success('Success!')
            removeModal.onClose()
        })
    }

    return (
        <>
            <RemoveVendorGroupModal isOpen={removeModal.isOpen} onClose={handleRemoveVendors} isLoading={isLoading} data={selected} />
            <Paginated
                title='Vendors'
                route={`/v2/data-management/vendor-groups/mapping/${data}`}
                columns={columns}
                selectedRows={getSelectedRows}
            />
            {selected.length > 0 && <SubHeader title={''}>
                <Button size={'sm'} colorScheme='red' onClick={handleOpenModal} isDisabled={!hasEdit}>Remove Vendors</Button>
            </SubHeader>}
        </>
    )
}

export default VendorGroupMappingTable