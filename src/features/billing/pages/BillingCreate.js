import React from 'react'
import {SubHeader,Container} from 'layouts';
import { Button, Flex, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'components/form';
import BillingCreateForm from '../components/forms/BillingCreateForm';
import { createBillingSchema } from '../validations';
import DraftBillTable from '../components/table/DraftBillTable';

const BillingCreate = () => {
  const nav = useNavigate();
  
  const values = {
    from: '',
    to:'',
    service_type: null,
    customer: null,
    parameter_1: '',
    parameter_2: '',
    parameter_3: '',
    parameter_4: '',
    parameter_5: '',
    parameter_6: '',
    parameter_7: '',
    parameter_8: '',
  };

  const handleBack = () => {
    nav(-1,{
      replace:true
    })
  };

  const handleSubmit = () => {

  }

  return (<>
    <SubHeader title={'Create Billing'}>
        <Button colorScheme='orange' onClick={handleBack}>Back</Button>
    </SubHeader> 
    <Container>
        <Formik initialValues={values} onSubmit={handleSubmit} validationSchema={createBillingSchema}>
          <Flex direction={'column'} gap={5}>
            <BillingCreateForm/>
            <DraftBillTable/>
          </Flex>

        </Formik>
    </Container>
  </>
   
  )
}

export default BillingCreate 