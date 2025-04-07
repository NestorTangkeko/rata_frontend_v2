import React from 'react'
import Modal from 'components/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormControl } from 'components/form';
import DropZone from 'components/DropZone';
import { Flex,Button } from '@chakra-ui/react';
import { useGetCRTemplateMutation, useUploadCRMutation } from 'lib/redux/api/cr_upload.api.slice';

const crUploadSchema = Yup.object().shape({
  file: Yup.mixed().required('Please upload a file').test("fileSize", "Max allowed size is 1mb",
  value => {
	if (value) {
		return value.size <= 1000000;
	  }
	  return true;
  })
})


const UploadCRModal = ({
    isOpen,
    onClose
}) => {
	const [onDownload, {isLoading}] = useGetCRTemplateMutation();
  	const [onUpload, onUploadProps] = useUploadCRMutation();
	const formik = useFormik({
		initialValues:{
			file: null
		},
		validationSchema: crUploadSchema,
		onSubmit: async(values) => {
			const formData = new FormData();
			formData.append('file', values.file)
			await onUpload(formData).unwrap().then(result => {
				console.log(result)
			});
		}
	})

	const handleUpload = (data) => {
		formik.setFieldValue('file', data[0])
		
	}

	const handleDownload = async() => {
		await onDownload();
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose} title={'Confirmation Receipt Upload'}>
			<form onSubmit={formik.handleSubmit}>
				<Flex direction={'column'} gap='2'>
					<FormControl label={'Upload'} error={formik.errors.file} touched={formik.touched.file}>
						<DropZone
							accept={{
								'application/vnd.ms-excel':['.xls'],
								'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':['.xlsx'],
								'text/csv':['.csv']
							}}
							onUpload={handleUpload}
						/>
					</FormControl>
					
					<Flex justifyContent={'space-between'}>
						<Button size='sm' colorScheme='orange' onClick={handleDownload} isLoading={isLoading}>Download Template</Button>
						<Button size='sm' type='submit' colorScheme='orange' isLoading={onUploadProps.isLoading}>Upload</Button>
					</Flex>
				</Flex>
			</form>
		</Modal>
	)
}

export default UploadCRModal