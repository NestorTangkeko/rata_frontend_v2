import React from 'react'
import {createColumnHelper} from '@tanstack/react-table';
// import {Button} from '@chakra-ui/react';
import {Paginated} from 'components/table';

const InvoicesTable = () => {
    const columnHelper = createColumnHelper();
    const columns = [
        columnHelper.accessor('tms_reference_no',{
            header:'BR #'
        }),
        columnHelper.accessor('trip_no',{
            header:'Trip #'
        }),
        columnHelper.accessor('is_billable',{
            header:'Is Billable'
        }),
        columnHelper.accessor('is_processed_sell',{
            header:'Is Processed Sell'
        }),
        columnHelper.accessor('is_processed_buy',{
            header:'Is Processed Buy'
        }),
        columnHelper.accessor('trip_date',{
            header:'Trip Date'
        }),
        columnHelper.accessor('location',{
            header:'Location'
        }),
        columnHelper.accessor('trip_status',{
            header:'Trip Status'
        }),
        columnHelper.accessor('trucker_id',{
            header:'Trucker ID'
        }),
        columnHelper.accessor('vehicle_type',{
            header:'Vehicle Type'
        }),
        columnHelper.accessor('vehicle_id',{
            header:'Vehicle ID'
        }),
        columnHelper.accessor('planned_trucker',{
            header:'Planned Trucker'
        }),
        columnHelper.accessor('planned_vehicle_type',{
            header:'Planned Vehicle Type'
        }),
        columnHelper.accessor('planned_vehicle_id',{
            header:'Planned Vehicle ID'
        }),
        columnHelper.accessor('service_type',{
            header:'TMS Service Type'
        }),
        columnHelper.accessor('ascii_service_type',{
            header:'Ascii Service Type'
        }),
        columnHelper.accessor('sub_service_type',{
            header:'Sub Service Type'
        }),
        columnHelper.accessor('invoice_no',{
            header:'Invoice #'
        }),
        columnHelper.accessor('rdd',{
            header:'RDD'
        }),
        columnHelper.accessor('dr_no',{
            header:'DR #'
        }),
        columnHelper.accessor('shipment_manifest',{
            header:'Shipment Manifest'
        }),
        columnHelper.accessor('principal_code',{
            header:'Principal Code'
        }),
        columnHelper.accessor('stc_from',{
            header:'STC From'
        }),
        columnHelper.accessor('stc_to',{
            header:'STC To'
        }),
        columnHelper.accessor('br_status',{
            header:'BR Status'
        }),
        columnHelper.accessor('delivery_status',{
            header:'Delivery Status'
        }),
        columnHelper.accessor('rud_status',{
            header:'RUD Status'
        }),
        columnHelper.accessor('reason_code',{
            header:'Reason Code'
        }),
        columnHelper.accessor('redel_remarks',{
            header:'Redel Remarks'
        }),
        columnHelper.accessor('cleared_date',{
            header:'Cleard Date'
        }),
        columnHelper.accessor('job_id',{
            header:'Job ID'
        }),
        
    ]    
    return (
        <>
            <Paginated
                title={'Invoices'}
                columns={columns}
                route={'/v2/invoice'}
                showFilters
            />
        </>
    )
}

export default InvoicesTable