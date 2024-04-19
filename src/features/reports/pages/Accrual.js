import React from 'react'
import ReportHeaderTable from '../components/tables/ReportHeaderTable';
import { Container, SubHeader } from 'layouts';


const Accrual = () => {
  return (
    <>
        <SubHeader title={'Accrual Reports'}></SubHeader>
        <Container>
            <ReportHeaderTable
                filters={{
                    report_type:'ACCRUAL'
                }}
            />
        </Container>
    </>    
)
}

export default Accrual