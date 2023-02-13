import * as Yup from 'yup';

export const  algorihtmSchema = Yup.object().shape({
    agg_name: Yup.string().required('required'),
    algo_description: Yup.string().required('required'),
    with_agg: Yup.boolean(),
    parameter:Yup.object().nullable(),
    group_by: Yup.object().nullable(),
    status:   Yup.string().required('required')  
})