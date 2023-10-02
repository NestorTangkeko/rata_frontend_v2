import React from 'react'
import {SubHeader,Container} from 'layouts';
import {Button, useDisclosure} from '@chakra-ui/react';
import { useCheckAccess } from 'hooks';
import {useNavigate} from 'react-router-dom';

const BillingTransport = () => {
  const hasAccess = useCheckAccess({header_id: 'transport_operations'});
  const navigate = useNavigate();

  const handleCreateBilling = () => {
    navigate('create')
  }

  return (
    <>
      <SubHeader title={'Billing'}>
        <Button colorScheme={'orange'} hidden={!hasAccess.create} onClick={handleCreateBilling}>Create</Button>
      </SubHeader> 
      
    </>
  )
}

export default BillingTransport