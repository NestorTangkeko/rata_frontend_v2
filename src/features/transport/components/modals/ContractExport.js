import React from 'react'
import Modal from 'components/Modal';
import { Button, Flex, Text } from '@chakra-ui/react';
import {Select} from 'components/select';
import DatePicker from 'components/datepicker/ReactDatePicker';
import { toast } from 'react-toastify';
import { useExportDataMutation } from 'lib/redux/api/data.export.api.slice';
import moment from 'moment';

function ContractExport({
    isOpen,
    onClose
}) {
    const [exporData,{isLoading}] = useExportDataMutation(); 
    const [selected,setSelected] = React.useState(null);
    const [date,setDate] = React.useState({
        from:null,
        to:null
    })

    const handleExport = async() => {
        if(!selected) {
            return toast.error('Please select a contract')
        }
        if(!date.from || !date.to){
            return toast.error('Please select validity date')
        }

        console.log(moment(date.from).format('YYYY-MM-DD'))

        await exporData({
            route:'transport/contract',
            query:{
                contract_id: selected?.value,
                from: moment(date.from).format('YYYY-MM-DD'),
                to: moment(date.to).format('YYYY-MM-DD')
            }
        })
        .unwrap()
        .then(result => {
            toast.success('Export Success')
        })
    }

    return (
    <Modal isOpen={isOpen} onClose={onClose} title={'Contract Export'}>
        <Flex direction={'column'} gap={2}>
            <Select
                label={'Contract'}
                route={'transport-contract'}
                value={selected}
                onChange={(selected) => setSelected(selected)}
            />
            <Flex direction={'column'}>
                <Text fontSize={'sm'} as='b'>Validity</Text>
                <DatePicker
                    selectsRange
                    placeholder={'Rate Validty'}
                    startDate={date.from}
                    endDate={date.to}
                    onChange={(dates) => {
                        
                        setDate({
                            ...date,
                            from: dates[0],
                            to: dates[1]
                        })
                    }}
                />
            </Flex>
            <Flex justify={'flex-end'}>
                <Button colorScheme='orange' onClick={handleExport} isLoading={isLoading}>Export</Button>
            </Flex>
            
        </Flex>
    </Modal>
  )
}

export default ContractExport