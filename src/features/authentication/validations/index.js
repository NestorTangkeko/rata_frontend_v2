import * as Yup from 'yup';

export const authSchema =  Yup.object().shape({
    email:  Yup.string().email('Invalid Email').required('Email is required'),
    password: Yup.string().required('Password is required')
})

export const accountSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Required'),
    newPassword: Yup.string().required('Required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'),null,''], 'Password not match!').required('Required')
})