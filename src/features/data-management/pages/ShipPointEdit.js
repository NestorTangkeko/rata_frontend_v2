import React from 'react';
import {SubHeader, Container} from 'layouts';
import { Button, Flex } from '@chakra-ui/react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useGetShipPointQuery, useUpdateShipPointMutation } from 'lib/redux/api/data.management.api.slice';
import {Formik} from 'components/form';
import ShipPointEditForm from '../components/forms/ShipPointEditForm';
import { shipPointSchema } from '../validations';
import { toast } from 'react-toastify';


function ShipPointEdit() {
  const navigate = useNavigate();
  let {id} = useParams();
  const {data={},isLoading,isError} = useGetShipPointQuery(id)
  const [update, updateProps] = useUpdateShipPointMutation();
  
  if(isError || !id) {
    return <Navigate to={'/ship-point'}/>
  }

  if(isLoading){
    return <>Loading...</>
  }

  let initialValues = {
    stc_code:         data?.stc_code        || '',
    stc_address:      data?.stc_address     || '',
    stc_description:  data?.stc_description || '',
    zip_code:         data?.zip_code        || '',
    is_active:        data?.is_active       ||  '',
    country:          data?.country         || '',
    region:           data?.region ?        {label: data?.region, value: data?.region} : null,
    province:         data?.province ?      {label: data?.province, value: data?.province} : null,
    city:             data?.city ?          {label: data?.city, value: data?.city} : null,
    barangay:         data?.barangay ?      {label: data?.barangay, value: data?.city} : null,
  }

  const handleSubmit = async(values,{resetForm}) => {
    await update({
      stc: id,
      body:{
        stc_address: values.stc_address,
        zip_code: values.zip_code,
        region:   values.region?.value || null,          
        province: values.province?.value || null,
        city:     values.city?.value || null,
        barangay: values.barangay?.value || null
      }
    })
    .unwrap()
    .then(result => {
      resetForm({
        values
      })
      toast.success('Ship Point Updated!')
    })    
  }

  return (
    <>
      <SubHeader title={'Edit Ship Point'}>
        <Button onClick={()=>{navigate('/ship-point')}}>Back</Button>
      </SubHeader>
      <Container>
        <Formik
          
          {...{
            initialValues: initialValues,
            onSubmit:handleSubmit,
            validationSchema: shipPointSchema
          }}
        >
            <ShipPointEditForm/>
            <br/>
            <Flex justify={'flex-end'} gap={2}>
                <Button type='reset' isLoading={updateProps.isLoading}>Reset</Button>
                <Button colorScheme='orange' type='submit' isLoading={updateProps.isLoading}>Save</Button>
            </Flex>
        </Formik>
      </Container>
    </>
  )
}

export default ShipPointEdit