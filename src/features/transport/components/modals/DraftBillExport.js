import React from 'react'
import Modal from 'components/Modal';
import { Button, Flex, Input } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { FormControl } from 'components/form';
import { LocalSelect } from 'components/select';
import { draftBillExportSchema } from 'features/transport/validations';
import { useExportDataMutation } from 'lib/redux/api/data.export.api.slice';
import { toast } from 'react-toastify';

function DraftBillExport({
    isOpen,
    onClose
}) {

    const [onExport,{isLoading}] = useExportDataMutation();


    const formik = useFormik({
        initialValues:{
            type: null,
            from: '',
            to:''
        },
        validationSchema: draftBillExportSchema,
        onSubmit: async(values) => {
            await onExport({
                route: '/transport/draft-bill',
                query:{
                    ...values,
                    type: values?.type.value,   
                }
            })
            .unwrap()
            .then(result => {
                toast.success('Export Success')
            })
        }
    })


    return (
        <Modal isOpen={isOpen} onClose={onClose} title={'Draft Bill Export'}>
            <form onSubmit={formik.handleSubmit}>
                <Flex direction={'column'} gap={2}>
                    <FormControl error={formik.errors.type} touched={formik.touched.type}>
                        <LocalSelect
                            label={'Field Type'}
                            type={'draft_bill_export'}
                            value={formik.values.type}
                            onChange={(selected) => formik.setFieldValue('type',selected)}
                        />
                    </FormControl>
                        <FormControl label='From' error={formik.errors.from} touched={formik.touched.from}>
                            <Input type='date' name='from' value={formik.values.from} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        </FormControl>
                        <FormControl label='To' error={formik.errors.to} touched={formik.touched.to}>
                            <Input type='date' name='to' value={formik.values.to} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
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

export default DraftBillExport