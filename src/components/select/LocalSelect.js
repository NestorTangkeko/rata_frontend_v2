import React from 'react';
import Select from 'react-select';
import * as selectData from 'data/select_data';
import {Box, Text} from '@chakra-ui/react';

const LocalSelect = ({type,name,label,value,width,onChange}) => {
    const data = selectData[type];
    
    return (
        <Box display={'flex'} flexDirection='column' width={width} gap={1}>
            <Text fontSize={'sm'} as='b'>{label}</Text>
            <Select
                name={name}
                placeholder={label}
                value={value ?? null}
                styles={{ menu: (base) => ({ ...base, zIndex: 9999,whiteSpace: 'pre-wrap' })}}
                options={data || []}
                onChange={onChange}
                isClearable
            />
        </Box>
        
    )
}


LocalSelect.defaultProps = {
    value:null,
    onChange: () => {},
    type:''

}


export default LocalSelect