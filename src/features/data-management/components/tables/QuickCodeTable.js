import React from 'react'
import {Paginated} from 'components/table';
import {createColumnHelper} from '@tanstack/react-table';

const QuickCodeTable = () => {
    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor('qc_type',{
            header:'Type',
        }),
        columnHelper.accessor('qc_code',{
            header:'Code'
        }),
        columnHelper.accessor('qc_name',{
            header:'Name'
        }),
        columnHelper.accessor('is_active',{
            header:'Is Active',
            cell: props => props.getValue() ? 'true' : 'false'
        }),
    ]

    return (
        <Paginated
            title={'Quick Codes'}
            route={'/v2/data-management/quick-code'}
            columns={columns}
        />
    )
}

export default QuickCodeTable