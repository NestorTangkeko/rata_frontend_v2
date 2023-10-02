import React from 'react';
import {SubHeader,Container} from 'layouts';
import { Button, useDisclosure } from '@chakra-ui/react';

import ContractTable from '../../components/tables/ContractTable';
import { useNavigate } from 'react-router-dom';
// import DataExport from 'components/data-export';
import {useCheckAccess} from 'hooks'
import ContractExport from 'features/transport/components/modals/ContractExport';

const Contract = () => {
  const hasAccess = useCheckAccess({header_id:'transport_operations'})
  const navigate=useNavigate();
  const modal = useDisclosure();

  const goToDetails = (contract_id) => {
    navigate({
      pathname:`${contract_id}`,
    })
  }

  return (
    <>
        <SubHeader title={'Contracts'}>
            <Button colorScheme={'orange'} hidden={!hasAccess.export} onClick={modal.onOpen}>Export</Button>
            <Button colorScheme={'orange'} hidden={!hasAccess.create}>Create</Button>
        </SubHeader>
        <Container>
          <ContractTable goToDetails={goToDetails}/>
        </Container>
        <ContractExport isOpen={modal.isOpen} onClose={modal.onClose}/>
    </>
  )
}

export default Contract