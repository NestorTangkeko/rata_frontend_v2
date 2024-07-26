import React from 'react'
import Modal from 'components/Modal';
import { useExportDataMutation } from 'lib/redux/api/data.export.api.slice';
import { FormControl } from 'components/form';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import { useFormik } from 'formik';
import moment from 'moment';
import { toast } from 'react-toastify';
import { invoiceSchema } from 'features/transport/validations';



const InvoiceExport = ({
    isOpen,
    onClose
}) => {
    const [exporData,{isLoading}] = useExportDataMutation(); 
    const formik = useFormik({
        initialValues:{
            trip_date_from: '',
            trip_date_to: '',
            cleared_date_from: '',
            cleared_date_to: ''
        },
        validationSchema: invoiceSchema,
        onSubmit: async(values) => {
            let query = {};

            if(moment(values.trip_date_from).isValid() && moment(values.trip_date_to).isValid()) {
                query = {
                    ...query,
                    trip_date_from: moment(values.trip_date_from).format('YYYY-MM-DD'),
                    trip_date_to: moment(values.trip_date_to).format('YYYY-MM-DD')
                }
            }

            if(moment(values.cleared_date_from).isValid() && moment(values.cleared_date_to).isValid()) {
                query = {
                    ...query,
                    cleared_date_from: moment(values.cleared_date_from).format('YYYY-MM-DD'),
                    cleared_date_to: moment(values.cleared_date_to).format('YYYY-MM-DD')
                }
            }

            await exporData({
                route:'transport/invoice',
                query:{
                    ...query
                }
            })
            .unwrap()
            .then(result => {
                toast.success('Export Success')
            })

        }
    })



    return (
        <Modal isOpen={isOpen} onClose={onClose} title={'Invoice Export'}>
            <form onSubmit={formik.handleSubmit}>
                <Flex direction={'column'} gap={2}>
                    <Text>Trip Date</Text>
                    <Flex gap='2'>
                        <FormControl label='Trip Date From' error={formik.errors.trip_date_from} touched={formik.touched.trip_date_from}>
                            <Input type='date' name='trip_date_from' value={formik.values.trip_date_from} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        </FormControl>
                        <FormControl label='Trip Date To' error={formik.errors.trip_date_to} touched={formik.touched.trip_date_to}>
                            <Input type='date' name='trip_date_to' value={formik.values.trip_date_to} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        </FormControl>
                    </Flex>
                    <Text>RUD Cleared Date</Text>
                    <Flex gap='2'>
                        <FormControl label='Cleared Date From' error={formik.errors.cleared_date_from} touched={formik.touched.cleared_date_from}>
                            <Input type='date' name='cleared_date_from' value={formik.values.cleared_date_from} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        </FormControl>
                        <FormControl label='Cleared Date To' error={formik.errors.cleared_date_to} touched={formik.touched.cleared_date_to}>
                            <Input type='date' name='cleared_date_to' value={formik.values.cleared_date_to} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        </FormControl>
                    </Flex>
                    <Flex justify={'flex-end'}>
                        <Button type='submit' colorScheme='orange' isLoading={isLoading}>Export</Button>
                    </Flex>
                </Flex>

            </form>
        </Modal>
    )
}

export default InvoiceExport