import React from 'react';
import {Form,FormInput} from 'components/form';
import {FormSelect,FormGeoTypeSelect,FormGeoSelect} from 'components/select';
import Label from 'components/Label';
import {tariffSchema} from '../../validations';
import {Button,Flex,Box} from '@chakra-ui/react';

import {useCreateTariffMutation} from 'lib/redux/api/tariff.api.slice';

const TariffForm = ({data}) => {
  const [createTariff,{isLoading}] = useCreateTariffMutation();
  
  const handleSubmit = async (values,{resetForm}) => {
    const cast = tariffSchema.cast(values)
    await createTariff({
      ...cast,
      tariff_status:    'DRAFT',
      vehicle_type:      values.vehicle_type?.value || null,
      min_billable_unit: values.min_billable_unit?.value || null,  
      class_of_store:    values.class_of_store?.value || null, 
      service_type:      values.service_type?.value || null,
      location:          values.location?.value || null,
      from_geo_type:     values.from_geo_type?.value || null,
      to_geo_type:       values.to_geo_type?.value || null,
      from_geo:          values.from_geo?.value || null,
      to_geo:            values.to_geo?.value || null
    })
    .unwrap()
    .then(()=>{
      if(!data){
        //reset form in create mode
        resetForm();
      }
      console.log('success')
    })
  }

    
  let initialValues = data ? {
      ...data,
      min_value:          data.min_value || '',
      max_value:          data.max_value || '',
      sub_service_type: data.sub_service_type || '',
      vehicle_type: {
        label:data.vehicle_type,
        value:data.vehicle_type
      },
      min_billable_unit: !data?.min_billable_unit ||   {
        label:data.min_billable_unit,
        value:data.min_billable_unit
      },
      class_of_store:  !data?.class_of_store ||   {
        label:data.class_of_store,
        value:data.class_of_store
      },
      service_type:  {
        label:data.service_type,
        value:data.service_type
      },
      location:           {
        label:data.location,
        value:data.location
      },
      from_geo_type:      {
        label:data.from_geo_type,
        value:data.from_geo_type
      },
      to_geo_type:        {
        label:data.to_geo_type,
        value:data.to_geo_type
      },
      from_geo:           {
        label:data.to_geo,
        value:data.to_geo
      },
      to_geo:             {
        label:data.to_geo,
        value:data.to_geo
      }
    } 
    :
    {
      tariff_id:          '',
      tariff_desc:        '',
      min_value:          '',
      max_value:          '',
      sub_service_type:   '',
      vehicle_type:       null,
      min_billable_unit:  null,
      class_of_store:     null,
      service_type:       null,
      location:           null,
      from_geo_type:      null,
      to_geo_type:        null,
      from_geo:           null,
      to_geo:             null
    }

    return (
      <Form 
        onSubmit={handleSubmit}
        schema={tariffSchema}
        initialValues={initialValues}
      >
        {({errors,touched}) => (
          <Flex direction={'row'} gap='2' px='2' py='3'>
            <Flex direction={'column'} width='50%' gap='2'>

              <FormInput
                id='tariff_id'
                name='tariff_id'
                label='Tariff ID'
                touched={touched.tariff_id}
                error={errors.tariff_id}
                isDisabled={data ? true : false}
              />

              <FormSelect
                id='class_of_store'
                name='class_of_store'
                label='Class of Store'
                route={'quick-code'}
                filter={{type:'CLSOFSTR'}}
                touched={touched.class_of_store}
                error={errors.class_of_store}
              />
              
              <FormSelect
                id='service_type'
                name='service_type'
                label='Service Type'
                route={'quick-code'}
                filter={{type:'SRV_TYP'}}
                touched={touched.service_type}
                error={errors.service_type}
              />

              <FormInput
                id='sub_service_type'
                name='sub_service_type'
                label='Sub Service Type'
                touched={touched.sub_service_type}
                error={errors.sub_service_type}
              />  

              <FormGeoTypeSelect
                id='from_geo_type'
                name='from_geo_type'
                label='Geo Type From'
                touched={touched.from_geo_type}
                error={errors.from_geo_type}
              />

              <FormGeoTypeSelect
                id='to_geo_type'
                name='to_geo_type'
                label='Geo Type to'
                touched={touched.to_geo_type}
                error={errors.to_geo_type}
              />
            </Flex>
            
            <Flex direction={'column'} width='50%' gap='2'>
              <FormInput
                  id='tariff_desc'
                  name='tariff_desc'
                  label='Tariff Description'
                  touched={touched.tariff_desc}
                  error={errors.tariff_desc}
                />
                <Flex direction={'row'} columnGap='2' justifyContent={'space-between'}>
                  <FormSelect
                    id='vehicle_type'
                    name='vehicle_type'
                    route='quick-code'
                    label={'Vehicle Type'}
                    filter={{
                      type:'VEH_TYPE'
                    }}
                  />
                  <Box width={'50%'}>
                    <Label label='Status' value={data?.tariff_status || ''}/>
                  </Box>
                </Flex>
                <Flex direction={'row'} columnGap='2'>
                  <FormSelect 
                    id='min_billable_unit' 
                    name='min_billable_unit'
                    label='Min. Billable Unit' 
                    route={'quick-code'}
                    filter={{
                      type:'MBU'
                    }}
                    touched={touched.min_billable_unit} 
                    error={errors.min_billable_unit}/>
                  <FormInput id='min_value' name='min_value' label='Min. Value' touched={touched.min_value} error={errors.min_value}/>
                  <FormInput id='max_value' name='max_value' label='Max Value' touched={touched.max_value} error={errors.max_value}/>
                </Flex>
                <FormSelect
                  id='location'
                  name='location'
                  label='Warehouse Location'
                  route={'location'}
                  touched={touched.location}
                  error={errors.location}
                /> 
                <FormGeoSelect
                  id='from_geo'
                  label='From Geo'
                  name='from_geo'
                  geo_type={'from_geo_type'}
                  touched={touched.from_geo}
                  error={errors.from_geo}
                />
                <FormGeoSelect
                  id='to_geo'
                  label='To Geo'
                  name='to_geo'
                  geo_type={'to_geo_type'}
                  touched={touched.to_geo}
                  error={errors.to_geo}
                />
                <Flex alignSelf={'flex-end'} gap='1'>
                  <Button type='submit' colorScheme={'orange'} isLoading={isLoading}>Confirm</Button> 
                </Flex>
            </Flex>
          </Flex>
        )}
        
      </Form>
    )
}

export default TariffForm