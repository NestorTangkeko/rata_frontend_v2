import { Box, Button, Flex, Grid, GridItem, Input, useDisclosure } from '@chakra-ui/react'
import { useFormik } from 'formik'
import { Container } from 'layouts'
import React from 'react'
import { FormControl } from 'components/form';
import { useExtendRatesMutation, useLazyGetExtendedRateQuery } from 'lib/redux/api/contract.api.slice';
import ContractExtendRateTable from 'features/transport/components/tables/ContractExtendRateTable';
import moment from 'moment';
import { toast } from 'react-toastify';
import { extendRateSchema, filterRatesSchema } from 'features/transport/validations';
import ExtendModal from 'features/transport/components/modals/ExtendModal';
import { Select } from 'components/select';

const ContractExtendRate = ({
    contract_id = '',
    valid_from = '',
    valid_to = ''
}) => {
    const [tariffs,setTariffs]              = React.useState([])
    const [getTariffs, {isLoading}]         = useLazyGetExtendedRateQuery();
    const [extendRates, extendRatesProps]   = useExtendRatesMutation();
    const extendDialog                       = useDisclosure();

    const formik = useFormik({
        initialValues:{
            from:'',
            algorithm: null
        },
        validationSchema: filterRatesSchema,
        onSubmit: async (values) => {
            await getTariffs({
                contract_id,
                algorithm: values.algorithm?.value,
                from: values.from
            })
            .unwrap()
            .then(result => {
               setTariffs(result)
            })
        }
    })   

    const extendForm = useFormik({
        initialValues:{
            valid_to: ''
        },
        validationSchema: extendRateSchema,
        onSubmit: async(values) => {
            const newValidUntil = moment(values.valid_to)
            const validUntil = moment(formik.values.to)

            if(newValidUntil.diff(validUntil,'day') < 7) {
                return toast.error('Date must be more than a week from the previous valid date')
            }

            extendDialog.onOpen();
        }
    })

    const onExtend = async() => {
        await extendRates({
            contract_id,
            from: formik.values.from,
            algorithm: formik.values.algorithm?.value,
            new_valid_to: extendForm.values.valid_to
        })
        .unwrap()
        .then(() => {
            toast.success('Rates Extended!');
            extendDialog.onClose();
            handleClear();
        })
    }

    const handleClear = () => {
        setTariffs([])
        formik.resetForm()
        extendForm.resetForm()
    }


    return (
        <Container>
            <form onSubmit={formik.handleSubmit}>
                <Flex direction={'column'} gap={1}>
                    <Flex alignItems={'center'} gap={2}>
                        <FormControl label='Valid Until' error={formik.errors.from} touched={formik.touched.from}>
                            <Input min={moment().subtract(7,'days').format('YYYY-MM-DD')} type='date' name='from' value={formik.values.from} onChange={formik.handleChange} onBlur={formik.handleBlur}/>  
                        </FormControl>
                        <FormControl >   
                            <Select
                                label={'Algorithm'}
                                name={'algorithm'}
                                value={formik.values.algorithm}
                                onChange={(selected) => formik.setFieldValue('algorithm',selected)}
                                route={'algorithm'}
                            />
                        </FormControl>         
                    </Flex>
                    <Flex gap={1} justifyContent={'end'}>
                        <Button type='submit' isLoading={isLoading}>Filter</Button>
                    </Flex>    
                </Flex>
            </form>
            <br/>
            <Grid templateColumns='repeat(2, 1fr)' gap={2}>
                <GridItem>
                    <ContractExtendRateTable data={tariffs}/>
                </GridItem>
                <GridItem>
                    <Box borderWidth={'1px'} p='5'>
                        <form onSubmit={extendForm.handleSubmit}>
                            <Flex direction={'column'} gap={1}>
                                <Flex alignItems={'center'} gap={2}>
                                    <FormControl label='New Valid To' error={extendForm.errors.valid_to} touched={extendForm.touched.valid_to}>
                                        <Input min={valid_from} max={valid_to} type='date' name='valid_to' value={extendForm.values.valid_to} onChange={extendForm.handleChange} onBlur={extendForm.handleBlur}/>
                                    </FormControl>
                                </Flex>
                                <Flex gap={1} justifyContent={'end'}>
                                    <Button type='button' onClick={handleClear}>Clear</Button>
                                    <Button type='submit' colorScheme='orange' disabled={tariffs.length === ''} isLoading={extendRatesProps.isLoading}>Submit</Button>
                                </Flex>    
                            </Flex>
                        </form>
                    </Box>
                </GridItem>
            </Grid>
            <ExtendModal
                isOpen={extendDialog.isOpen}
                onClose={extendDialog.onClose}
                validTo={valid_to}
                newValidTo={extendForm.values.valid_to}
                onExtend={onExtend}
                isLoading={extendRatesProps.isLoading}
            />
        </Container>
    ) 
}

export default ContractExtendRate