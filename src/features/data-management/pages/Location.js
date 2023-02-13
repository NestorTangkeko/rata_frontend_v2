import React from 'react';
import {SubHeader, Container} from 'layouts';
import LocationTable from '../components/tables/LocationTable';
import Export from 'components/data-export';
import {useCheckAccess} from 'hooks'
const Location = () => {
  const hasAccess = useCheckAccess({header_id:'data_management'})
  return (<>
        <SubHeader title={'Location'}>
            <Export 
              hidden={!hasAccess.export}
              route='data-management/location'
              type={'location'}
            />
        </SubHeader>
        <Container>
            <LocationTable/>
        </Container>
    </>
  )
}

export default Location