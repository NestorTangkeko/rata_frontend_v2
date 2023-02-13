import React from 'react';
import {Container, SubHeader} from 'layouts';
import VendorTable from '../components/tables/VendorTable';
import { useDisclosure } from '@chakra-ui/react';
import ICModal from '../components/modals/ICModal';
import Export from 'components/data-export';
import {useCheckAccess} from 'hooks';

const Vendors = () => {
    const hasAccess = useCheckAccess({header_id:'data_management'})
    const [ic, setIC] = React.useState({
        is_ic:null,
        vendor_id:null
    }) 

    const icModalDisclosure = useDisclosure();

    const onSelectedIC = (data) => {
        setIC(data)
        icModalDisclosure.onOpen()
    }

    return (<>
        <SubHeader title={'Vendors'}>
            <Export 
                hidden={!hasAccess.export}
                route='data-management/vendor'
                type={'vendor'}
            />
        </SubHeader>
        <Container>
            <VendorTable handleICModal={onSelectedIC} hasEdit={hasAccess.edit}/>
        </Container>
        <ICModal isOpen={icModalDisclosure.isOpen} onClose={icModalDisclosure.onClose} data={ic}/>
    </>
    )
}

export default Vendors