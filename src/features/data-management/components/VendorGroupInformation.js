import React from 'react';
import Label from 'components/Label';
import {Flex} from '@chakra-ui/react';


const VendorGroupInformation = ({data}) => {
    return <>
        <Flex irection={'row'} width='100%' p={2}>
            <Flex direction={'column'} width='50%'>
                <Label label={'Vendor Group'} value={data?.vg_code}/>
                <Label label={'Location'}        value={data?.location}/>
            </Flex>
            <Flex direction={'column'}>
                <Label label={'Description'}     value={data?.vg_desc}/>
                <Label label={'Contract Status'} value={data?.vg_status}/>
            </Flex>
        </Flex>
    </>
}

export default VendorGroupInformation