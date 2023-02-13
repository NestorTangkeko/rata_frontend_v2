import React from 'react'
import {Paginated} from 'components/table';
import {createColumnHelper} from '@tanstack/react-table';

const PrincipalTable = () => {
    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor('principal_code',{
            header:'Principal Code',
        }),
        columnHelper.accessor('principal_name',{
            header:'Principal'
        }),
        columnHelper.accessor('description',{
            header:'Description'
        }),
        columnHelper.accessor('address',{
            header:'Address'
        }),
        columnHelper.accessor('ascii_principal_code',{
            header:'Ascii Code'
        }),
        columnHelper.accessor('is_active',{
            header:'Is Active',
            cell: props => props.getValue() ? 'true' : 'false'
        }),
    ]

    return (
        <Paginated
        title={'Principal'}
        route={'/v2/data-management/principal'}
        columns={columns}
     />
)
}

export default PrincipalTable