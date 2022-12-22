import React from 'react';
import {Box,Text} from '@chakra-ui/react';

const Label = ({label,value}) => {
  return (
    <Box minHeight={'12'} display={'flex'} flexDirection='column' gap={'1'}>
      <Text fontSize={'sm'} as='b'>{label}</Text>
      <Text fontSize={'xs'}>{value}</Text>
    </Box>
  )
}

export default Label