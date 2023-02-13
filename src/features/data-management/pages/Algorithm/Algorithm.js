import React from 'react'
import {SubHeader, Container} from 'layouts';
import AlgorithmTable from '../../components/tables/AlgorithmTable';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Export from 'components/data-export';
import {useCheckAccess} from 'hooks';

const Algorithm = () => {
    const hasAccess = useCheckAccess({header_id:'data_management'})
    const navigate = useNavigate();
    return (
    <>
        <SubHeader title={'Algorithm'}>
            <Export
                hidden={!hasAccess.export}
                route={'data-management/algorithm'}
                type='algorithm'
            />
            <Button colorScheme={'orange'} onClick={()=>{navigate('create')}} hidden={!hasAccess.create}>Create</Button>
        </SubHeader>
        <Container>
            <AlgorithmTable hasEdit={hasAccess.edit}/>
        </Container>
    </>
  )
}

export default Algorithm