import React from 'react'
import { forgotPasswordSchema } from '../validations'
import {Form, FormControl} from 'components/form';
import {Field} from 'formik';
import { Input, Box, Button } from '@chakra-ui/react';
import { useForgotPasswordMutation } from 'lib/redux/api/auth.api.slice';
import { toast } from 'react-toastify';

const ForgotPasswordForm = () => {
    const [onForgotPassword, {isLoading}] = useForgotPasswordMutation();
    const initialValues = {
        email: ''
    }

    const handleSubmit = async (values, action) => {
        await onForgotPassword(values.email).unwrap().then(() => {
            toast.success('Request sent to your email')
            action.resetForm({
                values: {
                    email: ''
                }
            })
        })
    }

    return (
        <Form {...{
            initialValues,
            schema: forgotPasswordSchema,
            onSubmit: handleSubmit
        }}>
            {
                ({errors,touched}) => (
                    <Box display={'flex'} flexDirection={'column'} gap={2}>
                        <FormControl label={'Email'} id='email' error={errors.email} touched={touched.email}>
                            <Field
                                as={Input}
                                id='email'
                                name='email'
                                placeholder='Email'
                                type='email'
                            />
                        </FormControl>
                        <Box width={'100%'} display={'flex'} justifyContent={'end'}>
                            <Button type='submit' colorScheme='orange' isLoading={isLoading}>Send</Button>
                        </Box>
                    </Box>
                    
                )
            }
        </Form>
    )
}

export default ForgotPasswordForm