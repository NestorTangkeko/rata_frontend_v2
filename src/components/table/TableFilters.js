import React from 'react';
import {Select} from 'components/select';
import {DateRangePicker} from 'components/datepicker';

const Filter = ({column}) => {

	const columnFilterValue = column.getFilterValue();

	const handleChange = (selected) => {
		column.setFilterValue(selected)
	}
	
	switch(column.id) {
		case 'location':	return <Select route={'location'} label='Location' value={columnFilterValue} onChange={handleChange}/>
		
		case 'service_type': return <Select route={'quick-code'} label='Service Type' value={columnFilterValue} filter={{type:'SRV_TYP'}}  onChange={handleChange}/>
		
		case 'contract_type':	return <Select route={'quick-code'} label='Type' value={columnFilterValue} filter={{type:'CON_TYPE'}}  onChange={handleChange}/>	

		case 'draft_bill_type':	return <Select route={'quick-code'} label='Type' value={columnFilterValue} filter={{type:'CON_TYPE'}}  onChange={handleChange}/>

		case 'principal_code' : return <Select route={'principal'} label='Principal' value={columnFilterValue} onChange={handleChange}/>   
		
		case 'customer':	return <Select route={'principal'} label='Principal' value={columnFilterValue} onChange={handleChange}/>   
			

		case 'rdd': return <DateRangePicker label={'Delivery Date'} handleChange={handleChange}/>

		case 'delivery_date': return <DateRangePicker label={'Delivery Date'} handleChange={handleChange}/>

		case 'draft_bill_date': return <DateRangePicker label={'Draft Bill Date'} handleChange={handleChange}/>
		
		case 'tariff_status': return <Select route={'tariff-status'} label={'Tariff Status'} value={columnFilterValue} onChange={handleChange}/>

		default :
		return null
	}
}



export default Filter