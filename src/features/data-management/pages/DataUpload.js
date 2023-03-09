import React from 'react';
import {Container, SubHeader, } from 'layouts';
import { Container as CUIContainer, Button, Flex } from '@chakra-ui/react';

import {LocalSelect} from 'components/select';
import DropZone from 'components/DropZone';

import {useGetTemplateMutation,useUploadDataMutation} from 'lib/redux/api/data.upload.api.slice';
import { toast } from 'react-toastify';

import {useXLSX,useCreateXLSX,useCheckAccess} from 'hooks';

const DataUpload = () => {
	//const hasAccess = useCheckAccess({header_id:'data_management'})
	
	const [getConverted,setConvert] = useXLSX();
	const [createXLSX] = useCreateXLSX();
	const [getTemplate, getTemplateProps] = useGetTemplateMutation();
	const [uploadData, uploadProps] = useUploadDataMutation();
	const [uploadType,setUploadType] = React.useState(null)
	
	const onUpload = React.useCallback((data)=>{
		setConvert(data[0])
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	const handleSelect = (values) => {
		setUploadType(values)
	}

	const handleUpload = async () => {
		if(!uploadType) return toast.error('Upload Type is required!')
		
		if(!getConverted) return toast.error('File is Required!')

		await uploadData({
			route:uploadType?.value || null,
			body:{
				data: getConverted
			}
		})
		.unwrap()
		.then(result => {
			createXLSX(result)
			toast.success('Upload Complete')
		})
		
	}

	const handleDownload = async() => {
		if(!uploadType) return toast.error('Upload Type is required!')
		await getTemplate({
			type:uploadType?.value || null,
		})
	}

  	return (<>
    	<SubHeader title={'Data Upload'}></SubHeader>
		<Container>
			<CUIContainer>
				<Flex gap={2} width='md' direction={'column'}>
					<LocalSelect
						type='data_upload'
						label={'Data Upload'}	
						width='md'
						value={uploadType}
						onChange={handleSelect}
					/>
					
					<DropZone 
						accept={{
							'application/vnd.ms-excel':['.xls'],
							'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':['.xlsx'],
							'text/csv':['.csv']
						}}
						onUpload={onUpload}
						onClear={()=>{setConvert(null)}}
						isDisabled={uploadProps.isLoading}
					/>
					
					<Flex justify={'space-between'}>
						<Button colorScheme={'orange'} onClick={handleDownload} isLoading={getTemplateProps.isLoading}>Template</Button>
						<Button colorScheme={'orange'} onClick={handleUpload} isLoading={uploadProps.isLoading}>Upload</Button>
					</Flex>

				</Flex>
			</CUIContainer>
		</Container>
  	</>
  )
}

export default DataUpload