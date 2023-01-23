import React from 'react';
import {Container, SubHeader} from 'layouts';
import { Text, Button,Flex,useDisclosure, Spacer } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {useQueryParams} from 'hooks';
import {useUpdateTariffMutation, useGetTransportTariffQuery} from 'lib/redux/api/tariff.api.slice';


import TariffInformation from '../../components/TariffInformation';
import TariffICModal from '../../components/modals/TariffICModal';
import TariffModal from '../../components/modals/TariffModal';
import TariffICTable from '../../components/tables/TariffICTable';
import { toast } from 'react-toastify';

const UpdateTariff = () => {

    const navigate = useNavigate();
    const query = useQueryParams();
    
    //Temporary Data for creating IC Matrix
    const [icData,setICData] = React.useState([]);
    
    const {data = []} = useGetTransportTariffQuery({
        tariff_id:query.get('tariff_id')
    })

    const [updateTariff,updateTariffOptions] = useUpdateTariffMutation()

    const {isOpen,onOpen,onClose} = useDisclosure();
    const toggleUpdateTariff = useDisclosure();
    
    const handleApproveQuery = async () => {
        await updateTariff({
            tariff_id:data.tariff_id,
            body: {
                tariff_ic: icData,
                tariff_header: {
                    tariff_status: 'APPROVED'
                }
            }
        })
        .unwrap()
        .then((result) => {
            toast.success('Success!')
        })
    }

    //create new entry in ic algo table
    const handleAddIC = (data) => {
        const lastRow = icData.at(-1)
        
        if(!lastRow) {
            return setICData(icData.concat([data]))
        }

        if((Number(lastRow.max_value) + 1) !== Number(data.min_value)){
            return toast.error('Invalid Min Value!')
        }

        if(Number(data.min_value) >= Number(data.max_value)){
            return toast.error('Min Value must be less than Max Value!')
        }

        setICData(icData.concat([data]))
    }

    //deletes row in ic algo table
    const handleDelete = (index) => {
        const data = [...icData]
        data.splice(index,1)
        setICData(data)
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
            <Flex gap='1' py='2' hidden={data?.tariff_status === 'APPROVED'}>
                <Spacer/>
                <Button size='sm' colorScheme={'orange'} onClick={()=>setICData([])}>Clear</Button>
                <Button size='sm' colorScheme={'orange'} onClick={() => onOpen()} disabled={data?.tariff_status === 'APPROVED'}>Add</Button>
            </Flex>
            <TariffICTable 
                data={icData}
                icData={data?.ic_data}
                handleDelete={handleDelete}
                tariffStatus={data?.tariff_status} 
                customFilter={{
                    tariff_id:data.tariff_id
                }}
            />
            <TariffICModal 
                handleAdd={handleAddIC}
                data={{
                    tariff_id:data?.tariff_id,
                    location: data?.location,
                    vehicle_type: data?.vehicle_type,
                    uom: data?.min_billable_unit
                }} 
                isOpen={isOpen} 
                onClose={onClose}/>
        </Container>
    </>
    
  )
}

export default UpdateTariff