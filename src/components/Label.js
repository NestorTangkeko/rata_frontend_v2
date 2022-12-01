import React from 'react';
import {Box} from '@chakra-ui/react';

const Label = ({label,value}) => {
  return (
    <Box minHeight={'16'} p='0.5' display={'flex'} flexDirection='column' gap={'1'}>
      <Box fontWeight={'semibold'} as='h4'>{label}</Box>
      <Box fontWeight={'sm'}>{value}</Box>
    </Box>
  )
}

export default Label