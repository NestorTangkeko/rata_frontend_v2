import React from 'react'

import {SubHeader,Container} from 'layouts';
import { Button, useDisclosure } from '@chakra-ui/react';
//import { useLocation,useNavigate,  } from 'react-router-dom';

import TariffTable from '../../components/tables/TariffTable';
import TariffModal from '../../components/modals/TariffModal';

const Tariff = () => {
  // const navigate = useNavigate();
  // const location = useLocation();
  const toggleCreateTariff = useDisclosure();
  return (
    <>
        <SubHeader title={'Tariffs'}>
            <Button colorScheme={'orange'} size='sm' onClick={toggleCreateTariff.onOpen}>Create</Button>
        </SubHeader>
        <Container>
          <TariffTable/>
          <TariffModal isOpen={toggleCreateTariff.isOpen} onClose={toggleCreateTariff.onClose}/>
        </Container>
    </>
  )
}

export default Tariff