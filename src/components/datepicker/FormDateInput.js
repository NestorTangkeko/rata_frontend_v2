import React from 'react';
import {Input} from '@chakra-ui/react';
import {FormControl} from '../form';
import {useField}      from 'formik';

const FormDateInput = ({id,label,name,error,touched}) => {
    // eslint-disable-next-line no-unused-vars
    const [fields,meta,helpers] = useField(name)
	
    const {setValue,setTouched} = helpers
    const {value} = meta

    return (
        <FormControl label={label} id={id} error={error} touched={touched}>
            <Input
                id={id}
				name={name}
				onChange={(valueString) => setValue(valueString.target.value)}
				value={value || ''}
				type='date'
				onBlur={()=>setTouched(true)}
                placeholder={label}
            />
        </FormControl> 
    )
}

export default FormDateInput