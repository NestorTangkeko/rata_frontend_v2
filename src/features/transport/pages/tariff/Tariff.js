import React from 'react'
import {SubHeader,Container} from 'layouts';
import { Button, useDisclosure } from '@chakra-ui/react';
import TariffTable from '../../components/tables/TariffTable';
import TariffModal from '../../components/modals/TariffModal';
import ExportData from 'components/data-export';
import {useCheckAccess} from 'hooks'

const Tariff = () => {
  const hasAccess = useCheckAccess({header_id:'transport_operations'})
  const toggleCreateTariff = useDisclosure();
  return (
    <>
        <SubHeader title={'Tariffs'}>
            <ExportData route={'transport/tariff'} type='transport-tariff' hidden={!hasAccess.export}/>
            <Button colorScheme={'orange'} onClick={toggleCreateTariff.onOpen} hidden={!hasAccess.create}>Create</Button>
        </SubHeader>
        <Container>
          <TariffTable />
          <TariffModal isOpen={toggleCreateTariff.isOpen} onClose={toggleCreateTariff.onClose} />
        </Container>
    </>
  )
}

export default Tariff