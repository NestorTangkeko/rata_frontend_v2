import React from 'react';
import {Form, FormInput} from 'components/form';
import {emailSchema} from '../../validation';
import { Button, Flex } from '@chakra-ui/react';

import {useCreateEmailMutation} from 'lib/redux/api/scheduler.slice';
import { toast } from 'react-toastify';

const SchedulerEmailForm = ({schedulerId}) => {
    const [addEmail, {isLoading}] = useCreateEmailMutation()
    
    const handleSubmit = async (data,{resetForm}) => {
        await addEmail({
            data:{
                ...data,
                scheduler_id: schedulerId
            }
        })
        .unwrap()
        .then(() => {
            resetForm();
            toast.success('Email Added!')
        })
    }

    return (
        <Form schema={emailSchema} onSubmit={handleSubmit} initialValues={{email: ''}}>
            {
                ({errors, touched})=>(
                    <Flex direction={'column'} gap='2'>
                        <FormInput label={'Email'} name='email' error={errors.email} touched={touched.email}/>
                        <Button colorScheme={'orange'} type='submit' isLoading={isLoading}>
                            Add
                        </Button>
                    </Flex>
                )
            }
        </Form>
    )
}

export default SchedulerEmailForm