import React from 'react'
import Label from 'components/Label';
import {Form,FormInput,FormLocalSelect,FormSwitch} from 'components/form';
import {algorihtmSchema} from '../../validations';
import { Flex, Box,Button } from '@chakra-ui/react';
import {useCreateDataMutation} from 'lib/redux/api/data.management.api.slice';

const CreateAlgoForm = ({onSubmit}) => {
    const [create,{isLoading}] = useCreateDataMutation(); 
    const initialValues = {
        agg_name: '',
        algo_description:'',
        with_agg: false,
        parameter:null,
        group_by: null,
        status: 'INACTIVE'
    }

    const handleSubmit=async(values)=>{
        await create({
            route:'algorithm',
            body: {
                data:{
                    ...values,
                    group_by: values.group_by ? values.group_by.map(item => item.value).join(',') : null,
                    parameter:  values.parameter?.value 
                }
            }
        })
        .unwrap()
        .then(()=>{
            onSubmit({
                ...values,
                group_by: values.group_by ? values.group_by.map(item => item.value).join(',') : null,
                parameter:  values.parameter?.value 
            })
        })
    }

    return (
        <Form
            onSubmit={handleSubmit}
            schema={algorihtmSchema}
            initialValues={initialValues}
        >
            {({errors,touched,values,setFieldValue})=>{
                return (
                    <Flex gap={2}>
                    <Flex direction={'column'} width='50%' gap='2'>
                        <FormInput 
                            label={'Algo Name'} 
                            name='agg_name' 
                            error={errors.agg_name} 
                            touched={touched.agg_name}/>
                        
                        <FormSwitch
                            label={'With Aggregation?'}
                            name='with_agg'
                            touched={touched.with_agg}
                            error={errors.with_agg}
                            onChange={()=>{
                                setFieldValue('parameter',null)
                                setFieldValue('group_by',null)
                            }}
                        />
                        <FormLocalSelect
                            label={'Parameter (UOM to be aggregated)'}
                            name='parameter'
                            type={'aggregate_by'}
                            isDisabled={!values.with_agg}
                            touched={touched.group_by}
                            error={errors.group_by}
                        />
                    </Flex>
                    <Flex direction={'column'} width='50%' gap='2'>
                        <FormInput
                            label={'Algorithm Description'}
                            name='algo_description'
                            touched={touched.algo_description}
                            error={errors.algo_description}
                        />
                        <Box p={'0.5'}>
                            <Label label='Status' value={values.status}/>
                        </Box>    
                        <FormLocalSelect
                            label={'Grouping'}
                            name='group_by'
                            type={'group_by'}
                            isDisabled={!values.with_agg}
                            isMulti
                            touched={touched.parameter}
                            error={errors.parameter}
                        />
                        <Flex>
                            <Flex flexGrow={1}/>
                            <Button type='submit' colorScheme={'orange'} isLoading={isLoading}>Save</Button>
                        </Flex>
                        
                    </Flex>
                    
                </Flex>
                )
            }}
        </Form>
    )
}

export default CreateAlgoForm