import { Flex, Grid } from '@chakra-ui/react'
import Label from 'components/Label'
import { FormGeoSelect, FormInput } from 'components/form'
import { useFormikContext } from 'formik'
import React from 'react'

function ShipPointEditForm() {
    const {values,setFieldValue} = useFormikContext();
    
    return (
       <Grid templateColumns={'repeat(2, 1fr)'} columnGap={2} rowGap={2}>
            <Flex direction='column' gap={'2'}>
                <Label
                    label={'Ship Point Code'}
                    value={values.stc_code}
                />
                <FormInput
                    name={'stc_address'}
                    label={'Ship Point Address'}
                />
                
                <FormGeoSelect
                    name={'region'}
                    type={'region'}
                    label={'Region'}
                    onChange={() => {
                        setFieldValue('province',null)
                        setFieldValue('city',null)
                        setFieldValue('barangay',null)
                    }}
                />

                <FormGeoSelect
                    name={'city'}
                    type={'city'}
                    label={'City'}
                    province_code={values.province?.value}
                    onChange={() => {
                        setFieldValue('barangay',null)
                    }}
                />
               
            </Flex>
            <Flex direction={'column'} gap={'2'}>
                <Label
                    label={'Ship Point Name'}
                    value={values.stc_description}
                />
                <FormInput
                    name={'zip_code'}
                    label={'Postal Code'}
                />
               
                <FormGeoSelect
                    name={'province'}
                    type={'province'}
                    label={'Province'}
                    region_code={values.region?.value}
                    onChange={() => {
                        setFieldValue('city',null)
                        setFieldValue('barangay',null)
                    }}
                />

                <FormGeoSelect
                    name={'barangay'}
                    type={'barangay'}
                    label={'Barangay'}
                    city_code={values.city?.value}
                />
                
            </Flex>
       </Grid>
    )
}

export default ShipPointEditForm