import React from 'react'
import { Switch as SwitchCUI} from '@chakra-ui/react';
import FormControl from './FormControl';
import {useField}      from 'formik';
const FormSwitch = ({
    id,
    name,
    label,
    error,
    touched,
    onChange
}) => {
    // eslint-disable-next-line no-unused-vars
    const [fields,meta,helpers] = useField(name)
    const {setValue,setTouched} = helpers
    const {value} = meta

    return (
        <FormControl label={label} id={id} error={error} touched={touched}>
            <SwitchCUI
                    name={name}
                    size={'sm'}
                    isChecked={value}
                    onChange={()=>{
                        setValue(!value)
                        onChange()
                    }}
                    onBlur={()=>setTouched(true)}
                />
        </FormControl> 
    )
}

export default FormSwitch