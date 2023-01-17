import React from 'react';
import {Flex, Text, Input} from '@chakra-ui/react';


const DateInput = ({onChange,value,name,label}) => {
  return (
    <Flex direction={'column'} gap='1'>
        <Text fontSize={'sm'} as='b'>{label}</Text>
        <Input
            size='sm'
            placeholder={label}
            type='date'
            value={value || ''}
            name={name}
            onChange={onChange}
        />
    </Flex>
  )
}

export default DateInput