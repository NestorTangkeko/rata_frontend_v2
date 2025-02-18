import { Box, Button, Text } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/login',{
            replace:true
        })
    }
    
    return (
        <Box 
            height={{
                base:'100vh'
            }}
            bg={'#2C2C2C'}
            color={'gray.200'}
            display='flex'
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Box width={{base: 'md'}} display={'flex'} flexDirection={'column'} gap={'5'}>
                <Box display={'flex'} flexDirection={'column'} gap={2}>
                    <Box>
                        <Button variant={'link'} onClick={handleBack}>Back</Button>	
                    </Box>
                    <Text fontSize={'4xl'}>Forgot Password</Text>
                </Box>
                <ForgotPasswordForm/>
                
            </Box>
            
        </Box>
    )
}

export default ForgotPassword