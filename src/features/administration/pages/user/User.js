import React from 'react';
import {SubHeader,Container} from 'layouts';
import {useCheckAccess} from 'hooks';
import UserTable from 'features/administration/components/tables/UserTable';
import { Button, useDisclosure } from '@chakra-ui/react';
import UserCreateModal from 'features/administration/components/modals/UserCreateModal';
import UserRoleModal from 'features/administration/components/modals/UserRoleModal';

const User = () => {
  const hasAccess = useCheckAccess({header_id:'administration'})
  const createModal = useDisclosure();

  return (
    <>
      <SubHeader title={'User Management'}>
        <Button colorScheme={'orange'} onClick={createModal.onOpen} hidden={!hasAccess.create}>Create</Button>
      </SubHeader>
      <Container>
          <UserTable hasEdit={hasAccess.edit}/>
      </Container>
      <UserCreateModal isOpen={createModal.isOpen} onClose={createModal.onClose}/>
      
    </>
  ) 
}

export default User