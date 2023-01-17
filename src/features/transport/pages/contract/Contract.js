import React from 'react';
import {SubHeader,Container} from 'layouts';
import { Button, } from '@chakra-ui/react';

const Contract = () => {
  return (
    <>
        <SubHeader title={'Contracts'}>
            <Button colorScheme={'orange'} size='sm'>CREATE</Button>
        </SubHeader>
        <Container>
          
        </Container>
    </>
  )
}

export default Contract