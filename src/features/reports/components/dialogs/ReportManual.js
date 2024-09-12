import React from 'react'
import Modal from 'components/Modal';
import { Flex, Input, Switch, Button } from '@chakra-ui/react';
import Label from 'components/Label';
import { useFormik } from 'formik';
import { FormControl } from 'components/form';
import { toast } from 'react-toastify';
import { useManualReportTriggerMutation } from 'lib/redux/api/scheduler.slice';


const ReportManual = ({isOpen=false,onClose=()=>{},report='na'}) => {
    const [onTrigger, {isLoading}] = useManualReportTriggerMutation();
    const formik = useFormik({
        initialValues:{
            trip_date: ''
        },
        onSubmit: async(values) => {
            await onTrigger({
                report_name: report,
                trip_date: values.trip_date
            })
            .unwrap()
            .then(() => {
                toast.success('Manual Trigger Started!')
            })
        }
    })
    
    return (
        <Modal title={'Manual Report Trigger'} isOpen={isOpen} onClose={onClose}>
            <Flex direction={'column'} gap={'2'}>
                <form onSubmit={formik.handleSubmit}>
                    <Flex>
                        <FormControl label='Trip Date'>
                            <Input size={'sm'} placeholder='Trip Date' name='trip_date' value={formik.values.trip_date} onChange={formik.handleChange} onBlur={formik.handleBlur} type='date'/>
                        </FormControl>
                    </Flex>
                    <Flex justifyContent={'flex-end'}>
                        <Button isLoading={isLoading} type='submit'>Confirm</Button>
                    </Flex>
                </form>
            </Flex>
        </Modal>
  )
}

export default ReportManual