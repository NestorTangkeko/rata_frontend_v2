import React from 'react';
import {Form,FormInput} from 'components/form';
import {FormSelect} from 'components/select';
import {userSchema} from '../../validation';
import { Button, Flex } from '@chakra-ui/react';
import {useCreateAdminDataMutation} from 'lib/redux/api/administration.api.slice';
import { toast } from 'react-toastify';

const UserCreateForm = () => {
    const [createUser,createUserProps] = useCreateAdminDataMutation();
    const initialValues = {
        email:'',
        role:null,
        first_name: '',
        last_name: ''
    }
    
    const handleSubmit = async (values) => {
        await createUser({
            route:'user',
            body:{
                data:{
                    email: values.email,
                    user_role_id: values.role?.value,
                    first_name: values.first_name,
                    last_name: values.last_name
                }
            }
        })
        .unwrap()
        .then(() => {
            toast.success('User Created!')
            onclose();
        })
    }

    return (
       <Form schema={userSchema} onSubmit={handleSubmit} initialValues={initialValues}>
            {
                ({errors,touched}) => (
                    <Flex direction={'column'} gap='2'>
                        <FormInput name='email' label={'Email'} touched={touched.email} error={errors.email}/>
                        <FormInput name='first_name' label={'First Name'} touched={touched.first_name} error={errors.first_name}/>
                        <FormInput name='last_name' label={'Last Name'} touched={touched.last_name} error={errors.last_name}/>
                        <FormSelect name='role' label={'Role'} route='roles' touched={touched.role} error={errors.role}/>
                        <Button type='submit' colorScheme={'orange'} isLoading={createUserProps.isLoading}>Submit</Button>
                    </Flex>
                )
            }
       </Form> 
  )
}

export default UserCreateForm