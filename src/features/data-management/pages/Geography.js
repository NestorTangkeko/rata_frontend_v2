import React from 'react'
import {SubHeader, Container} from 'layouts';
import GeographyTable from '../components/tables/GeographyTable';
import Export from 'components/data-export';
import {useCheckAccess} from 'hooks';
const Geography = () => {
  const hasAccess = useCheckAccess({header_id:'data_management'})
  return (<>
          <SubHeader title={'Geography'}>
            <Export 
              hidden={!hasAccess.edit}
              route='data-management/geography'
              type={'geography'}
            />
          </SubHeader>
          <Container>
              <GeographyTable/>
          </Container>
     </>
  
  )
}

export default Geography