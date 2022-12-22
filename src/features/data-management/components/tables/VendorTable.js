import React from 'react';
import {Paginated} from 'components/table';
import {Button} from '@chakra-ui/react';
import {createColumnHelper} from '@tanstack/react-table';

const VendorTable = ({handleICModal}) => {
    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor('vendor_id',{
            header:'Vendor ID',
        }),
        columnHelper.accessor('vendor_description',
        {
            header:'Description'
        }),
        columnHelper.accessor('vendor_address',{
            header:'Address'
        }),
        columnHelper.accessor('vendor_status',{
            header:'Status'
        }),
        columnHelper.accessor('ascii_vendor_code',{
            header:'ASCII Code'
        }),
        columnHelper.accessor('is_ic',{
            header:'Is IC?',
            cell: props => {
                const isIC = props.getValue() === 1 ? true : false;
                const onClick = () => {
                    handleICModal({
                        is_ic: isIC,
                        vendor_id: props.row.original.vendor_id
                    })
                }
                return (
                    <Button size='sm' colorScheme={isIC ? 'green' : 'gray'} onClick={onClick}>{isIC ? 'True' : 'False'}</Button>
                )
            }
        }),
    ]
    return (
        <Paginated
            title='Vendors'
            route='/v2/data-management/vendors'
            columns={columns}
        />
    )
}

export default VendorTable