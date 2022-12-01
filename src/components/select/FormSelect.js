import React from 'react';
import Select from 'react-select/async';
import {FormControl} from 'components/form';
import {useField} from 'formik';

import {useGetSelectOptionsQuery} from 'lib/redux/api/select.api.slice';
const MasterSelect = ({
    id,
    name,
    label,
    error,
    touched,
    filter,
    route,
    query,
    isDisabled,
    onChange
}) => {

   // eslint-disable-next-line no-unused-vars
    const [fields,meta,helpers] = useField(name);
    const {setValue,setTouched} = helpers
    const {value} = meta

   const {data = [], isLoading } = useGetSelectOptionsQuery({
    route,
    query:{
      ...filter
    }
   }) 

   const loadDefaultOptions = () => {
    if(data?.data)
    return data.data.slice(0,10)

    return []
  }

  const filterOptions = (input) => {
    if(data) 
    return data.data.filter(i => i.label.toLowerCase().includes(input.toLowerCase()))

    return []
  }

  return (
    <FormControl label={label} id={id} error={error} touched={touched}>
      <Select
        name={name}
        placeholder={label}
        value={value}
        isClearable
        isLoading={isLoading}
        styles={{ menu: (base) => ({ ...base, zIndex: 9999,whiteSpace: 'pre-wrap' })}}
        onChange={(value)=>setValue(value)}
        onBlur={()=>setTouched(true)}
        defaultOptions={loadDefaultOptions()}
        loadOptions={(inputValue,callBack)=>{
          setTimeout(() => {
              callBack(filterOptions(inputValue))
          },1000) 
        }}

      />
    </FormControl>
  )
}

export default MasterSelect