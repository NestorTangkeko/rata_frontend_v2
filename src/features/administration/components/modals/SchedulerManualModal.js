import React from 'react';
import Modal from 'components/Modal';
import {DatePicker} from 'components/datepicker'
import { Flex,Button, Text, Box } from '@chakra-ui/react';
import {useManualTriggerMutation} from 'lib/redux/api/scheduler.slice';
import Table from '../tables/SchedulerDtlTable';
//import {Form,FormInput} from 'compon  ents/form';
import {toast} from 'react-toastify';

const SchedulerManualModal = ({isOpen,onClose,id,hasCreate}) => {
    const [selected, setSelected] = React.useState();
    const [manualTrigger,{isLoading}] = useManualTriggerMutation()

    const handleConfirm = async() => {
        await manualTrigger({
            id,
            date:selected
        })
        .unwrap()
        .then(result => {
            toast.success('Job was started, please refrain from clicking the confirm button')
        })
    }

    return (
        <Modal title='Manual Job Trigger' isOpen={isOpen} onClose={onClose} size='80%'>
            <Flex gap={1} direction='column'>
                <Text><strong>JOB ID:</strong> {id}</Text>
                <Flex gap={2}>
                    <Box width={'70%'}>
                        <Table scheduler_id={id}/>
                    </Box>
                    <Box width={'30%'} borderWidth={1} rounded='sm'>
                        <DatePicker selected={selected} onSelect={setSelected}/>
                        <Button width={'100%'} rounded='none' colorScheme={'orange'} onClick={handleConfirm} isLoading={isLoading} disabled={!hasCreate}>Confirm</Button>
                    </Box>
                </Flex>                            
            </Flex>
        </Modal>    
    )
}

export default SchedulerManualModal