import React from 'react'
import {Button, Flex} from '@chakra-ui/react';
import Modal from '../Modal';
import {DateInput} from '../input';
import {Select} from '../select';
import {useExportDataMutation} from 'lib/redux/api/data.export.api.slice';
import { toast } from 'react-toastify';

const DataExportModal = ({
    isOpen,
    onClose,
    type,
    route
}) => {
    const [exportData,{isLoading}] = useExportDataMutation();
    const [state,setState] = React.useState({
        from:'',
        to:'',
        contract_id: null,
        location: null
    })
    
    const onChange  = (e) => {
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit = async() => {
        await exportData({
            route:route,
            query: {
                ...state,
                contract_id: state.contract_id?.value || '',
                location: state.location?.value || ''
            }
        })
        .unwrap()
        .then(result => {
            toast.success('Export Success')
        })
    }

    const render = () => {
        switch (type) { 
            case 'default': 
                return <>
                        <DateInput
                            label={'From'}
                            name='from'
                            value={state.from}
                            onChange={onChange}
                        />
                        <DateInput
                            label={'To'}
                            name='to'
                            value={state.to}
                            onChange={onChange}
                        />
                </>
            case 'transport-contract': 
            return  <Select
                        label={'Contract'}
                        route={type}
                        value={state.contract_id}
                        onChange={(selected) => {
                            setState({
                                ...state,
                                contract_id: selected
                            })
                        }}
            />
            case 'transport-tariff':
                return <Select
                        label={'Location'}
                        route={'location'}
                        value={state.location}
                        onChange={(selected) => {
                            setState({
                                ...state,
                                location: selected
                            })
                        }}
                />
            default : return <></>
        } 
    }

    return (
        <Modal title={'Data Export'} isOpen={isOpen} onClose={onClose}>
            <Flex direction='column' gap='3'> 
            {render()}
                <Button 
                    colorScheme={'orange'} 
                    isLoading={isLoading}
                    onClick={onSubmit}
                >
                    Submit
                </Button>
            </Flex>
        </Modal>
    )
}

export default DataExportModal