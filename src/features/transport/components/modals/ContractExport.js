import React from 'react'
import Modal from 'components/Modal';
import {Select} from 'components/select';
import { useExportDataMutation } from 'lib/redux/api/data.export.api.slice';
import { FormControl } from 'components/form';
import {contractExportSchema} from '../../validations';

import { Button, Flex, Input } from '@chakra-ui/react';
import { useFormik } from 'formik';
import moment from 'moment';
import { toast } from 'react-toastify';

function ContractExport({
    isOpen,
    onClose
}) {
    const [exporData,{isLoading}] = useExportDataMutation(); 
    const formik = useFormik({
        initialValues:{
            contract: null,
            from: '',
            to: ''
        },
        validationSchema:contractExportSchema,
        onSubmit: async(values) => {
            await exporData({
                route:'transport/contract',
                query:{
                    contract_id: values.contract?.value,
                    from: moment(values.from).format('YYYY-MM-DD'),
                    to: moment(values.to).format('YYYY-MM-DD')
                }
            })
            .unwrap()
            .then(result => {
                toast.success('Export Success')
            })
        }
    });

   
   
    return (
    <Modal isOpen={isOpen} onClose={onClose} title={'Contract Export'}>
        <form onSubmit={formik.handleSubmit}>
            <Flex direction={'column'} gap={2}>
                <FormControl error={formik.errors.contract} touched={formik.touched.contract}>
                    <Select
                        label={'Contract'}
                        route={'transport-contract'}
                        value={formik.values.contract}
                        onChange={(selected) => formik.setFieldValue('contract',selected)}
                    />
                </FormControl>
                
                <Flex direction={'column'} gap='1'>
                    <Flex gap='2'>
                        <FormControl label='Valid From' error={formik.errors.from} touched={formik.touched.from}>
                            <Input type='date' name='from' value={formik.values.from} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        </FormControl>
                        <FormControl label='Valid Until' error={formik.errors.to} touched={formik.touched.to}>
                            <Input type='date' name='to' value={formik.values.to} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        </FormControl>
                    </Flex>
                    
                </Flex>
                <Flex justify={'flex-end'}>
                    <Button type='submit' colorScheme='orange' isLoading={isLoading}>Export</Button>
                </Flex>
                
            </Flex>
        </form>
        
    </Modal>
  )
}

export default ContractExport