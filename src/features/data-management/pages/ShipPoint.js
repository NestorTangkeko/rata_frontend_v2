import React from 'react';
import {SubHeader, Container} from 'layouts';
import ShipPointTable from '../components/tables/ShipPointTable';
import Export from 'components/data-export';
import {useCheckAccess} from 'hooks';

const ShipPoint = () => {
  const hasAccess = useCheckAccess({header_id:'data_management'})
  return (<>
    <SubHeader title={'Ship Point'}>
      <Export 
          hidden={!hasAccess.export}
          route='data-management/ship-point'
          type={'ship-point'}
        />
    </SubHeader>
    <Container>
        <ShipPointTable/>
    </Container>
</>)
}

export default ShipPoint