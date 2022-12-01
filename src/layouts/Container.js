import { Box } from '@chakra-ui/react';
import React from 'react';

const Container = ({children}) => {
  return (
   <Box bgColor='white' p='5' rounded={'md'}>
    {children}
   </Box>
  )
}

export default Container