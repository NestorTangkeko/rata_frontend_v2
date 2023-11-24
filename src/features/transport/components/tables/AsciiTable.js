import React from 'react';
import { Paginated } from 'components/table';
import { createColumnHelper } from '@tanstack/react-table';
import {Button} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const AsciiTable = () => {
	const navigate = useNavigate();
	const columnHelper = createColumnHelper();
	const columns = [
		columnHelper.accessor('draft_bill_no',{
			header:'Draft Bill No',
			cell:props => {
				const data = props.getValue();
                const handleClick = () => {
                    navigate(`${data}`)
                }
                return <Button variant='link' colorScheme={'blue'} size='xs' onClick={handleClick}>{data}</Button>
			} 
		}),
		columnHelper.accessor('first_transmitted_date',{
			header:'First Transmitted Date'
		}),
		columnHelper.accessor('last_transmitted_date',{
			header:'Last Transmitted Date'
		}),
		columnHelper.accessor('last_transmitted_by',{
			header:'Last Transmitted By'
		}),
		columnHelper.accessor('transmittal_count',{
			header:'# of Retransmittal'
		}),
		columnHelper.accessor('contract_type',{
			header:'Contract Type'
		}),
		columnHelper.accessor('location',{
			header:'Location'
		}),
		columnHelper.accessor('draft_bill_date',{
			header:'Draft Bill Date'
		}),
		columnHelper.accessor('delivery_date',{
			header:'RDD'
		}),
		columnHelper.accessor('customer',{
			header:'Customer'
		}),
		columnHelper.accessor('vendor',{
			header:'Vendor'
		}),
		columnHelper.accessor('service_type',{
			header:'Service Type'
		}),
		columnHelper.accessor('trip_no',{
			header:'Trip No.'
		}),
		columnHelper.accessor('min_billable_value',{
			header:'Min. Value'
		}),
		columnHelper.accessor('min_billable_unit',{
			header:'Min. Billable Unit'
		}),
		columnHelper.accessor('actual_quantity',{
			header:'Actual Quantity'
		}),
		columnHelper.accessor('rate',{
			header:'Rate'
		}),
		columnHelper.accessor('total_charges',{
			header:'Total Charges'
		}),
		columnHelper.accessor('status',{
			header:'Status'
		})
	]

	return (
		<Paginated
			showFilters
			title={'Transmittal Log'}
			columns={columns}
			route={'/v2/ascii/draft-bill'}
		/>
	)
}

export default AsciiTable