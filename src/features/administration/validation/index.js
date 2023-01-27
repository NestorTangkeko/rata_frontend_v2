import * as Yup from 'yup';

export const emailSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email').required('Email is Required')
})