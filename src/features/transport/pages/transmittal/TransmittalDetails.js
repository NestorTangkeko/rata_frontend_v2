import React from 'react';
import {SubHeader, Container} from 'layouts';
import {Box, Button, Flex} from '@chakra-ui/react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Label from 'components/Label';
import { useGetDraftBillQuery } from 'lib/redux/api/ascii.api.slice';
import TransLogHeaderTable from 'features/transport/components/tables/TransLogHeaderTable';
import TransLogDetailTable from 'features/transport/components/tables/TransLogDetailTable';
import { useDispatch, useSelector } from 'react-redux';
import { getTransmittalState, setHeader } from 'lib/redux/transmittal.slice';

function TransmittalDetails() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {draft_bill} = useParams();
    const {isLoading,data} = useGetDraftBillQuery(draft_bill ?? 'n/a')
    const {header} = useSelector(getTransmittalState);

    const handleBack = () => {
        navigate(-1)
    }

    React.useEffect(() => {
        return () => dispatch(setHeader({
            header_id: null,
            transmitted_by: null,
            transmitted_date: null
        }))   
    },[])

    if(isLoading) return <>Loading...</>

    if(!data) return <Navigate to='/transport-transmittal' replace/>

    return (
    <>
        <SubHeader title={'Transmittal Log Details'}>
            <Button onClick={handleBack}>Back</Button>
        </SubHeader>
        <Container>
            <Flex>
                <Flex width={'50%'}>
                    <Label
                        label={'Draft Bill Number'}
                        value={data.draft_bill_no}
                    />
                </Flex>
                <Label
                    label={'Draft Bill Status'}
                    value={data.status}
                />
            </Flex>
            <br/>
                <Flex gap={5}>
                    <Flex width={'35%'}>
                        <TransLogHeaderTable/>
                    </Flex>
                    <Flex direction={'column'} gap='2'>
                        <Box display={'flex'} borderWidth={'1px'} rounded='sm' p='1' alignItems={'center'}>
                            <Flex width={'50%'}>
                                <Label
                                    label='Transmitted By'
                                    value={header.transmitted_by}
                                />
                            </Flex>
                            
                            <Label
                                label='Transmitted Date'
                                value={header.transmitted_date}
                            />
                        </Box>
                        <TransLogDetailTable/>
                    </Flex>
                    
                </Flex>
        </Container>
    </>
    )
}

export default TransmittalDetails