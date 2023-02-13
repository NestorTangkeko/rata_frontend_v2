import React from 'react'
import {Container, SubHeader} from 'layouts';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import {Button, Text, Spacer, Flex} from '@chakra-ui/react';

import {useGetTransportContractQuery, useUpdateTransportContractMutation, useUpdateTransportContractTariffMutation} from 'lib/redux/api/contract.api.slice';
import ContractTariffTable from 'features/transport/components/tables/ContractTariffTable';
import ContractInformation from 'features/transport/components/ContractInformation';

import {toast} from 'react-toastify';
import {useCheckAccesSub} from 'hooks'

const ContractDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const hasAccess = useCheckAccesSub({header_id: 'transport_operations'});

    const {data,isSuccess} = useGetTransportContractQuery({
        contract_id: params.contract_id
    });

    const [updateContract,updateContractProps] = useUpdateTransportContractMutation();
    const [updateTariff, updateTariffProps] = useUpdateTransportContractTariffMutation();

    if(isSuccess && !data.contract_id ) {
       return <Navigate to='/transport-contract' replace={true}/>
    }
    
    const handleApprove = async() => {
        await updateContract({
            contract_id: data.contract_id
        })
        .unwrap()
        .then(() => {
            toast.success('Success')
        })
    }

    const handleCancelTariff = async(tariff_id) => {
        await updateTariff({
            query:{
                contract_id: data.contract_id,
                tariff_id
            }
        })
        .unwrap()
        .then(() => {
            toast.success('Success')
        })
    }

    return (
        <>
           <SubHeader title={'Contract Details'}>
                <Button size={'sm'} onClick={()=>{navigate(-1)}}>Back</Button>
            </SubHeader>
            <Container>
                <Text>Contract Information</Text>
                <ContractInformation data={data}/>
                <Flex gap='1'>
                <Spacer/> 
                    <Button 
                        hidden={!hasAccess.edit}
                        onClick={handleApprove} 
                        isDisabled={data?.contract_status === 'APPROVED'} 
                        isLoading={updateContractProps.isLoading}
                        colorScheme='orange'>
                            Approve
                    </Button>
                </Flex>
                </Container>
            <Container>
                <ContractTariffTable hasEdit={hasAccess.edit} isLoading={updateTariffProps.isLoading}  handleCancelTariff={handleCancelTariff} contract_id={params?.contract_id || null}/>
            </Container>
        </>    
    )
}

export default ContractDetails