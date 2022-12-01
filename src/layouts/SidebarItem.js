import React from 'react';
import {
    Flex,
    Text,
    Link
} from '@chakra-ui/react';
import {NavLink} from 'react-router-dom';

const SidebarItem = ({
    data,
    onClose
}) => {

    return (
    <Link as={NavLink} end 
        to={data?.path} 
        _hover={{textDecoration: 'none'}} 
        _focus={{outline:'none'}}
        onClick={()=>{onClose()}}
    >{
        ({isActive}) => (    
            <Flex 
            cursor={'pointer'}
            justify='space-between' 
            px='6'
            py='2'
            _hover={{
                bg:'orange.500',
                color:'white'
            }}
            bgColor={isActive ? 'orange.600' : 'white'}
            color={isActive ? 'white' : 'black'}
            
            alignItems={'center'}
            userSelect='none'>
                <Text>{data?.label || ''}</Text>
            </Flex>
        )}
    </Link>)
}

export default SidebarItem