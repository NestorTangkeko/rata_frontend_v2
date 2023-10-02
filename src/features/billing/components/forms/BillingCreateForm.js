import { Grid,Flex, GridItem, Text, } from '@chakra-ui/react';
import { FormInput } from 'components/form';
import { FormSelect } from 'components/select';
import React from 'react';

function BillingCreateForm() {
  return (
    <Grid gridTemplateColumns ={'repeat(2, 1fr)'} columnGap={4} >
        <GridItem display={'flex'} flexDirection={'column'} gap={1} px={5}>
            <Text fontWeight={'bold'}>Filters</Text>
            <Flex gap={2}>
                <FormInput name='from' type={'date'} label={'RDD From'}/>
                <FormInput name='to' type={'date'} label={'RDD To'}/>
            </Flex>
            <FormSelect name='customer' route={'principal'} label={'Principal'}/>
            <FormSelect name='service_type' route={'quick-code'} label={'Service Type'} filter={{type:'SRV_TYP'}}/>
            
        </GridItem>
        <GridItem display={'flex'} flexDirection={'column'} gap={1} px={5}>
            <Text fontWeight={'bold'}>Adjustments</Text>
            <Text fontWeight={'semibold'} fontSize={'sm'}>Fuel Surcharge</Text>
            <Flex gap={2}>
                <FormInput name={'parameter_1'} label={'Parameter 1'}/>
                <FormInput name={'parameter_2'} label={'Parameter 2'}/>
            </Flex>
            <Text fontWeight={'semibold'} fontSize={'sm'}>Debit Amount</Text>
            <Flex gap={2}>
                <FormInput name={'parameter_3'} label={'Parameter 3'}/>
                <FormInput name={'parameter_4'} label={'Parameter 4'}/>
            </Flex>
            <Text fontWeight={'semibold'} fontSize={'sm'}>Credit Amount</Text>
            <Flex gap={2}>
                <FormInput name={'parameter_5'} label={'Parameter 5'}/>
                <FormInput name={'parameter_6'} label={'Parameter 6'}/>
            </Flex>
            <Text fontWeight={'semibold'} fontSize={'sm'}>Debit/Credit Fixed Amount</Text>
            <Flex gap={2}>
                <FormInput name={'parameter_7'} label={'Parameter 7'}/>
                <FormInput name={'parameter_8'} label={'Parameter 8'}/>
            </Flex>
        </GridItem>
    </Grid>
  )
}

export default BillingCreateForm