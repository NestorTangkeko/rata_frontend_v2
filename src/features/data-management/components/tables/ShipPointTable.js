import React from 'react'
import {Paginated} from 'components/table';
import {createColumnHelper} from '@tanstack/react-table';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const ShipPointTable = () => {
    const columnHelper = createColumnHelper();
    const navigate = useNavigate();
    const columns = [
        columnHelper.accessor('stc_code',{
            header:'STC',
            cell: props => {
                const handleClick = () => {
                    navigate(props.getValue())
                }
                return <Button variant={'link'} onClick={handleClick}>{props.getValue()}</Button>
            }
        }),
        columnHelper.accessor('stc_description',{
            header:'Description'
        }),
        columnHelper.accessor('stc_name',{
            header:'Name'
        }),
        columnHelper.accessor('stc_address',{
            header:'Address'
        }),
        columnHelper.accessor('country',{
            header:'Country'
        }),
        columnHelper.accessor('region',{
            header:'Region'
        }),
        columnHelper.accessor('province',{
            header:'Province'
        }),
        columnHelper.accessor('city',{
            header:'City'
        }),
        columnHelper.accessor('barangay',{
            header:'Barangay'
        }),
        columnHelper.accessor('zip_code',{
            header:'Zip'
        }),
        columnHelper.accessor('is_active',{
            header:'Is Active',
            cell: props => props.getValue() ? 'true' : 'false'
        }),
    ]

    return (
        <Paginated
            title={'Geography'}
            route={'/v2/data-management/ship-point'}
            columns={columns}
        /> 
    )
}

export default ShipPointTable