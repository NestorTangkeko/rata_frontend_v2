import React from 'react';
import {Button, Input, VStack,Text} from '@chakra-ui/react';
import {Field}      from 'formik';
import {authSchema} from '../validations';
import Form         from 'components/form/Form';
import FormControl  from 'components/form/FormControl';

import {useLoginMutation} from '../api/auth.api.slice';
import {setLogIn} from 'lib/redux';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login,loginProps]  = useLoginMutation()

    const onSubmit = async (value) => {
        await login({
            email:value.email,
            password:value.password
        })
        .unwrap()
        .then(result => {
            dispatch(setLogIn(result.token))
            navigate('/')
        })
    }

    return (
        <Form 
            onSubmit={onSubmit}
            initialValues={{
                email:'',
                password:''
            }}
            schema={authSchema}
        >
            {({errors,touched})=>(
                <VStack spacing={4} width={{base:'lg',md:'md',sm:'280px'}} pt={{base:'32'}}>
                    <Text fontSize={'4xl'}>Sign In</Text>
                    <FormControl label='Email' id='email' error={errors.email} touched={touched.email}>
                        <Field
                            as={Input}
                            id='email'
                            name='email'
                            placeholder='email'
                        />
                    </FormControl>
                    <FormControl label={'Password'} id='password' error={errors.password} touched={touched.password}>
                        <Field
                            as={Input}
                            id='password'
                            name='password'
                            placeholder='Password'
                            type='password'
                        />
                    </FormControl>
                    <Button type='submit' colorScheme={'orange'} width='100%' isLoading={loginProps.isLoading}>Login</Button>
                </VStack>
            )}
        </Form>
  )
}

export default LoginForm