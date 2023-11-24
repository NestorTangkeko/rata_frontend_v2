import React from 'react';
import {LocalSelect, Select} from 'components/select';
import {DateRangePicker} from 'components/datepicker';
import { WrapItem } from '@chakra-ui/react';

const Filter = ({column}) => {

	const columnFilterValue = column.getFilterValue();

	const handleChange = (selected) => {
		column.setFilterValue(selected)
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