import React from 'react';
import {SubHeader,Container} from 'layouts';
import { Button, } from '@chakra-ui/react';

import ContractTable from '../../components/tables/ContractTable';
import { useNavigate } from 'react-router-dom';

const Contract = () => {
  const navigate=useNavigate();

  const goToDetails = (contract_id) => {
    
    navigate({
      pathname:`${contract_id}`,
      
    })
  }

  return (
    <>
        <SubHeader title={'Contracts'}>
            <Button colorScheme={'orange'} size='sm'>CREATE</Button>
        </SubHeader>
        <Container>
          <ContractTable goToDetails={goToDetails}/>
        </Container>
    </>
  )
}

export default Contract