import React from 'react';
import Modal from 'components/Modal';
import {
	DateInput
} from 'components/input';
import { Button, Flex } from '@chakra-ui/react';
import {Select, LocalSelect} from 'components/select'
import {useConfirmTransportMutation} from 'lib/redux/api/ascii.api.slice';
import { toast } from 'react-toastify';

const TransmittalModal = ({
    isOpen,
    onClose,
    isRetransmit
}) => {
    
    const [confirm,{isLoading}] = useConfirmTransportMutation()

    const [state,setState] = React.useState({
		date:null,
        location: null,
        contract_type:null
	})

	const onConfirm = async () => {
		if(!state.date || state.date === '') {	
			return toast.error('Date is Required!')
		}

        if(!state.location){
            return toast.error('Location is Required!')
        }

        if(!state.contract_type) {
            return toast.error('Contract Type is Required!')
        }

        await confirm({
            query:{
                location:state.location.value,
                date: state.date,
                type: state.contract_type.value,
                isRetransmit
            }
        })
        .unwrap()
	}

    return (
        <Modal title={isRetransmit==='true' ? 'Retransmit to Ascii' :'Transmittal to Ascii'} isOpen={isOpen} onClose={onClose}>
        <Flex direction={'column'} gap='2'>
            <Select
                name='location'
                label={'Location'}
                value={state.location}
                route='location'
                onChange={(e) => {
                    setState({
                        ...state,
                        location:e
                    })
                }}
            />

            <LocalSelect
                name='contract_type'
                label={'Contract Type'}
                type='contract_type'
                value={state.contract_type}
                onChange={e => {
                    setState({
                        ...state,
                        contract_type: e
                    })
                }}

            />

            <DateInput 
                label='Trip Date'
                name='trip_date'
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