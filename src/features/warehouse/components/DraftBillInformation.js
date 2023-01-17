import React from 'react'
import Label from 'components/Label';
import {Flex} from '@chakra-ui/react';


const DraftBillInformation = ({data}) => {

    return (
        <>
            <Flex direction={'row'} justifyContent='space-between'>
                <Flex direction={'column'}>
                    <Label label={'Draft Bill #'} value={data?.draft_bill_no}/>
                    <Label label={'Tariff ID'} value={data?.tariff_id }/>
                    <Label label={'Principal'} value={data?.customer || 'N/A'}/>
                    <Label label={'Service Type'} value={data?.service_type}/>
                    <Label label={'Location'} value={data?.location}/>
                </Flex>
                <Flex direction={'column'}>
                    <Label label={'Contract ID'} value={data?.contract_id}/>
                    <Label label={'Draft Bill Date'} value={data?.draft_bill_date }/>
                    <Label label={'Vendor'} value={data?.vendor || 'N/A'}/>
                    <Label label={'MBU'} value={data?.min_billable_unit}/>
                    <Label label={'Rate'} value={data?.rate}/>
                </Flex>
                <Flex direction={'column'}>
                    <Label label={'Status'} value={data?.status || 'N/A'}/>
                    <Label label={'Vehicle Type'} value={data?.vehicle_type || 'N/A'}/>
                    <Flex gap={'5'}>
                        <Label label={'Min Value'} value={data?.min_billable_value || 'N/A'}/>
                        <Label label={'Max Value'} value={data?.max_billable_value || 'N/A'}/>
                    </Flex>   
                    <Label label={'Total Charges'} value={data?.total_charges}/>
                </Flex>
                
            </Flex>
        </>
    )
}

export default DraftBillInformation