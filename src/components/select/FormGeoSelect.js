import React from 'react';
import {useField} from 'formik';
import Select from 'react-select/async';
import {FormControl} from 'components/form';
import {useGetGeoQuery} from 'lib/redux/api/geo.api.slice';
import { useSelector } from 'react-redux';

const GeoSelect = ({
    id,
    name,
    label,
    error,
    touched,
    geo_type,
    // route,
    // query,
    // isDisabled,
    // onChange
}) => {

  // eslint-disable-next-line no-unused-vars
  const [fields,meta,helpers] = useField(name);
  const selectGeoType = useSelector(state => state.geography);
  const {data = [],refetch,isLoading}  = useGetGeoQuery({
      query:{
        type: selectGeoType[geo_type]?.value || ''
      }
  })


  const {setValue,setTouched} = helpers
  const {value} = meta

  const filterOptions = (input) => {
    if(data) 
    return data.data.filter(i => i.label.toLowerCase().includes(input.toLowerCase()))

    return []
  }

  const loadDefaultOptions = () => {
    if(data?.data)
    return data.data.slice(0,10)

    return []
  }

  React.useEffect(()=>{
    refetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectGeoType[geo_type]])

  return (
    <FormControl label={label} id={id} error={error} touched={touched}>
      <Select
        id={id}
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

export default GeoSelect