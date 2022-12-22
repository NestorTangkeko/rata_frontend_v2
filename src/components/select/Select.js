import React from 'react';
import AsyncSelect from 'react-select/async';
import {useGetSelectOptionsQuery} from 'lib/redux/api/select.api.slice';

const Select = ({route, name, label, value, onChange,filter}) => {

    const {data =[], isLoading} = useGetSelectOptionsQuery({
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
        <AsyncSelect
            name={name}
            placeholder={label}
            value={value ?? null}
            styles={{ menu: (base) => ({ ...base, zIndex: 9999,whiteSpace: 'pre-wrap' })}}
            defaultOptions={loadDefaultOptions()}
            loadOptions={(inputValue,callBack)=>{
                setTimeout(() => {
                    callBack(filterOptions(inputValue))
                },1000) 
            }}
            onChange={onChange}
            isClearable
            isLoading={isLoading}
        />
    )
}

Select.defaultProps = {
    value:null,
    onChange: () => {},

}

export default Select