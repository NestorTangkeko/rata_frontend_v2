import React from 'react';
import Label from 'components/Label';
import {Flex} from '@chakra-ui/react';
//import TariffModal from '../components/modals/TariffModal';

const TariffInformation = ({data}) => {
    //const {isOpen,onOpen,onClose} = useDisclosure();

    return (
        <>
            <Flex direction={'row'} width='100%' p={2}>
                <Flex direction={'column'} width='50%'>
                    <Label label={'Tariff ID'} value={data?.tariff_id}/>
                    <Label label={'Class of Store'} value={data?.class_of_store || 'N/A'}/>
                    <Flex direction='row' columnGap={'20'}>
                        <Label label={'Service Type'} value={data?.service_type }/>
                        <Label label={'Sub Service Type'} value={data?.sub_service_type || 'N/A'}/>
                    </Flex>
                    <Label label={'Vehicle Type'} value={data?.vehicle_type || 'NA'}/>
                    <Label label={'Geo Type From'} value={data?.from_geo_type}/>
                    <Label label={'Geo Type to'} value={data?.to_geo_type}/>
                </Flex>

                <Flex direction={'column'}>
                    <Label label={'Tariff Description'} value={data?.tariff_desc}/>
                    <Label label={'Tariff Status'} value={data?.tariff_status}/>
                    <Flex direction={'row'} columnGap='20' >
                        <Label label={'Min. Billable Unit'} value={data?.min_billable_unit || 'N/A'}/>
                        <Label label={'Min. Value'} value={data?.min_value || 'N/A'}/>
                        <Label label={'Max. Value'} value={data?.max_value || 'N/A'}/>
                    </Flex>
                    <Label label={'Location'} value={data?.location}/>
                    <Label label={'From Geo'} value={data?.from_geo}/>
                    <Label label={'To Geo'} value={data?.to_geo}/>
                </Flex>
            </Flex>
            
        </>
    )
}

export default TariffInformation