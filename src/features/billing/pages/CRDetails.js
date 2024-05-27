import React from 'react';
import { Container, SubHeader } from 'layouts'
import { Button, Flex, Grid } from '@chakra-ui/react';
import Label from 'components/Label';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetCrHeaderQuery } from 'lib/redux/api/cr_upload.api.slice';
import CRDetailTable from '../components/table/CRDetailTable';
import CRErrorTable from '../components/table/CRErrorTable';


const CRDetails = () => {
	const navigate = useNavigate();
	const {id} = useParams();
	const {data = {}, ...getHeaderProps} = useGetCrHeaderQuery(id)
	
	if(getHeaderProps.isLoading) return <>Loading...</>
	
	if(!data ) return navigate(-1);

  	return (
    <>
      <SubHeader title='Confirmation Receipt Details and Error Logs'>
		<Button colorScheme='orange' onClick={()=> navigate(-1)}>Back</Button>
      </SubHeader>
      <Container>
			<Flex direction={'column'} gap='2'>
				<Grid templateColumns={'repeat(3,4fr)'}>
					<Label 
					label={'CR CODE'}
					value = {data.CR_CODE}
					/>

					<Label 
					label={'CR DATE'}
					value={data.CR_DATE}
					/>

					<Label 
					label={'STATUS'}
					value={data.STATUS}
					/>

					<Label 
					label={'REF CODE'}
					value={data.REF_CODE}
					/>

					<Label
					label={'DATE CONFIRMED'}
					value={data.DATE_CONFIRMED}
					/>

					<Label 
					label={'REF SI NO'}
					value={data.REF_SI_NO}
					/>
					
					<Label 
					label={'SUPPLIER CODE'}
					value={data.SUPPLIER_CODE}
					/>

					<Label 
					label={'ITEM TYPE'}
					value={data.ITEM_TYPE}
					/>

					<Label 
					label={'REF CROSS'}
					value={data.REF_CROSS}
					/>
					
					<Label 
					label={'PARTICULAR'}
					value={data.PARTICULAR}
					/>

					<Label 
					label={'DEPARMENT CODE'}
					value={data.DEPARTMENT_CODE}
					/>

					<Label 
					label={'CR AMT'}
					value={data.CR_AMT}
					/>
				</Grid>
		  		<CRDetailTable/>
				<CRErrorTable/>
			</Flex>
      </Container>
    </>
  )
}

export default CRDetails