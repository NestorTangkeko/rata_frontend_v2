import React from 'react';
import { Container, SubHeader } from 'layouts';
import { Flex, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import ReportLogsTable from '../components/tables/ReportLogsTable';

const ReportDetails = () => {
  const {report_name} = useParams()
  
  return (
    <>
      <SubHeader title={'Reports Details'}></SubHeader>
      <Container>
        <Flex direction={'column'}>
          <Text>Report Name: <strong>{report_name}</strong></Text>
        </Flex>
        <Flex>
          <ReportLogsTable/>
        </Flex>
      </Container>
    </>
    
  )
}

export default ReportDetails