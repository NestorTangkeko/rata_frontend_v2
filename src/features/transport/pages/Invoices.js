import React from 'react'
import {SubHeader, Container} from 'layouts';
// import {useDisclosure} from '@chakra-ui/react';
// import {Button} from '@chakra-ui/react';
import InvoicesTable from '../components/tables/InvoicesTable';
import DataExport from 'components/data-export'
import {useCheckAccess} from 'hooks';

const Invoices = () => {
  const hasAccess = useCheckAccess({header_id:'transport_operations'})
  return (<>
      <SubHeader title={'Invoices'}>
        <DataExport
          hidden={!hasAccess.export}
          route={'transport/invoice'}
        />
		  </SubHeader>
      <Container>
        <InvoicesTable/>
      </Container>
  </>  
  )
}

export default Invoices