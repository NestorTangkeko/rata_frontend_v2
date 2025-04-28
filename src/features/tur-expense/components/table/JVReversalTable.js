import React from 'react'
import { Paginated } from 'components/table';
import { createColumnHelper } from '@tanstack/react-table';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const JVReversalTable = () => {
    const navigate = useNavigate();
    const columnHelper = createColumnHelper();
    const columns = React.useMemo(() => [
        columnHelper.accessor('id',{
            cell: props => {
                const handleClick = () => {
                    navigate(props.getValue())
                }
                return <Button size={'xs'} onClick={handleClick} variant='link' colorScheme='blue'>{props.getValue()}</Button>
            }
        }),
        columnHelper.accessor('uploaded_by',{
            header:'Draft Bill No.'
        }),
        columnHelper.accessor('createdAt',{
            header:'Draft Bill Date'
        }),
        columnHelper.accessor('uploaded_by',{
            header:'Trip No.'
        }),
        columnHelper.accessor('createdAt',{
            header:'BR No.'
        }),
        columnHelper.accessor('uploaded_by',{
            header:'Customer'
        }),
        columnHelper.accessor('createdAt',{
            header:'Service Type'
        }),
        columnHelper.accessor('uploaded_by',{
            header:'Location'
        }),
        columnHelper.accessor('createdAt',{
            header:'Vendor'
        }),
        columnHelper.accessor('uploaded_by',{
            header:'Vehicle Type'
        }),
        columnHelper.accessor('createdAt',{
            header:'Vehicle ID'
        }),
        columnHelper.accessor('uploaded_by',{
            header:'STC From'
        }),
        columnHelper.accessor('createdAt',{
            header:'STC To'
        }),
        columnHelper.accessor('uploaded_by',{
            header:'Tariff ID'
        }),
        columnHelper.accessor('createdAt',{
            header:'Total Charges'
        }),
        columnHelper.accessor('jv_number',{
            header:'JV Create Number'
        }),
        columnHelper.accessor('jv_status',{
            header:'Status'
        }),
        columnHelper.accessor('jv_cr',{
            header:'CR'
        }),
        columnHelper.accessor('jv_cr_date',{
            header:'CR Date'
        }),
        columnHelper.accessor('jv_trip_number',{
            header:'Trip Number'
        }),
        columnHelper.accessor('jv_actual_vendor',{
            header:'Actual Vendor'
        }),
        columnHelper.accessor('jv_actual_vehicle_type',{
            header:'Actual Vehicle Type'
        }),
        columnHelper.accessor('jv_actual_charges',{
            header:'Actual Charges'
        }),
        columnHelper.accessor('jv_reverse_number',{
            header:'JV Reverse Number'
        }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ],[])
    return (<>
            <Paginated
                title={'Draft Bill'}
                columns={columns}
                route={'/v2/jv-creation'}
                showFilters
            />
       </>
    )
}

export default JVReversalTable