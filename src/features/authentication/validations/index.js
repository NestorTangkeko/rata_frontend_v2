import * as Yup from 'yup';

export const authSchema =  Yup.object().shape({
    email:  Yup.string().email('Invalid Email').required('Email is required'),
    password: Yup.string().required('Password is required')
})

export const accountSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Required'),
    newPassword: Yup.string().min(8,'Must Contain 8 Characters').required('Required')
    .matches(
        /^(?=.*[a-z])/,
        " Must Contain One Lowercase Character"
    )
    .matches(
        /^(?=.*[A-Z])/,
        "Must Contain One Uppercase Character"
    )
    .matches(
        /^(?=.*[0-9])/,
        "Must Contain One Number Character"
    )
    .matches(
        /^(?=.*[!@#\$%\^&\*])/,
        "Must Contain  One Special Case Character"
    ),
    confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'),null,''], 'Password not match!').required('Required')
})

export const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Format').required('Required')
})