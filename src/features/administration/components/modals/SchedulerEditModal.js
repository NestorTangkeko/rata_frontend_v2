import React from 'react';
import Modal from 'components/Modal';
import { Flex,Button} from '@chakra-ui/react';
import Label from 'components/Label';
import {TimeInput} from 'components/input';
import Switch from 'components/input/Switch';
import {useUpdateSchedulerMutation} from 'lib/redux/api/scheduler.slice';
import moment from 'moment';
import { toast } from 'react-toastify';

const SchedulerEditModal = ({isOpen,onClose,data, handleChange}) => {
    const [update,{isLoading}] = useUpdateSchedulerMutation();

    const onChecked = (checked) => {
        handleChange({
            name:'is_active',
            value:!checked ? 0 : 1 
        })        
    }

    const onTimeChange = (e) => {
        handleChange({
            name:'start_time_label',
            value: e.target.value
        })
    }
    
    const onConfirm = async () => {
        const date = moment().format('YYYY-MM-DD')+` ${data.start_time_label}:00`

        if(!moment(date).isValid()) {
            return toast.error('Time is not valid')
        }

        const timeToCron = (date) => {
            return `${moment(date).format('mm')} ${moment(date).format('HH')} * * *`
        }

        await update({
            query: {
                id: data.id
            },
            data:{
                redis_key: data.redis_key,
                is_active: data.is_active,
                start_time_label: data.start_time_label,
                start_time_cron: moment(date).isValid() ? timeToCron(date) : '* * * * *'
            }
        })
        .unwrap()
        .then(result => {
            toast.success('Success!')
            onClose()
        })
    }   

    return (
        <Modal title='Update Job' isOpen={isOpen} onClose={onClose} size='50%'>
            <Flex>
                <Flex direction={'column'} gap={2} width='50%'>
                    <Label  label={'Scheduler ID'} value={data?.id || null}/>
                    <Switch label={'Status'} value={data?.is_active === 0 ? false : true} onChecked={onChecked}/>
                </Flex>
                <Flex width='50%' direction={'column'}>
                    <Label  label={' Start Time Label'} value={data?.start_time_label}/>
                    <TimeInput
                        label='Start Time'
                        name='start_time'
                        value={data?.start_time_label || ''}
                        onChange={onTimeChange}
                    />
                </Flex>
            </Flex>
            <br/>
            <Button float={'right'} colorScheme='orange' size='sm' onClick={onConfirm} isLoading={isLoading}>Confirm</Button>
        </Modal>
    )
}

export default SchedulerEditModal