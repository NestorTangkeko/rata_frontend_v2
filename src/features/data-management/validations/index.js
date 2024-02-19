import * as Yup from 'yup';

export const algorihtmSchema = Yup.object().shape({
    agg_name: Yup.string().required('required'),
    algo_description: Yup.string().required('required'),
    with_agg: Yup.boolean(),
    parameter:Yup.object().nullable(),
    group_by: Yup.object().nullable(),
    status:   Yup.string().required('required')  
})

export const shipPointSchema = Yup.object().shape({
    // region:     Yup.object().nullable().required('Required'),
    // province:   Yup.object().nullable().required('Required'),
    // city:       Yup.object().nullable().required('Required'),
    // barangay:   Yup.object().nullable().optional(),
    // zip_code:   Yup.string().required('Required'),
    stc_address:Yup.string().required('Required'),
    is_active: Yup.string()
})

export const costAllocSchema = Yup.object().shape({
    service_type:       Yup.object().nullable().required('Required'),
    draft_bill_type:    Yup.object().nullable().required('Required'),
    is_active:          Yup.string()
})