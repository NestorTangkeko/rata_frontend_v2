import React from 'react';
import {LocalSelect, Select} from 'components/select';
import {DateRangePicker} from 'components/datepicker';
import {Switch} from 'components/input';
import { Flex, Input, WrapItem, Text } from '@chakra-ui/react';

const Filter = ({column}) => {
	const columnFilterValue = column.getFilterValue();
	const handleChange = (selected) => {
		column.setFilterValue(selected)
	}

	const handleChecked = (checked) => {
		column.setFilterValue(checked ? '1' : '0')
	}

	const renderFilters = () => {
		switch(column.id) {
			case 'location':		return <WrapItem>
				<Select route={'location'} label='Location' value={columnFilterValue} onChange={handleChange}/>
			</WrapItem>
			
			case 'service_type': 	return <WrapItem>
				<Select route={'quick-code'} label='Service Type' value={columnFilterValue} filter={{type:'SRV_TYP'}}  onChange={handleChange}/>
			</WrapItem>
			
			case 'contract_type':	return <WrapItem>
				<Select route={'quick-code'} label='Type' value={columnFilterValue} filter={{type:'CON_TYPE'}}  onChange={handleChange}/>	
			</WrapItem>

			case 'draft_bill_type':	return <WrapItem>
				<Select route={'quick-code'} label='Type' value={columnFilterValue} filter={{type:'CON_TYPE'}}  onChange={handleChange}/>
			</WrapItem> 
			
			case 'principal_code' : return <WrapItem>
				<Select route={'principal'} label='Principal' value={columnFilterValue} onChange={handleChange}/>  
			</WrapItem>
			
			case 'customer':		return <WrapItem>
				<Select route={'principal'} label='Principal' value={columnFilterValue} onChange={handleChange}/>   
			</WrapItem>
				
			case 'rdd': 			return <WrapItem>
				<DateRangePicker label={'Delivery Date'} handleChange={handleChange}/>
			</WrapItem>
			
			case 'delivery_date': 	return <WrapItem>
				<DateRangePicker label={'Delivery Date'} handleChange={handleChange}/>
			</WrapItem>

			case 'trip_date': 	return <WrapItem>
			<DateRangePicker label={'Trip Date'} handleChange={handleChange}/>
			</WrapItem>

			case 'draft_bill_date': return <WrapItem>
				<DateRangePicker label={'Draft Bill Date'} handleChange={handleChange}/>
			</WrapItem>
			
			case 'tariff_status': 	return <WrapItem>
				<Select route={'tariff-status'} label={'Tariff Status'} value={columnFilterValue} onChange={handleChange}/>
			</WrapItem>

			case 'status': 			return <WrapItem>
				<LocalSelect type={'draft_bill_status'} label={'Draft Bill Status'} value={columnFilterValue} onChange={handleChange}/>
			</WrapItem>
				
			case 'rate_status': 	return <WrapItem>
				<LocalSelect type={'rate_status'} label={'Status'} value={columnFilterValue} onChange={handleChange}/>
			</WrapItem>

			case 'class_of_store' : return <WrapItem>
				<Select route={'quick-code'} label='Class of Store' value={columnFilterValue} filter={{type:'CLSOFSTR'}}  onChange={handleChange}/>
			</WrapItem>
			
			case 'vehicle_type': return <WrapItem>
				<Select route={'quick-code'} label='Vehicle Type' value={columnFilterValue} filter={{type:'VEH_TYPE'}}  onChange={handleChange}/>
			</WrapItem>

			case 'vendor' : return <WrapItem>
				<Select route={'vendor'} label='Vendor' value={columnFilterValue} 	onChange={handleChange}/>
			</WrapItem>	

			case 'trip_status': return <WrapItem>
				<LocalSelect type={'trip_status'} label={'Trip Status'} value={columnFilterValue} 	onChange={handleChange}/>
			</WrapItem>

			case 'is_processed_sell' : return <WrapItem>
				<Switch
					label={'Is Processed Sell?'}
					value={columnFilterValue === '1' ? true : false}
					onChecked={handleChecked}
				/>
			</WrapItem>

			case 'is_processed_buy' : return <WrapItem marginLeft={'1'} marginRight={'1'}>
				<Switch
					label={'Is Processed Buy?'}
					value={columnFilterValue === '1' ? true : false}
					onChecked={handleChecked}
				/>
			</WrapItem>

			case 'revenue_leak_reason' : return <WrapItem>
				<LocalSelect type={'revenue_leak'} label={'Revenue Leak'} value={columnFilterValue} 	onChange={handleChange}/>
			</WrapItem>

			case 'CR_DATE' : return <WrapItem>
				<DateRangePicker label={'CR Date'} handleChange={handleChange}/>
			</WrapItem>

			case 'SUPPLIER_CODE': return <WrapItem>
				<Flex direction='column'>
					<Text fontSize={'sm'} as='b'> Supplier Code</Text>
					<Input placeholder='Supplier Code' onChange={(e) => {
						handleChange(e.target.value)
					}} />
				</Flex>
			</WrapItem>
			case 'DEPARTMENT_CODE': return <WrapItem>
				<Select
					label={'Department Code'}
					route={'department-code'}
					value={columnFilterValue} 	
					onChange={handleChange}

				/>
			</WrapItem>

			case 'STATUS': return <WrapItem>
				<LocalSelect label ='Status' type={'cr_status'} value={columnFilterValue} onChange={handleChange}/>
			</WrapItem>

			case 'cleared_date': return <WrapItem>
				<DateRangePicker label={'RUD Cleared'} handleChange={handleChange}/>
			</WrapItem>

			case 'SO_DATE' : return <WrapItem>
			<DateRangePicker label={'SO Date'} handleChange={handleChange}/>
			</WrapItem>
			
			case 'CUSTOMER_CODE': return <WrapItem>
			<Flex direction='column'>
				<Text fontSize={'sm'} as='b'>Customer Code</Text>
				<Input placeholder='Customer Code' onChange={(e) => {
					handleChange(e.target.value)
				}} />
			</Flex>
			</WrapItem>

		
			case 'SO_STATUS': return <WrapItem>
			<LocalSelect label ='Status' type={'so_status'} value={columnFilterValue} onChange={handleChange}/>
			</WrapItem>

			case 'jvc_db_date' : return <WrapItem>
			<DateRangePicker label={'Draft Bill Date Range'} handleChange={handleChange}/>
			</WrapItem>

			case 'jvc_customer': return <WrapItem>
			<Flex direction='column'>
				<Text fontSize={'sm'} as='b'> Customer</Text>
				<Input placeholder='Customer' onChange={(e) => {
					handleChange(e.target.value)
				}} />
			</Flex>
			</WrapItem>


			default :
			return null
		}
	}

	return <>
		{
			
			renderFilters()
		}
	</>

	
}



export default Filter