import * as Yup from 'yup';

export const tariffSchema = Yup.object().shape({
    tariff_id:          Yup.string().required('required'),
    tariff_desc:        Yup.string().required('required'),
    min_billable_unit:  Yup.object().nullable(),
    min_value:          Yup.number(),
    max_value:          Yup.number(),
    class_of_store:     Yup.object().nullable(),
    service_type:       Yup.object().required('required').nullable(),
    sub_service_type:   Yup.string().nullable(),
    vehicle_type:       Yup.object().nullable(),
    location:           Yup.object().required('required').nullable(),
    from_geo_type:      Yup.object().required('required').nullable(),
    to_geo_type:        Yup.object().required('required').nullable(),
    from_geo:           Yup.object().required('required').nullable(),
    to_geo:             Yup.object().required('required').nullable(),
    //tariff_status:      Yup.string().optional()
})

export const tariffICSchema = Yup.object().shape({
    tariff_id:      Yup.string().required('Required').nullable(),
    vendor_group:   Yup.object().required('Required').nullable(),
    vehicle_type:   Yup.string().required('Required').nullable(),
    uom:            Yup.string().required('Required'),
    min_value:      Yup.number().required(),
    max_value:      Yup.number().required(),
    rate:           Yup.number().min(1,"Enter rate greater than 1").required('Required').nullable(),
})

export const replanDraftBill = Yup.object().shape({
    contract_type: Yup.object().required('Required').nullable(),
    rdd: Yup.string().required('Required')
})