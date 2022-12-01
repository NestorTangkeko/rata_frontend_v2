import React from 'react'
import {Paginated} from 'components/table';
import {createColumnHelper} from '@tanstack/react-table';
import { Button } from '@chakra-ui/react';

import {useUpdateTransportICMutation} from 'lib/redux/api/tariff.api.slice';
const TariffICTable = ({customFilter}) => {
    const [updateIC,{isLoading}] = useUpdateTransportICMutation();
    
    const columnHelper = createColumnHelper();
    const columns = [
        columnHelper.accessor('tariff_id',{
            header:'Tariff ID'
        }),
        columnHelper.accessor('vendor_group',{
            header:'Vendor Group'
        }),
        columnHelper.accessor('vehicle_type',{
            header:'Vehicle Type'
        }),
        columnHelper.accessor('uom',{
            header:'UOM'
        }),
        columnHelper.accessor('min_value',{
            header:'Min. Value'
        }),
        columnHelper.accessor('max_value',{
            header:'Max Value'
        }),
        columnHelper.accessor('rate',{
            header:'Rate'
        }),
        columnHelper.accessor('algo_status',{
            header:'Status'
        }),
        columnHelper.display({
            header:'Action',
            cell:props => {
                const data = props.row.original
                const handleClick = async () => {
                    console.log(data)
                    await updateIC({
                        query:{
                            id: data.id
                        },
                        body:{
                            algo_status: 'INACTIVE'
                        }
                    })
                }
                return <Button size='xs' colorScheme={'red'} onClick={handleClick} isLoading={isLoading} isDisabled={data.algo_status === 'INACTIVE'}>{'Deactivate'}</Button>
            }
        })
    ]
  return (
    <Paginated
        title={'Tariff IC'}
        route={'/v2/tariff/tariff-ic'}
        columns={columns}
        customFilters={customFilter}
    />
  )
}

export default TariffICTable