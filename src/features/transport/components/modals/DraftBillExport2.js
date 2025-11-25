import React from 'react'
import Modal from 'components/Modal';
import { Button, Flex, Input } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { FormControl } from 'components/form';
import { LocalSelect } from 'components/select';
import { draftBillExportSchema } from 'features/transport/validations';
import { useExportDataMutation } from 'lib/redux/api/data.export.api.slice';
import { toast } from 'react-toastify';
import Label from 'components/Label';

function DraftBillExport2({
    isOpen,
    onClose,
    filters,
}) {

    const [onExport,{isLoading}] = useExportDataMutation();

    const formik = useFormik({
        initialValues:{},
        onSubmit: async(values) => {
            const queryFilters = {};
            filters.map(f => {
                if (f.id === 'location') {
                    queryFilters[f.id] = f.value.label
                } else {
                    queryFilters[f.id] = typeof(f.value) === 'string' ? f.value : f.value.value
                }
            });
            
            await onExport({
                route: '/transport/draft-bill-v2',
                query:{
                    ...queryFilters
                }
            })
            .unwrap()
            .then(result => {
                toast.success('Export Success')
            })
        }
    })

    const dateRanges = ['draft_bill_date', 'trip_date'];

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={'Draft Bill Export'}>
            <form onSubmit={formik.handleSubmit}>
                <Flex direction={'column'} gap={2}>

                    {filters.map(filter => {
                        const label = filter.id.split('_').map(str => str.charAt(0).toUpperCase() + str.slice(1)).join(' ');
                        
                        if (dateRanges.includes(filter.id)) {
                            const [fromDate, toDate] = filter.value.split(',');
                            let labelFrom = 'Trip Date From';
                            let labelTo = 'Trip Date To';
                            if (filter.id === 'draft_bill_date') {
                                labelFrom = 'Draft Bill Date From';
                                labelTo = 'Draft Bill Date To';
                            }

                            return [
                                <Label
                                    key={filter.id + '_from'}
                                    name={filter.id + '_from'}
                                    label={labelFrom}
                                    value={fromDate}
                                />,
                                <Label
                                    key={filter.id + '_to'}
                                    name={filter.id + '_to'}
                                    label={labelTo}
                                    value={toDate}
                                />
                            ]
                        } else {
                            const value = typeof(filter.value) === 'string' 
                                ? filter.value 
                                : (filter.id === 'location' ? filter.value.label : filter.value.value);
                            return <Label
                                key={filter.id}
                                name={filter.id}
                                label={label}
                                value={value}
                            />
                            
                        }
                    })}
                    {filters.length === 0 && <Label
                        label={'No filters selected'}
                    />}
                    {filters.length !== 0 && <Flex justify={'flex-end'}>
                        <Button type='submit' colorScheme='orange' isLoading={isLoading}>
                            Export
                        </Button>
                    </Flex>}
                </Flex>
            </form>
        </Modal>
    )
}

export default DraftBillExport2