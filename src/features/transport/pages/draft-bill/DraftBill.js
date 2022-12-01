import React from 'react';
import {SubHeader,Container} from 'layouts';
import DraftBillTable from '../../components/tables/DraftBillTable';

const DraftBill = () => {
  return (
    <>
        <SubHeader title={'Draft Bills'}>
        </SubHeader>
        <Container>
            <DraftBillTable/>
        </Container>
       
    </>
)
}

export default DraftBill