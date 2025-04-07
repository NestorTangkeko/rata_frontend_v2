import React from 'react'
import { accountSchema } from '../validations'
import {Form, FormControl} from 'components/form';
import {Field}      from 'formik';

import { VStack, Button, Input, Box } from '@chakra-ui/react';
import { useUpdateUserPasswordMutation } from 'lib/redux/api/administration.api.slice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogOut } from 'lib/redux';

const UpdatePasswordForm = () => {
    const [onUpdate, {isLoading}] = useUpdateUserPasswordMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const initialValues={
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    }

    const handleSubmit = async (values) => {
        await onUpdate({
            body: {
                ...values
            }
        })
        .unwrap()
        .then(() => {
            toast.success('Password Updated!');
            dispatch(setLogOut());
            navigate('/login', {replace: true});
        });
    }

    return (
        <Form {...{
            initialValues,
            schema: accountSchema,
            onSubmit: handleSubmit
        }}>
            {
                ({errors,touched}) => (
                    <VStack spacing={4}>
                        <FormControl label={'Old Password'} id='oldPassword' error={errors.oldPassword} touched={touched.oldPassword}>
                            <Field
                                as={Input}
                                id='oldPassword'
                                name='oldPassword'
                                placeholder='Old Password'
                                type='password'
                            />
                        </FormControl>
                        <FormControl label={'New Password'} id='newPassword' error={errors.newPassword} touched={touched.newPassword}>
                            <Field
                                as={Input}
                                id='newPassword'
                                name='newPassword'
                                placeholder='New Password'
                                type='password'
                            />
                        </FormControl>
                        <FormControl label={'Confirm Password'} id='confirmPassword' error={errors.confirmPassword} touched={touched.confirmPassword}>
                            <Field
                                as={Input}
                                id='confirmPassword'
                                name='confirmPassword'
                                placeholder='Confirm Password'
                                type='password'
                            />
                        </FormControl>
                        <Box width={'100%'} display={'flex'} justifyContent={'end'}>
                            <Button type='submit' colorScheme={'orange'} isLoading={isLoading}>Confirm</Button>
                        </Box>
                    </VStack>
                )
            }
        </Form>
    )
}

export default UpdatePasswordForm