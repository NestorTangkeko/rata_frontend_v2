import { Button, Flex } from '@chakra-ui/react'
import { FormControl } from 'components/form'
import { DateInput } from 'components/input'
import { LocalSelect, Select } from 'components/select'
import { transmittalSchema } from 'features/transport/validations'
import { useFormik } from 'formik'
import { useConfirmTransportMutation } from 'lib/redux/api/ascii.api.slice'
import React from 'react'



function TransmittalForm({
    isRetransmit = false
}) {
    const [
        confirm,
        {isLoading}
    ] = useConfirmTransportMutation()

    const formik = useFormik({
        initialValues:{
            from: '',
            to: '',
            location: null,
            contract_type:null
        },
        validationSchema: transmittalSchema,
        onSubmit: async(values) => {
            console.log({
                location: values.location?.value,
                from: values.from,
                to: values.to,
                type: values.contract_type?.value,
                isRetransmit
            })
            await confirm({
                location: values.location?.value,
                from: values.from,
                to: values.to,
                type: values.contract_type?.value,
                isRetransmit
            })
            .unwrap()
        }
    })


    return (
        <form onSubmit={formik.handleSubmit}>
            <Flex direction={'column'} gap={2}>
                <FormControl error={formik.errors.location} touched={formik.touched.location}>
                    <Select
                        name={'location'}
                        label={'Location'}
                        value={formik.values.location}
                        route={'location'}
                        onChange={(e) => formik.setFieldValue('location',e)}
                    />
                </FormControl>
                <FormControl error={formik.errors.contract_type} touched={formik.touched.contract_type}>
                    <LocalSelect
                        name={'contract_type'}
                        label={'Contract Type'}
                        type={'contract_type'}
                        value={formik.values.contract_type}
                        onChange={e => formik.setFieldValue('contract_type', e)}
                    />
                </FormControl>
                <FormControl error={formik.errors.from} touched={formik.touched.from}>
                    <DateInput label={'Trip Date From'} name={'from'} value={formik.values.from} onChange={e => formik.setFieldValue('from', e.target.value)}/>
                </FormControl>
                <FormControl error={formik.errors.to} touched={formik.touched.to}>
                <DateInput label={'Trip Date To'} name={'to'} value={formik.values.to} onChange={e => formik.setFieldValue('to', e.target.value)}/>
                </FormControl>

                <Button type='submit' colorScheme={'orange'} isLoading={isLoading}>Confirm</Button>
            </Flex>
        </form>
    )
}

export default TransmittalForm