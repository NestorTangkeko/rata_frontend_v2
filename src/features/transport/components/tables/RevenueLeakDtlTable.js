import React from 'react'
import {createColumnHelper} from '@tanstack/react-table';
import {Table} from 'components/table'

const RevenueLeakDtlTable = ({data,header}) => {
    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor('trip_no',{
            header:'Trip No',
        }),

        columnHelper.accessor('br_no',{
            header:'BR No',
        }),

        columnHelper.accessor('class_of_store',{
            header:'Class of Store',
        }),
        columnHelper.accessor('uom',{
            header:'UOM',
        }),

        columnHelper.accessor('planned_qty',{
            header:'Planned Qty',
        }),

        columnHelper.accessor('planned_weight',{
            header:'Planned Weight',
        }),
        columnHelper.accessor('planned_cbm',{
            header:'Planned CBM',
        }),

        columnHelper.accessor('actual_qty',{
            header:'Actual Qty',
        }),

        columnHelper.accessor('actual_weight',{
            header:'Actual Weight',
        }),
        columnHelper.accessor('actual_cbm',{
            header:'Actual CBM',
        }),

        columnHelper.accessor('return_qty',{
            header:'Return Qty',
        }),
    ]

    return (
        <>
            <Table
                title={'Revenue Leak Details'}
                data={data}
                columns={columns}
            />
        </>
    )
}

export default RevenueLeakDtlTable