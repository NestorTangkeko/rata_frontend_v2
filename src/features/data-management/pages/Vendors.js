import React from 'react';
import {Container, SubHeader} from 'layouts';
import VendorTable from '../components/tables/VendorTable';
import { Button, ButtonGroup, Tab, TabList, TabPanel, TabPanels, Tabs, useDisclosure } from '@chakra-ui/react';
import ICModal from '../components/modals/ICModal';
import Export from 'components/data-export';
import {useCheckAccess} from 'hooks';
import VendorGroupTable from '../components/tables/VendorGroupTable';
import { useNavigate } from 'react-router-dom';

const Vendors = () => {
    const hasAccess = useCheckAccess({header_id:'data_management'})
    const navigate=useNavigate();
    const [ic, setIC] = React.useState({
        is_ic:null,
        vendor_id:null
    }) 
    const [selected, setSelected] = React.useState(true);

    const icModalDisclosure = useDisclosure();

    const onSelectedIC = (data) => {
        setIC(data)
        icModalDisclosure.onOpen()
    }

    const goToDetails = (group_id) => {
        navigate(`/vendor-groups/${group_id}`);
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
            <Tabs>
                <TabList>
                    <Tab>Vendors</Tab>
                    <Tab>Vendor Groups</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <VendorTable handleICModal={onSelectedIC} hasEdit={hasAccess.edit}/>
                    </TabPanel>
                    <TabPanel>
                        <VendorGroupTable handleICModal={onSelectedIC} hasEdit={hasAccess.edit} goToDetails={goToDetails}/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
        <ICModal isOpen={icModalDisclosure.isOpen} onClose={icModalDisclosure.onClose} data={ic}/>
    </>
    )
}

export default Vendors