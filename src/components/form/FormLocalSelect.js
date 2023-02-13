import React from 'react';
import FormControl from './FormControl';
import Select from 'react-select';
import {useField} from 'formik';
import * as data from '../../data/select_data';

const FormLocalSelect = ({id,
    name,
    label,
    error,
    touched,
    type,
    isDisabled,
    isMulti
}) => {
    // eslint-disable-next-line no-unused-vars
    const [fields,meta,helpers] = useField(name);
    
    const {setValue,setTouched} = helpers
    const {value} = meta

    const getData = data[type];

    return (
        <FormControl label={label} id={id} error={error} touched={touched}>
            <Select
                    name={name}
                    placeholder={label}
                    value={value ?? null}
                    styles={{ menu: (base) => ({ ...base, zIndex: 9999,whiteSpace: 'pre-wrap' })}}
                    options={getData}
                    onChange={(value) => {
                        setValue(value)
                    }}
                    onBlur={()=>setTouched(true)}
                    isClearable
                    isDisabled={isDisabled}
                    isMulti={isMulti}
                />
        </FormControl>
    )
}

export default FormLocalSelect