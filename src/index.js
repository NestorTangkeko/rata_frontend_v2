import {
  ChakraProvider,
  ColorModeScript,
  extendTheme
} from '@chakra-ui/react';
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';
import { mode } from '@chakra-ui/theme-tools';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import {persistor, store} from 'lib/redux';
import router from 'lib/router';

import { ToastContainer } from 'react-toastify';


const breakpoints = {
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
}


const theme = extendTheme({
  breakpoints,
  config:{
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles:{
    global:(props) => ({
      body:{
        bg: mode('#EAECEE','black')(props),
      }
    })
  }
})

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={'light'}/>
        <RouterProvider router={router}/>
      </ChakraProvider>
    </PersistGate>
    <ToastContainer/>
  </Provider>
);
