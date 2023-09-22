import { useField } from 'formik'
import React from 'react'
import FormControl from './FormControl';
import { useGetGeographyQuery } from 'lib/redux/api/geo.api.slice';
import Select from 'react-select/async';


function FormGeoSelect({name,label,type,onChange,...props}) {

    const {data=[],isFetching} = useGetGeographyQuery({
        type,
        query:{ 
            ...props
        }
    })

    const [fields,meta,helpers] = useField(name)
    const {setValue} = helpers
    const {value} = meta;
    
    const filterOptions = (input) => {
        if(data) 
        return data.filter(i => i.label.toLowerCase().includes(input.toLowerCase()))
        return []
    }

    return (
        <FormControl label={label} error={meta.error} touched={meta.touched}>
            <Select
                name={fields.name}
                placeholder={label}
                value={value}
                // styles={{ menu: (base) => ({ ...base, zIndex: 9999,whiteSpace: 'pre-wrap' })}}
                onChange={(value)=>{
                    setValue(value);
                    if(onChange) {
                        onChange()
                    }
                }}
                // onBlur={()=>setTouched(true)}
                defaultOptions={data.slice(0,10)}
                loadOptions={(inputValue,callBack)=>{
                    setTimeout(() => {
                        callBack(filterOptions(inputValue))
                    },1000) 
                  }}
                isLoading={isFetching}
                isClearable
                
            />
        </FormControl>
    )
}

export default FormGeoSelect