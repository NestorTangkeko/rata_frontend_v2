import { Container, SubHeader } from 'layouts'
import React from 'react'
import VehicleTypeTable from '../components/tables/VehicleTypeTable'
import { Button } from '@chakra-ui/react'
import { useCreateDataMutation } from 'lib/redux/api/data.management.api.slice'
import { toast } from 'react-toastify'

const VehicleTypes = () => {
    const [sync, {isLoading}] = useCreateDataMutation();

    const handleSynchronize = async() => {
        await sync({
            route:'vehicle-type',
        })
        .unwrap()
        .then(() => {
            toast.success('Success')
        })
    }

    return (
        <>
            <SubHeader title={'Vehicle Types'}>
                <Button colorScheme='orange' isLoading={isLoading} onClick={handleSynchronize}>Sync to Kronos</Button>
            </SubHeader >
            <Container>
                <VehicleTypeTable/>
            </Container>
        </>
  )
}

export default VehicleTypes