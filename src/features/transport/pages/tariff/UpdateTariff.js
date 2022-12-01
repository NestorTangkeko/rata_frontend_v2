import React from 'react';
import {Container, SubHeader} from 'layouts';
import { Text, Button,Flex,useDisclosure, Spacer } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {useQueryParams} from 'hooks';
import {useCreateTariffMutation, useGetTransportTariffQuery} from 'lib/redux/api/tariff.api.slice';


import TariffInformation from '../../components/TariffInformation';
import TariffICModal from '../../components/modals/TariffICModal';
import TariffModal from '../../components/modals/TariffModal';
import TariffICTable from '../../components/tables/TariffICTable';

const UpdateTariff = () => {

    const navigate = useNavigate();
    const query = useQueryParams();
    const {data = []} = useGetTransportTariffQuery({
        tariff_id:query.get('tariff_id')
    })

    const [updateTariff,updateTariffOptions] = useCreateTariffMutation()

    const {isOpen,onOpen,onClose} = useDisclosure();
    const toggleUpdateTariff = useDisclosure();
    
    const handleApproveQuery = async () => {
        await updateTariff({
            tariff_id:data.tariff_id,
            tariff_status:'APPROVED'
        })
    }


    return (
    <>
        <SubHeader title={'Tariff Details'}>
            <Button size={'sm'} onClick={()=>{navigate(-1)}}>Back</Button>
        </SubHeader>
        <Container>
            <Text>Tariff Information</Text>
            <TariffInformation data={data}/>
            <Flex gap='2'>
                <Spacer/>
                <Button onClick={toggleUpdateTariff.onOpen} isDisabled={data.tariff_status === 'APPROVED'}>Edit</Button>
                <Button onClick={handleApproveQuery} isDisabled={data.tariff_status === 'APPROVED'} colorScheme='orange' isLoading={updateTariffOptions.isLoading}>Approve</Button>
            </Flex>
            <TariffModal onClose={toggleUpdateTariff.onClose} isOpen={toggleUpdateTariff.isOpen} data={data}/>
        </Container>
        <Container>
            <Text>Independent Contractor Information</Text>
            <Flex py='2'>
                <Spacer/>
                <Button size='sm' colorScheme={'orange'} onClick={() => onOpen()}>Add</Button>
            </Flex>
            <TariffICTable customFilter={{
                tariff_id:data.tariff_id
            }}/>
            <TariffICModal data={{
                tariff_id:data?.tariff_id,
                location: data?.location,
                vehicle_type: data?.vehicle_type
            }} isOpen={isOpen} onClose={onClose}/>
        </Container>
    </>
    
  )
}

export default UpdateTariff