import React from 'react';
import {createColumnHelper} from '@tanstack/react-table';
import {Paginated} from 'components/table';
import {Button} from '@chakra-ui/react';

const DraftBillTable = ({handleGetDetails}) => {
    const columnHelper = createColumnHelper();
    const columns = [
        columnHelper.accessor('draft_bill_no',{
            header:'Draft Bill No',
            cell:props => {
                const data = props.getValue();
                const handleClick = () => {
                    handleGetDetails(props.row.original)
                }
                return <Button variant='link' colorScheme={'blue'} size='xs' onClick={handleClick}>{data}</Button>
            }
        }),
        columnHelper.accessor('service_type',{
            header:'Service Type'
        }),
        columnHelper.accessor('draft_bill_date',{
            header:'Draft Bill Date'
        }),
        columnHelper.accessor('contract_id',{
            header:'Contract ID'
        }),
        columnHelper.accessor('tariff_id',{
            header:'Tariff ID'
        }),
        columnHelper.accessor('principal',{
            header:'Principal'
        }),
        columnHelper.accessor('vehicle_type',{
            header:'Vehicle Type'
        }),
        columnHelper.accessor('location',{
            header:'Location'
        }),
        columnHelper.accessor('rate',{
            header:'Rate'
        }),
        columnHelper.accessor('min_billable_value',{
            header:'Min. Value'
        }),
        columnHelper.accessor('max_billable_value',{
            header:'Max Value'
        }),
        columnHelper.accessor('min_billable_unit',{
            header:'MBU'
        }),
        columnHelper.accessor('status',{
            header:'Status'
        }),
        columnHelper.accessor('total_charges',{
            header:'Total Charges'
        }),
        columnHelper.accessor('total_cbm',{
            header:'Total CBM'
        }),
        columnHelper.accessor('total_qty',{
            header:'Total Qty'
        }),
        columnHelper.accessor('total_billing_qty',{
            header:'Billing Qty'
        })
    ]
    
    return (
        <Paginated
            title='Draft Bill'
            columns={columns}
            route={'/v2/draft-bill/wms'}
        />
        
    )
}

export default DraftBillTable