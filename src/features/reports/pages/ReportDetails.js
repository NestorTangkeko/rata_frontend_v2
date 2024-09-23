import React from 'react';
import { Container, SubHeader } from 'layouts';
import { Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import ReportLogsTable from '../components/tables/ReportLogsTable';
import ReportManual from '../components/dialogs/ReportManual';

const ReportDetails = () => {
  const {report_name} = useParams()
  const navigate = useNavigate();
  const manualReportDialog = useDisclosure();

  return (
    <>
      <SubHeader title={'Reports Details'}>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </SubHeader>
      <Container>
        <Flex direction={'row'} justify={'space-between'}>
          <Text>Report Name: <strong>{report_name}</strong></Text>
          { ['daily_accrual_expense' , 'daily_accrual_revenue'].includes(report_name) ? 
            <Button size={'sm'} onClick={manualReportDialog.onOpen}>Manual</Button> : null
          }
         
        </Flex>
        <br/>
        <Flex>
          <ReportLogsTable/>
        </Flex>
      </Container>
      <ReportManual isOpen={manualReportDialog.isOpen} onClose={manualReportDialog.onClose} 
        report={
          report_name 
        }
      />
    </>
    
  )
}

export default ReportDetails