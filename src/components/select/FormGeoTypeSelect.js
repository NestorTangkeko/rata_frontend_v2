import React from 'react';
import {useField} from 'formik';
import Select from 'react-select';
import {useDispatch} from 'react-redux';
import {FormControl} from 'components/form';

import {setGeoType} from 'lib/redux';

import geo_types from 'data/geo_types';


const FormGeoTypeSelect = ({
    id,
    name,
    label,
    error,
    touched,
    isDisabled,
}) => {
    // eslint-disable-next-line no-unused-vars
    const  [fields,meta,helpers] = useField(name)

    const {value}= meta;
    const {setValue,setTouched} = helpers;
    const dispatch = useDispatch()

    React.useEffect(() => {
        return () => {
            dispatch(setGeoType({
                name:name,
                value:null
            }))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <FormControl label={label} id={id} error={error} touched={touched}>
          <Select
            id={id}
            name={name}
            styles={{ menu: (base) => ({ ...base, zIndex: 9999 })}}
            options={geo_types}
            value={value}
            onChange={(values) => {
                dispatch(setGeoType({
                    name:name,
                    value:values
                }))
                setValue(values)
            }}
            placeholder={label}
            onBlur={()=> setTouched(true)}
            isClearable  
          />
        </FormControl>
      )
}

export default FormGeoTypeSelect