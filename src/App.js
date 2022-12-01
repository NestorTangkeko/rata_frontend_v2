import React from 'react';
import {Outlet,Navigate} from 'react-router-dom';
import {selectToken} from 'lib/redux'
import { useSelector } from 'react-redux';

import {Header} from 'layouts';
import { Box } from '@chakra-ui/react';

function App() {
  const token = useSelector(selectToken)

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
