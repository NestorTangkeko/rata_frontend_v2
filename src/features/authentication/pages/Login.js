import React from 'react';
import {
    Box,
    Image,
} from '@chakra-ui/react';
import LoginForm from '../forms/LoginForm';
import {selectToken} from 'lib/redux'
import { useSelector } from 'react-redux';

import bg from 'assets/kli_bg.png';
import { Navigate } from 'react-router-dom';

const Login = () => {
    const token = useSelector(selectToken)

    if(token){
        return <Navigate to='/' replace/>
    }

    return (
        <Box>
            <Image height={{base:'100vh'}} objectFit={'cover'} src={bg} alt='LI Background'/>
            <Box boxShadow='dark-lg'
                position={'absolute'} 
                top='0' 
                right={'0'}
                width={{
                    base:'xl',
                    xl:'xl',
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
        </Box>
  )
}

export default Login