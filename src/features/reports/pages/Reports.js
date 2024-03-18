import ReportHeaderTable from '../components/tables/ReportHeaderTable';
import { Container, SubHeader } from 'layouts';
import React from 'react';

const PreBilling = () => {

return (<>
        <SubHeader title={'Reports'}></SubHeader>
        <Container>
            <ReportHeaderTable/>
        </Container>
  </>)
}

export default PreBilling
