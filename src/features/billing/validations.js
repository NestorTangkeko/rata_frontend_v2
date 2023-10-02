import * as yup from 'yup';

export const createBillingSchema = yup.object().shape({
    from: yup.string(),
    to: yup.string(),
    service_type: yup.object().nullable(),
    customer: yup.object().nullable()
})