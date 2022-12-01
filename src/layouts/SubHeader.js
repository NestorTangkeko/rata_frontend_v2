import React from 'react';
import {Box, Flex,HStack,Text} from '@chakra-ui/react';

const SubHeader = ({
    title,
    children
}) => {
  return (
    <Box bgColor='white' rounded={'md'}>
        <Flex alignItems={'center'} height={'55'} px='5'>
            <Text flexGrow={1}>{title}</Text>
            <HStack spacing={1}>
                {children}
            </HStack>
    </Flex>
    </Box>
    
  )
}

export default SubHeader