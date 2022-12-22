import React from 'react';
import {Container, SubHeader} from 'layouts';
import VendorTable from '../components/tables/VendorTable';
import { useDisclosure } from '@chakra-ui/react';
import ICModal from '../components/modals/ICModal';


const Vendors = () => {
    const [ic, setIC] = React.useState({
        is_ic:null,
        vendor_id:null
    }) 

    const icModalDisclosure = useDisclosure();

    const onSelectedIC = (data) => {
        console.log(data)
        setIC(data)
        icModalDisclosure.onOpen()
    }

    return (<>
        <SubHeader title={'Vendors'}></SubHeader>
        <Container>
            <VendorTable handleICModal={onSelectedIC}/>
        </Container>
        <ICModal isOpen={icModalDisclosure.isOpen} onClose={icModalDisclosure.onClose} data={ic}/>
    </>
    )
}

export default Vendors