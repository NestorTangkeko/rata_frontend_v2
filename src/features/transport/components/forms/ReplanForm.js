import React from 'react';
import {Form} from 'components/form';
import {FormSelect} from 'components/select';
import {FormDateInput} from 'components/datepicker';

import {replanDraftBill} from '../../validations';
import { Button, Flex, Text} from '@chakra-ui/react';

import {useReplanMutation} from 'lib/redux/api/leak.api.slice';

import moment from 'moment';
import Label from 'components/Label';
import { toast } from 'react-toastify';

const ReplanForm = () => {

    const [replan,{isLoading}] = useReplanMutation()
    const [result,setResult] = React.useState({
        draft_bill: 0,
        revenue_leak:0,
        invoices: 0
    })

    const handleSubmit = async (values) => {
        await replan({
            contract_type: values.contract_type?.value,
            query:{
                rdd: moment(values.rdd).format('YYYY-MM-DD')
            }
        })
        .unwrap()
        .then(result => {
            setResult({
                draft_bill: result?.draft_bill,
                revenue_leak: result?.revenue_leak,
                invoices: result?.data
            })
            toast.success('Done!')
        })
    }

    return (
        <>
            <Flex direction={'column'} gap={1}>
                <Text>Result:</Text>
                <Flex justify={'space-around'}>
                    <Label label={'Draft Bill Count:'} value={result.draft_bill}></Label>
                    <Label label={'Revenue Leak Count:'} value={result.revenue_leak}></Label>
                    <Label label={'Invoices Count:'} value={result.invoices}></Label>
                
                </Flex>
            </Flex>
            <br/>
            <Form schema={replanDraftBill}
                onSubmit={handleSubmit}
                initialValues={{
                    contract_type: null,
                    rdd: null
                }}
            >
                {({errors, touched}) => (
                    <Flex direction={'column'} gap='2'>
                        <FormSelect
                            label={'Contract Type'}
                            name='contract_type'
                            route='quick-code'
                            filter={{
                                type:'CON_TYPE'
                            }}
                            error={errors.contract_type}
                            touched={touched.contract_type}
                        />
                        <FormDateInput
                            label={'RDD'}
                            name='rdd'
                            error={errors.rdd}
                            touched={touched.rdd}
                        />
                        
                        <Button type='submit' colorScheme={'orange'} isLoading={isLoading}>Confirm</Button>
                    </Flex>
                )}
            </Form>
            
        </>
       
    )
}

export default ReplanForm