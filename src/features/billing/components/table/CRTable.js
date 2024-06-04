import React from 'react'
import { Paginated } from 'components/table';
import { createColumnHelper } from '@tanstack/react-table';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const CRTable = () => {
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
        columnHelper.accessor('CR_CODE'),
        columnHelper.accessor('COMPANY_CODE'),
        columnHelper.accessor('REF_CODE'),
        columnHelper.accessor('CR_DATE'),
        columnHelper.accessor('DATE_CONFIRMED'),
        columnHelper.accessor('ITEM_TYPE'),
        columnHelper.accessor('SUPPLIER_CODE'),
        columnHelper.accessor('DEPARTMENT_CODE'),
        columnHelper.accessor('PARTICULAR'),
        columnHelper.accessor('REF_SI_NO'),
        columnHelper.accessor('REF_CROSS'),
        columnHelper.accessor('CR_AMT'),
        columnHelper.accessor('STATUS'),
        columnHelper.accessor('uploaded_by',{
            header:'UPLOADED BY'
        }),
        columnHelper.accessor('createdAt',{
            header:'UPLOADED DATE'
        }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ],[])
    return (<>
            <Paginated
                title={'Confirmation Receipt'}
                columns={columns}
                route={'/v2/cr-upload'}
                showFilters
            />
       </>
    )
}

export default CRTable