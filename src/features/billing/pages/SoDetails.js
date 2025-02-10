import React from 'react';
import { Container, SubHeader } from 'layouts'
import { Button, Flex, Grid } from '@chakra-ui/react';
import Label from 'components/Label';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useGetSoHeaderQuery } from 'lib/redux/api/so_upload.api.slice';
import SODetailTable from '../components/table/SODetailTable';
import SoErrorTable from '../components/table/SoErrorTable';


const SoDetails = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const {data,...headerProps} = useGetSoHeaderQuery(id);
    //if(!data) return navigate(-1); 
    if(headerProps.isLoading) return <>Loading...</>
    if(headerProps.isError) return <Navigate to={'/so-upload'} replace/>
   
   return (<>
            <SubHeader title='Sales Order Details and Error Logs'>
                <Button colorScheme='orange' onClick={()=> navigate(-1)}>Back</Button>
            </SubHeader>
            <Container>
            <Flex direction={'column'} gap='2'>
				    <Grid templateColumns={'repeat(3,4fr)'}>
                        <Label 
                            label={'COMPANY CODE'}
                            value = {data.COMPANY_CODE}
                        />
                        <Label 
                            label={'SO CODE'}
                            value = {data.SO_CODE}
                        />

                        <Label 
                            label={'SO DATE'}
                            value={data.SO_DATE}
                        />

                        <Label 
                        label={'STATUS'}
                        value={data.STATUS}
                        />

                        <Label 
                        label={'CUSTOMER_CODE'}
                        value={data.CUSTOMER_CODE}
                        />

                        <Label
                        label={'PARTICULAR'}
                        value={data.PARTICULAR}
                        />

                        <Label 
                        label={'REF_EUPO'}
                        value={data.REF_EUPO}
                        />
                        
                        <Label 
                        label={'REF_CROSS'}
                        value={data.REF_CROSS}
                        />

                        <Label 
                        label={'ITEM TYPE'}
                        value={data.ITEM_TYPE}
                        />
                    </Grid>
                    <SODetailTable/>
                    <SoErrorTable/>
                </Flex>
            </Container>
        </>
    )
}

export default SoDetails