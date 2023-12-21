import moment from 'moment';
import * as Yup from 'yup';

export const tariffSchema = Yup.object().shape({
    tariff_id:          Yup.string().required('required'),
    tariff_desc:        Yup.string().required('required'),
    min_billable_unit:  Yup.object().nullable(),
    min_value:          Yup.string(),
    max_value:          Yup.string(),
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
    trip_date: Yup.string().required('Required')
})

const isDateValid = (name) => {
    return Yup.string()
    .test({
        name:'isDateValid'+name,
        exclusive:false,
        params:{},
        message:'Invalid date',
        test: (value,{parent}) => {
            return moment(parent.to).diff(parent.from,'days') >= 0
        }
    })
}

export const contractExportSchema = Yup.object().shape({
    contract: Yup.object().nullable().required('Required'),
    from: isDateValid('from'),
    to: isDateValid('to'),
    service_type: Yup.object().nullable()
})


export const draftBillExportSchema = Yup.object().shape({
    type: Yup.object().nullable().required('Required'),
    from: isDateValid('from').required('Required'),
    to: isDateValid('to').required('Required')
})
