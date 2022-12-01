import React from 'react'
import Label from 'components/Label';
import {Flex} from '@chakra-ui/react';

const DraftBillInformation = ({data}) => {

    return (
        <>
            <Flex direction={'row'} justifyContent='space-between' px='16'>
                <Flex direction={'column'}>
                    <Label label={'Draft Bill No'} value={data?.draft_bill_no}/>
                    <Label label={'Contract ID'} value={data?.class_of_store || 'N/A'}/>
                    <Label label={'Contract Type'} value={data?.service_type }/>
                    <Label label={'Tariff ID'} value={data?.sub_service_type || 'N/A'}/>
                    <Label label={'Service Type'} value={data?.from_geo_type}/>
                    <Label label={'Sub Service Type'} value={data?.to_geo_type}/>
                </Flex>
            </Flex>
        </>
    )
}

export default DraftBillInformation