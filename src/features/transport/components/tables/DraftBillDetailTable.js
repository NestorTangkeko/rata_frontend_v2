import React from 'react'
import {createColumnHelper} from '@tanstack/react-table';
import {Table} from 'components/table'

const DraftBillDetailTable = ({data}) => {
    const columnHelper = createColumnHelper();
    const columns = [
        columnHelper.accessor('draft_bill_no'),
        columnHelper.accessor('tms_reference_no'),
        columnHelper.accessor('delivery_date'),
        columnHelper.accessor('location'),
        columnHelper.accessor('trip_plan'),
        columnHelper.accessor('shipment_manifest'),
        columnHelper.accessor('dr_no'),
        columnHelper.accessor('invoice_no'),
        columnHelper.accessor('delivery_status'),
        columnHelper.accessor('vehicle_type'),
        columnHelper.accessor('planned_vehicle_type'),
        columnHelper.accessor('tariff_id'),
        columnHelper.accessor('contract_id'),
        columnHelper.accessor('service_type'),
        columnHelper.accessor('sub_service_type'),
        columnHelper.accessor('min_billable_value'),
        columnHelper.accessor('max_billable_value'),
        columnHelper.accessor('min_billable_unit'),
        columnHelper.accessor('class_of_store'),
        columnHelper.accessor('ship_from'),
        columnHelper.accessor('actual_qty'),
        columnHelper.accessor('actual_cbm'),
        columnHelper.accessor('billing_qty'),
        columnHelper.accessor('wms_reference_no'),
        columnHelper.accessor('fk_wms_reference_no'),
        columnHelper.accessor('billing')
    ]

    return (
        <>
            <Table
                title={'Draft Bill Details'}
                columns={columns}
                data={data}
            />
        </>
    )
}

export default DraftBillDetailTable