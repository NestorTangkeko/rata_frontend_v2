import React from 'react';
import Modal from 'components/Modal';
import { Flex,Button } from '@chakra-ui/react';
import Label from 'components/Label';
import {Switch} from 'components/input';

import {useUpdateDataMutation} from 'lib/redux/api/data.management.api.slice';
import { toast } from 'react-toastify';

const ICModal = ({isOpen,onClose,data}) => {
	const [isIC,setIC] = React.useState(false);
	const [updateVendor, {isLoading}] = useUpdateDataMutation()

	
	const handleChecked = (checked) => {
		setIC(checked)
	}

	const handleConfirm = async() => {
		updateVendor({
			route:'vendors',
			query:{
				vendor_id: data.vendor_id,
			},
			body:{
				is_ic: isIC
			}
		})
		.unwrap()
		.then(result => {
			toast.success('Success!')
			onClose()
		})
	}

	React.useEffect(() => {
		setIC(data.is_ic)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[isOpen])

    return (
        <Modal title='Is IC?' isOpen={isOpen} onClose={onClose}>
			<Flex direction='column' gap='2'>
			<Flex justify={'space-evenly'}>
				<Label label={'Vendor ID'} value={data?.vendor_id || null}/>
				<Switch label={'IS IC'} value={isIC} onChecked={handleChecked}/>
			</Flex>
			<Button colorScheme={'orange'} isLoading={isLoading} onClick={handleConfirm}>Confirm</Button>
			</Flex>
		</Modal>
    )
}

export default ICModal