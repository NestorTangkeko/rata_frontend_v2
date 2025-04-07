import React from 'react'
import { Paginated } from 'components/table';
import { createColumnHelper } from '@tanstack/react-table';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const SoTable = () => {
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
        columnHelper.accessor('COMPANY_CODE'),
        columnHelper.accessor('SO_CODE'),
        columnHelper.accessor('ITEM_TYPE'),
        columnHelper.accessor('SO_DATE'),
        columnHelper.accessor('CUSTOMER_CODE'),
        columnHelper.accessor('PARTICULAR'),
        columnHelper.accessor('REF_EUPO'),
        columnHelper.accessor('REF_CROSS'),
        columnHelper.accessor('SO_AMT'),
        columnHelper.accessor('SO_STATUS'),
        columnHelper.accessor('uploaded_by',{
            header:'UPLOADED BY'
        }),
        columnHelper.accessor('createdAt',{
            header:'UPLOADED DATE'
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ],[])

    return (<>
        <Paginated
            title={'Sales Order'}
            columns={columns}
            route={'/v2/so-upload'}
            showFilters
        />
    </>)
}

export default SoTable