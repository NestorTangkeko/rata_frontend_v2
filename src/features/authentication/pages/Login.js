import React from 'react';
import {
    Flex,
    Box,
    Image,
} from '@chakra-ui/react';
import LoginForm from '../forms/LoginForm';
import {selectToken} from 'lib/redux'
import { useSelector } from 'react-redux';

import bg from 'assets/logo.png';
import { Navigate } from 'react-router-dom';

const Login = () => {
    const token = useSelector(selectToken)

    if(token){
        return <Navigate to='/' replace/>
    }

    return (
        <Flex>
            <Box 
                flex
                justifyContent={'center'}
                alignContent={'center'}
                width={{
                    base:'0',
                    md:'100%',
                    sm:'0'
                }}
                >
                <Image src={bg} alt='LI Background'/>
            </Box>
           
            <Box boxShadow='dark-lg'
                //position={'absolute'} 
                // top='0' 
                // right={'0'}
                width={{
                    base: '100%',
                    md:'100%', 
                    sm:'100%'
                }}
                height={{
                    base:'100vh' 
                }}
                bg={'#2C2C2C'}
                color={'gray.200'}
                display='flex'
                justifyContent={'center'}
                >
                    <LoginForm/>
                    
            </Box>
        </Flex>
  )
}

export default Login