import * as Yup from 'yup';

export const emailSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email').required('Email is Required')
})

export const userSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email').required('Email is Required'),
    role: Yup.object().nullable().required('Role is required'),
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last is Required')
})