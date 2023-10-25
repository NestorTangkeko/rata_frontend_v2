import { Flex, Grid } from '@chakra-ui/react';
import Label from 'components/Label';
import { FormInput, FormSwitch } from 'components/form';
import { useFormikContext } from 'formik';
import React from 'react';

function ShipPointEditForm() {
    const {values} = useFormikContext();
    
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
                
                <Label
                    name={'region'}
                    label={'Region'}
                    value={values.region?.value}
                />

                <Label
                    name={'city'}
                    label={'City'}
                    value={values.city?.value}
                />
               
            </Flex>
            <Flex direction={'column'} gap={'2'}>
                <Label
                    label={'Ship Point Name'}
                    value={values.stc_description}
                />
                <FormSwitch
                    label={'Is Active?'}
                    name='is_active'
                />
                <Label
                    label={'Postal Code'}
                    value={values.zip_code}
                />
               
                <Label
                    name={'province'}
                    label={'Province'}
                    value={values.province?.value}
                />

                <Label
                    name={'barangay'}
                    label={'Barangay'}
                    value={values.barangay?.value ?? 'n/a'}
                />
                
            </Flex>
       </Grid>
    )
}

export default ShipPointEditForm