import React from 'react'
import Modal from 'components/Modal';
import { useFormik } from 'formik';
import {draftBillExportSchema} from 'features/transport/validations'
import { FormControl } from 'components/form';
import { LocalSelect } from 'components/select';
import { Button, Flex, Input } from '@chakra-ui/react';
import { useExportSoMutation } from 'lib/redux/api/so_upload.api.slice';


const ExportSoModal = ({
    isOpen,
    onClose
}) => {
    const [onExport, exportProps] = useExportSoMutation();

    const formik = useFormik({
        initialValues:{
            type: null,
            from: '',
            to:''
        },
        validationSchema: draftBillExportSchema,
        onSubmit: async(values) => {
            await onExport({
              query:{
                ...values,
                type: values?.type.value,
              }
            }).unwrap()
        }
    })

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={'Sales Order Upload'}>
        <form onSubmit={formik.handleSubmit}>
          <Flex direction={'column'} gap={2}>
            <FormControl error={formik.errors.type} touched={formik.touched.type}>
              <LocalSelect
                  label={'Field Type'}
                  type={'so_status'}
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
              <Button type='submit' colorScheme='orange' isLoading={exportProps.isLoading}>Confirm</Button>
            </Flex>
          </Flex>
        </form>
    </Modal>
    )
}

export default ExportSoModal