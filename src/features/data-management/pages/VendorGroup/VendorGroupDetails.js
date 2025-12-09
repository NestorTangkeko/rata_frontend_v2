import React from 'react'
import {Container, SubHeader} from 'layouts';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import {Button, Text, Spacer, Flex, useDisclosure, TabPanel, Tabs, TabList, TabPanels, Tab} from '@chakra-ui/react';

import {toast} from 'react-toastify';
import { useGetDataQuery } from 'lib/redux/api/table.api.slice';
import VendorGroupInformation from '../../components/VendorGroupInformation';
import VendorGroupMappingTable from 'features/data-management/components/tables/VendorGroupMappingTable';
import { useCheckAccess, useCheckAccesSub } from 'hooks';

const VendorGroupDetails = () => {
    const navigate  = useNavigate();
    const params    = useParams();
    const hasAccess = useCheckAccesSub({header_id:'data_management'})
    const renewDialog = useDisclosure();

    const {data,isSuccess,isLoading} = useGetDataQuery({
        route: '/v2/data-management/vendor-groups/details/' + params.group_id
    });

    if(isLoading) {
        return <span>Loading...</span>
    }    

    if(isSuccess && !data.vg_code ) {
       return <Navigate to='/vendors' replace={true}/>
    }

    return (
        <>
            <SubHeader title={'Vendor Group Details'}>
                <Button size={'sm'} onClick={()=>{navigate(-1)}}>Back</Button>
            </SubHeader>
            <Container>
                <Text>Vendor Group Information</Text>
                <VendorGroupInformation data={data}/>
            </Container>
            <Container>
                <VendorGroupMappingTable data={params.group_id} hasEdit={hasAccess.edit}/>
            </Container>
        </>    
    )
}

export default VendorGroupDetails