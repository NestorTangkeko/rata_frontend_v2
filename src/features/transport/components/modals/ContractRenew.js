import React from 'react'
import Modal from 'components/Modal';
import DatePicker from 'components/datepicker/ReactDatePicker';
import { Flex,Grid,GridItem,Text, Button } from '@chakra-ui/react';
import Label from 'components/Label';
import { useUpdateTransportContractValidityMutation } from 'lib/redux/api/contract.api.slice';
import { toast } from 'react-toastify';
import moment from 'moment';


function ContractRenew({
    isOpen,
    onClose,
    ...props
}) {
    const [update, {isLoading}] = useUpdateTransportContractValidityMutation();
    const [date,setDate] = React.useState({
        from:null,
        to:null
    })

    const updateContract = async() => {
        
        if(!date.from || !date.to) return toast.error('Validity from or to is required!');
        
        if(moment(date.to).diff(date.from) < 0) return toast.error('Invalid contract validity')

        await update({
            contract_id: props.contract_id,
            valid_from: moment(date.from).format('YYYY-MM-DD'),
            valid_to: moment(date.to).format('YYYY-MM-DD')
        })
        .unwrap()
        .then(result => {
            toast.success('Contract updated!')
            onClose();
        })
    }
 
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={'Contract Renewal'}>
            <Grid templateColumns={'repeat(2, 1fr)'} rowGap={2} columnGap={2}>
                <GridItem colSpan={2}>
                    <Text fontSize={'md'} as='b'>Old Validity</Text>
                </GridItem>
                <Label label={'From'} value={props.valid_from}/>
                <Label label={'To'} value={props.valid_to}/>
                <GridItem colSpan={2}>
                    <Text fontSize={'md'} as='b'>New Validity</Text>
                </GridItem>
                <Flex direction={'column'}>
                    <Text fontSize={'sm'}>From</Text>
                    <DatePicker
                        selectsStart
                        selected={date.from}
                        placeholder={'From'}
                        startDate={date.from}
                        endDate={date.to}
                        onChange={(from) => {
                            setDate({
                                ...date,
                                from,
                                to:null
                            })
                        }}
                    />
                </Flex>
                <Flex direction={'column'}>
                    <Text fontSize={'sm'}>To</Text>
                    <DatePicker
                            selectsEnd
                            selected={date.to}
                            placeholder={'To'}
                            startDate={date.from}
                            endDate={date.to}
                            onChange={(to) => {
                                setDate({
                                    ...date,
                                    to
                                })
                            }}
                        />
                </Flex>
                <GridItem colSpan={2}>
                    <Flex justify='flex-end'>
                        <Button isLoading={isLoading} colorScheme='orange' onClick={updateContract}>Confirm</Button>
                    </Flex>
                </GridItem>
            </Grid>
        </Modal>
    )
}

export default ContractRenew