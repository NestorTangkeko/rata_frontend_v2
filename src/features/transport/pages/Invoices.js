import React from 'react'
import {SubHeader, Container} from 'layouts';
// import {useDisclosure} from '@chakra-ui/react';
// import {Button} from '@chakra-ui/react';
import InvoicesTable from '../components/tables/InvoicesTable';
// import DataExport from 'components/data-export'
import {useCheckAccess} from 'hooks';
import { Button, useDisclosure } from '@chakra-ui/react';
import InvoiceExport from '../components/modals/InvoiceExport';

const Invoices = () => {
  const exportModal = useDisclosure();
  const hasAccess = useCheckAccess({header_id:'transport_operations'})
  return (<>
      <SubHeader title={'Invoices'}>
        <Button hidden={!hasAccess.export} colorScheme='orange' onClick={exportModal.onOpen}>Export</Button>
        {/* <DataExport
          hidden={!hasAccess.export}
          route={'transport/invoice'}
        /> */}
		  </SubHeader>
      <Container>
        <InvoicesTable/>
      </Container>
      <InvoiceExport isOpen={exportModal.isOpen} onClose={exportModal.onClose} />
  </>  
  )
}

export default Invoices