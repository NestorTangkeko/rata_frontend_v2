import React from 'react';
import Modal from 'components/Modal';
import {
	DateInput
} from 'components/input';
import { Button, Flex } from '@chakra-ui/react';
import {useConfirmWarehouseMutation} from 'lib/redux/api/ascii.api.slice';
import { toast } from 'react-toastify';

const TransmittalModal = ({
    isOpen,
    onClose
}) => {
	const [confirm, {isLoading}] = useConfirmWarehouseMutation();
	const [state,setState] = React.useState({
		date:null
	})

	const onConfirm = async () => {
		if(!state.date || state.date === '') {	
			return toast.error('Date is Required!')
		}

		await confirm({
			query:{
				date: state.date
			}
		})
		.unwrap()
	}

  	return (
		<Modal title='Transmittal to Ascii' isOpen={isOpen} onClose={onClose}>
			<Flex direction={'column'} gap='2'>
				<DateInput 
					label='Draft Bill Date'
					name='draft_bill_date'
					value={state.date}
					onChange={(e) => {
						setState({
							...state,
							date: e.target.value
						})
					}}
				/>	
				<Button colorScheme={'orange'} isLoading={isLoading} onClick={onConfirm	}>Confirm</Button>
			</Flex>
		</Modal>
	)
}

export default TransmittalModal 