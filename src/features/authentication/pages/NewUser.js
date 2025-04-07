import { Box, Text, Button } from '@chakra-ui/react';
import { useGetSessionQuery } from 'lib/redux/api/auth.api.slice'
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import UpdatePasswordForm from '../forms/UpdatePasswordForm';
import { useDispatch } from 'react-redux';
import { setLogOut } from 'lib/redux';
import moment from 'moment';

const NewUser = () => {
  	const {data, isError, isSuccess} = useGetSessionQuery();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	if(isError) return <Navigate to = '/login' replace/>;

	if(isSuccess) {
		const {is_reset,password_expiry} = data;
		const isExpired = moment(password_expiry).isBefore(moment())
		if(is_reset === 0 && !isExpired) return <Navigate to = '/login' replace/>
	}

	const handleBack = () => {
		dispatch(setLogOut());
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
					<Text fontSize={'4xl'}>Update Password</Text>
				</Box>
				<UpdatePasswordForm/>
			</Box>
		</Box>
	)
}

export default NewUser