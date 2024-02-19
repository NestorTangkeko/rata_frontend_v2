import React from 'react';
import {FormControl } from 'components/form';
import { costAllocSchema} from '../../validations';
import {Flex, Button} from '@chakra-ui/react';
import { useFormik } from 'formik';
import {Select,LocalSelect} from 'components/select';
import {Switch} from 'components/input';
import { useCreateDataMutation } from 'lib/redux/api/data.management.api.slice';
import { toast } from 'react-toastify';


const CreateCostAllocSetup = () => {
	const [create, {isLoading}] = useCreateDataMutation()
 	const formik = useFormik({
		initialValues:{
			service_type: null,
			draft_bill_type: null,
			is_active: false
		},
		validationSchema: costAllocSchema,
		onSubmit: async (values,{resetForm}) => {
			await create({
				route:'cost-allocation',
				body: {
					...values,
					service_type: values.service_type.value,
					draft_bill_type: values.draft_bill_type.value
				}
			})
			.unwrap()
			.then(result => {
				toast.success('Success')
				resetForm();
			})
		}
	})

	
	return (
		<form onSubmit={formik.handleSubmit}>
			<Flex direction={'column'} gap={2}>
				<FormControl  error={formik.errors.service_type} touched={formik.touched.service_type}>
					<Select
						label={'Service Type'}
						route={'quick-code'}
						value={formik.values.service_type}
						filter={{
							type: 'SRV_TYP'
						}}
						onChange={(selected) => formik.setFieldValue('service_type',selected)}
					/>
				</FormControl>
				<FormControl error={formik.errors.draft_bill_type} touched={formik.touched.draft_bill_type}>
					<LocalSelect
						label={'Draft Bill Type'}
						value={formik.values.draft_bill_type}
						onChange={(selected) => formik.setFieldValue('draft_bill_type',selected)}
						type={'contract_type'}
					/>
				</FormControl>
				<FormControl id='is_active' error={formik.errors.is_active} touched={formik.touched.is_active}>
					<Switch
						label={'Is Active'}
						value={formik.values.is_active}
						onChecked={(value) => formik.setFieldValue('is_active',value)}
					/>
				</FormControl>
				<Flex direction={'row'} justify={'end'}>
					<Button isLoading={isLoading} colorScheme='orange' type='submit'>Confirm</Button>
				</Flex>
			</Flex>
		</form>
	)
}

export default CreateCostAllocSetup