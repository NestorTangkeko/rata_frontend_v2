import React from 'react';
import Modal from 'components/Modal';
import { Flex, Input, Switch, Button } from '@chakra-ui/react';
import Label from 'components/Label';
import { useFormik } from 'formik';
import { FormControl } from 'components/form';
import { useUpdateReportMutation } from 'lib/redux/api/report.api.slice';
import { toast } from 'react-toastify';

const ReportEdit = ({isOpen=false,onClose=()=>{},data={}}) => {
    const [update, {isLoading}] = useUpdateReportMutation()    
    const formik = useFormik({
        enableReinitialize: true,
        initialValues:{
            cron: data.cron,
            is_active: data.is_active
        },
        onSubmit: async(values) => {
            await update({
                data: {
                    ...values,
                    id: data.id,
                    redis_key:data.redis_key,
                },
                report_name: data.report_name
            })
            .unwrap()
            .then(() => {
                toast.success('Success!')
            })
        }
    })
   
    return (
        <Modal title={'Report Setup'} isOpen={isOpen} onClose={onClose}>
            <Flex direction={'column'} gap='2'>
                <Flex gap='2'>
                    <Flex width={'50%'}>
                        <Label label={'Report Name'} value={data.report_name}/> 
                    </Flex>
                    <Label label={'Redis Key'} value={data.redis_key}/>
                </Flex>
                <form onSubmit={formik.handleSubmit}>
                    <Flex direction={'column'} gap='2'>
                        <Flex gap={2}>
                            <FormControl label='Cron'>
                                <Input size={'sm'} placeholder='Cron' name='cron' value={formik.values.cron} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                            </FormControl>
                            <FormControl label='Is Active'>
                                <Switch size='sm' name='is_active' isChecked={formik.values.is_active === 0 ? false : true} onChange={(e)=>{
                                    formik.setFieldValue('is_active',e.target.checked ? 1 : 0 )
                                }}/>
                            </FormControl>
                        </Flex>
                        <Button colorScheme='orange' size='sm' type='submit' isLoading={isLoading}>Confirm</Button>
                    </Flex>
                </form>
            </Flex>
        </Modal>
    )
}

export default ReportEdit