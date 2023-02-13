import React from 'react'
import {SubHeader, Container} from 'layouts';
import PrincipalTable from '../components/tables/PrincipalTable';
import Export from 'components/data-export';
import {useCheckAccess} from 'hooks';

const Principal = () => {
  const hasAccess = useCheckAccess({header_id:'data_management'})
  return (
    <>
        <SubHeader title={'Principal'}>
            <Export
                hidden={!hasAccess.export}
                route='data-management/principal'
                type={'principal'}
            />
        </SubHeader>
        <Container>
            <PrincipalTable/>
        </Container>
    </>
  )
}

export default Principal