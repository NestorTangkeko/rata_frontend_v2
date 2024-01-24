import React from 'react'
import { Container as CUIContainer, Button, Flex, useDisclosure } from '@chakra-ui/react';
import {Container, SubHeader, } from 'layouts';
import CostAllocModal from 'features/data-management/components/modals/CostAllocModal';
import CostAllocTable from 'features/data-management/components/tables/CostAllocTable';



const CostAllocation = () => {
  const createDisclosure = useDisclosure();
  return (
    <>
        <SubHeader title={'Cost Allocation Setup'}>
            <Button colorScheme='orange' onClick={createDisclosure.onOpen}>Create</Button>
        </SubHeader>
        <Container>
            <CostAllocTable/>
        </Container>
        <CostAllocModal isOpen={createDisclosure.isOpen} onClose={createDisclosure.onClose}/>
    </>
  )
}

export default CostAllocation