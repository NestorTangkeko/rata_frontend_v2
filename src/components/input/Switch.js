import { Box, Text , Switch as SwitchCUI} from '@chakra-ui/react';
import React from 'react';

const Switch = ({label,value,name,onChecked}) => {
    const handleChecked = (e) => {
        onChecked( e.target.checked)
    }
 
    return (
        <Box minHeight={'12'} display={'flex'} flexDirection='column' gap={'1'}>
            <Text fontSize={'sm'} as='b'>{label}: </Text>
            <SwitchCUI
                name={name}
                size={'sm'}
                isChecked={value}
                onChange={handleChecked}
            />
        </Box>
    )
}

export default Switch 