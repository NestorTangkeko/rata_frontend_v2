import React from 'react';
import {Paginated} from 'components/table';
import {createColumnHelper} from '@tanstack/react-table';
import { Button } from '@chakra-ui/react';

const RevenueLeakTable = ({handleOpen}) => {
    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor('tms_reference_no',{
            header:'Reference No',
            cell: props => {
                const value = props.getValue();
                const onClick = () => {
                    handleOpen(value)
                }
                // 
                return <Button variant='link' size={'sm'} onClick={onClick}>{value}</Button>
            }
        }),
        columnHelper.accessor('draft_bill_type',{
            header:'Draft Bill Type'
        }),
        columnHelper.accessor('revenue_leak_reason',{
            header:'Revenue Leak Reason'
        }),
        columnHelper.accessor('trip_no',{
            header:'Trip No'
        }),
        columnHelper.accessor('trip_date',{
            header:'Trip Date'
        }),
        columnHelper.accessor('location',{
            header:'Location'
        }),
        columnHelper.accessor('trucker_id',{
            header:'Vendor ID'
        }),
        columnHelper.accessor('vehicle_type',{
            header:'Vehicle Type'
        }),
        columnHelper.accessor('vehicle_id',{
            header:'Vehicle ID'
        }),
        columnHelper.accessor('service_type',{
            header:'Service Type'
        }),
        columnHelper.accessor('ascii_service_type',{
            header:'Ascii Service Type'
        }),
        columnHelper.accessor('sub_service_type',{
            header:'Sub Service Type'
        }),
        columnHelper.accessor('invoice_no',{
            header:'Invoice No'
        }),
        columnHelper.accessor('rdd',{
            header:'RDD'
        }),
        columnHelper.accessor('dr_no',{
            header:'DR No'
        }),
        columnHelper.accessor('shipment_manifest',{
            header:'Ship. Manifest'
        }),
        columnHelper.accessor('principal_code',{
            header:'Principal'
        }),
        columnHelper.accessor('stc_from',{
            header:'STC From'
        }),
        columnHelper.accessor('stc_to',{
            header:'STC To'
        }),
        columnHelper.accessor('reason_code',{
            header:'Reason Code'
        }),
        columnHelper.accessor('redel_remarks',{
            header:'Redel Remarks'
        })
    ];

    return (
        <>
            <Paginated
                title='Revenue Leaks'
                columns={columns}
                route={'/v2/revenue-leak'}
                showFilters
            />
        </>
    )
}

export default RevenueLeakTable