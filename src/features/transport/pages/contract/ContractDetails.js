import React from 'react'
import {Container, SubHeader} from 'layouts';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import {Button, Text, Spacer, Flex, useDisclosure} from '@chakra-ui/react';

import {useGetTransportContractQuery, useUpdateTransportContractMutation, useUpdateTransportContractTariffMutation} from 'lib/redux/api/contract.api.slice';
import ContractTariffTable from 'features/transport/components/tables/ContractTariffTable';
import ContractInformation from 'features/transport/components/ContractInformation';

import {toast} from 'react-toastify';
import {useCheckAccesSub} from 'hooks'
import ContractRenew from 'features/transport/components/modals/ContractRenew';

const ContractDetails = () => {
    const navigate  = useNavigate();
    const params    = useParams();
    const hasAccess = useCheckAccesSub({header_id: 'transport_operations'});
    const renewDialog = useDisclosure();

    const {data,isSuccess,isLoading} = useGetTransportContractQuery({
        contract_id: params.contract_id
    });

    const [updateContract,updateContractProps] = useUpdateTransportContractMutation();
    const [updateTariff, updateTariffProps] = useUpdateTransportContractTariffMutation();

    if(isLoading) {
        return <span>Loading...</span>
    }
    
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

    const handleCancelTariff = async(id) => {
        await updateTariff({
            query:{
                //contract_id: data.contract_id,
                id
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
                    
                    <Button hidden={!hasAccess.edit} isDisabled={data?.contract_status !== 'APPROVED'}  onClick={renewDialog.onOpen}>
                        Renew
                    </Button>

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

            <ContractRenew isOpen={renewDialog.isOpen} onClose={renewDialog.onClose} 
                {...{
                    contract_id: data.contract_id,
                    valid_from: data.valid_from,
                    valid_to:data.valid_to
                }}
            />
        </>    
    )
}

export default ContractDetails