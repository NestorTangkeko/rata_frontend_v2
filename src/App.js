import React from 'react';
import {Outlet,Navigate} from 'react-router-dom';
import {selectToken} from 'lib/redux'
import { useSelector } from 'react-redux';

import {Header} from 'layouts';
import { Box } from '@chakra-ui/react';
import 'react-toastify/dist/ReactToastify.css';
import { useGetSessionQuery } from 'lib/redux/api/auth.api.slice';
import moment from 'moment';

function App() {
    const token = useSelector(selectToken);
    const {data, isSuccess,isLoading} = useGetSessionQuery();
    
    if(!isLoading && isSuccess) {
        const {is_reset, password_expiry} = data;

        if(moment(password_expiry).isBefore(moment())){
            return <Navigate to='/new-user' replace/>
        }

        if(is_reset === 1) {
            return <Navigate to='/new-user' replace/>
        }
    }

    if(!token) {
        return <Navigate to='/login'/>
    }

    return (
    <>
        <Header/>
        <Box display={'flex'} mt='20' mx='10' mb='5' rowGap='5' flexDirection={'column'}>
            <Outlet/>
        </Box>
    </>
  );
}

export default App;
