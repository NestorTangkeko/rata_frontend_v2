import React from 'react'
import {createColumnHelper} from '@tanstack/react-table';
import {Table} from 'components/table'

const DraftBillDetailTable = ({data}) => {
    const columnHelper = createColumnHelper();
    const columns = [
        columnHelper.accessor('draft_bill_no'),
        columnHelper.accessor('transaction_date'),
        columnHelper.accessor('wms_reference_no'),
        columnHelper.accessor('location'),
        columnHelper.accessor('primary_ref_doc'),
        columnHelper.accessor('vehicle_type'),
        columnHelper.accessor('tariff_id'),
        columnHelper.accessor('contract_id'),
        columnHelper.accessor('service_type'),
        columnHelper.accessor('min_billable_value'),
        columnHelper.accessor('max_billable_value'),
        columnHelper.accessor('min_billable_unit'),
        columnHelper.accessor('class_of_store'),
        columnHelper.accessor('actual_qty'),
        columnHelper.accessor('actual_cbm'),
        columnHelper.accessor('billing')
    ]

    return (
        <>
            <Table
                title={'Warehouse Draft Bill Details'}
                columns={columns}
                data={data}
            />
        </>
    )
}

export default DraftBillDetailTable