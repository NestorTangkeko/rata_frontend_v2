import React from 'react';
import Label from 'components/Label';
import {Flex} from '@chakra-ui/react';


const ContractInformation = ({data}) => {
    return <>
        <Flex irection={'row'} width='100%' p={2}>
            <Flex direction={'column'} width='50%'>
                <Label label={'Contract ID'}    value={data?.contract_id}/>
                <Label label={'Contract Type'}  value={data?.contract_type}/>
                <Label label={'Principal'}      value={data?.principal_code}/>
                <Label label={'Valid From'}     value={data?.valid_from}/>
            </Flex>
            <Flex direction={'column'}>
                <Label label={'Description'}     value={data?.contract_description}/>
                <Label label={'Contract Status'} value={data?.contract_status}/>
                <Label label={'Trucker Group'}   value={data?.vendor_group}/>
                <Label label={'Valid To'}        value={data?.valid_to}/>
            </Flex>
        </Flex>
    </>
}

export default ContractInformation