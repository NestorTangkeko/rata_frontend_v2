import React from 'react';
import {Flex, Text, Input} from '@chakra-ui/react';

const TimeInput = ({onChange,value,name,label}) => {
    return (
        <Flex direction={'column'} gap='1'>
            <Text fontSize={'sm'} as='b'>{label}</Text>
            <Input
                size='sm'
                placeholder={label}
                type='time'
                value={value}
                name={name}
                onChange={onChange}
            />
        </Flex>
    )
}

export default TimeInput