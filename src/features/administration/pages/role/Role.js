import React from 'react'
import {SubHeader,Container} from 'layouts';
import {Button, useDisclosure} from '@chakra-ui/react';
import RoleTable from 'features/administration/components/tables/RoleTable';
import RoleCreateModal from 'features/administration/components/modals/RoleCreateModal';
import { useCheckAccess } from 'hooks';

const Role = () => {
    const createModal = useDisclosure();
    const hasAccess = useCheckAccess({header_id: 'administration'});
 

    return (
    <>
        <SubHeader title={'Role Management'}>
            <Button colorScheme={'orange'} onClick={createModal.onOpen} hidden={!hasAccess.create}>Create</Button>
        </SubHeader> 
        <Container>
            <RoleTable hasEdit={hasAccess.edit}/>
        </Container>
        <RoleCreateModal isOpen={createModal.isOpen} onClose={createModal.onClose}/>
    </>
    
  )
}

export default Role