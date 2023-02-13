import React from 'react'
import {SubHeader, Container} from 'layouts';
import QuickCodeTable from '../components/tables/QuickCodeTable';
import Export from 'components/data-export';
import {useCheckAccess} from 'hooks'

const QuickCode = () => {
  const hasAccess = useCheckAccess({header_id:'data_management'})
  return (
    <>
        <SubHeader title={'Quick Code'}>
          <Export
            hidden={!hasAccess.export}
            route='data-management/quick-code'
            type={'quick-code'}
          />
        </SubHeader>
        <Container>
            <QuickCodeTable/>
        </Container>
    </>
  )
}

export default QuickCode