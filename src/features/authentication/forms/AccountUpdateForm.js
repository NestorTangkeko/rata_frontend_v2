import React from 'react';
import {Form, FormInput} from 'components/form';
import {accountSchema} from '../validations';
import { Button, Flex } from '@chakra-ui/react';
import { useAccountUpdateMutation } from 'lib/redux/api/auth.api.slice';
import { toast } from 'react-toastify';

const AccountUpdateForm = ({onClose}) => {
    const [update, updateProps] = useAccountUpdateMutation();
     const initialValues={
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    }

    const handleSubmit = async (values) => {
        await update({
            body:{
                data:{
                    oldPassword: values.oldPassword,
                    password: values.newPassword
                }
            }
        })
        .unwrap()
        .then(()=>{
            toast.success('Update Success!')
            onClose();
        })
    }

    return (
        <Form initialValues={initialValues} schema={accountSchema} onSubmit={handleSubmit}> 
            {({errors,touched})=>(
                <Flex direction={'column'} gap={2}>
                    <FormInput type={'password'} name='oldPassword' label={'Old Password'} touched={touched.oldPassword} error={errors.oldPassword}/>
                    <FormInput type={'password'} name='newPassword' label={'New Password'} touched={touched.newPassword} error={errors.newPassword}/>
                    <FormInput type={'password'} name='confirmPassword' label={'Confirm Password'} touched={touched.confirmPassword} error={errors.confirmPassword}/>
                    <Button colorScheme={'orange'} type='submit' isLoading={updateProps.isLoading}>Confirm</Button>
                </Flex>
            )}  
        </Form>
    )
}

export default AccountUpdateForm