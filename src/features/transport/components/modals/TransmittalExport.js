import React from 'react'
import Modal from 'components/Modal';
import { useExportDataMutation } from 'lib/redux/api/data.export.api.slice';
import { useFormik } from 'formik';
import {  Button, Flex, Input } from '@chakra-ui/react';
import { FormControl } from 'components/form';
import { LocalSelect, Select } from 'components/select';
import { toast } from 'react-toastify';
import {transmittalExportSchema} from 'features/transport/validations';


function TransmittalExport({
    isOpen,
    onClose
}) {
    const [onExport,{isLoading}] = useExportDataMutation(); 
    
    const formik = useFormik({
        initialValues:{
            from: '',
            to:'',
            contract_type: null,
            location: null
        },
        validationSchema:transmittalExportSchema,   
        onSubmit: async(values) => {
            console.log(values)
            await onExport({
                route:'transport/transmittal',
                query:{
                    ...values,
                    location: values?.location?.value,
                    contract_type: values?.contract_type?.value
                }
            })
            .unwrap()
            .then(result => {
                toast.success('Export Success')
            })
        }
    })
    return (
        <Modal title={'Transmittal Export'} isOpen={isOpen} onClose={onClose}>
            <form onSubmit={formik.handleSubmit}>
                <Flex direction={'column'} gap={2}>
                    <FormControl label='From' error={formik.errors.from} touched={formik.touched.from}>
                        <Input type='date' name='from' value={formik.values.from} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                    </FormControl>
                    <FormControl label='To' error={formik.errors.to} touched={formik.touched.to}>
                        <Input type='date' name='to' value={formik.values.to} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                    </FormControl>
                    <FormControl error={formik.errors.contract_type} touched={formik.touched.contract_type}>
                        <LocalSelect
                            label={'Contract Type'}
                            type={'contract_type'}
                            value={formik.values.contract_type}
                            onChange={(selected) => formik.setFieldValue('contract_type',selected)}
                        />
                    </FormControl>
                    <FormControl error={formik.errors.location} touched={formik.touched.location}>
                        <Select
                            route={'location'}
                            label={'Location'}
                            name='location'
                            value={formik.values.location}
                            onChange={(selected) => formik.setFieldValue('location',selected)}
                        />
                    </FormControl>

                    <Flex justify={'flex-end'}>
                        <Button type='submit' colorScheme='orange' isLoading={isLoading}>
                            Export
                        </Button>
                    </Flex>
                </Flex>
                
            </form>
        </Modal>
    )
}

export default TransmittalExport