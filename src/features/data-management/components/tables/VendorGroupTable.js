import React from 'react';
import {Paginated} from 'components/table';
import {Button} from '@chakra-ui/react';
import {createColumnHelper} from '@tanstack/react-table';

const VendorGroupTable = ({goToDetails,hasEdit}) => {
    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor('vg_code',{
            header:'Vendor Group',
            cell:props => {
                const data = props.getValue();
                const handleClick = () => {
                    goToDetails(data)
                }
                return <Button variant='link' colorScheme={'blue'} size='xs' onClick={handleClick}>{data}</Button>
            }
        }),
        columnHelper.accessor('vg_desc',
        {
            header:'Description'
        }),
        columnHelper.accessor('vg_status',{
            header:'Status'
        }),
        columnHelper.accessor('location',{
            header:'Location'
        }),
    ]
    return (
        <Paginated
            title='Vendor Groups'
            route='/v2/data-management/vendor-groups'
            columns={columns}
        />
    )
}

export default VendorGroupTable