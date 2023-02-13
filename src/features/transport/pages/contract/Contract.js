import React from 'react';
import {SubHeader,Container} from 'layouts';
import { Button } from '@chakra-ui/react';

import ContractTable from '../../components/tables/ContractTable';
import { useNavigate } from 'react-router-dom';
import DataExport from 'components/data-export';
import {useCheckAccess} from 'hooks'

const Contract = () => {
  const hasAccess = useCheckAccess({header_id:'transport_operations'})
  const navigate=useNavigate();

  const goToDetails = (contract_id) => {
    navigate({
      pathname:`${contract_id}`,
    })
  }

  return (
    <>
        <SubHeader title={'Contracts'}>
            <DataExport type='transport-contract' route={'transport/contract'} hidden={!hasAccess.export}/>
            <Button colorScheme={'orange'} hidden={!hasAccess.create}>Create</Button>
        </SubHeader>
        <Container>
          <ContractTable goToDetails={goToDetails}/>
        </Container>
    </>
  )
}

export default Contract