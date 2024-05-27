import React from 'react'
import { Paginated } from 'components/table';
import { createColumnHelper } from '@tanstack/react-table'
import {useParams} from 'react-router-dom';

const CRDetailTable = () => {
    const {id} = useParams();
    const columnHelper = createColumnHelper();
    const columns = React.useMemo(()=> [
        columnHelper.accessor('CR_CODE'),
        columnHelper.accessor('LINE_NO'),
        columnHelper.accessor('ITEM_CODE'),
        columnHelper.accessor('SERVICE_TYPE'),
        columnHelper.accessor('PRINCIPAL_CODE'),
        columnHelper.accessor('LOCATION_CODE'),
        columnHelper.accessor('UM_CODE'),
        columnHelper.accessor('QUANTITY'),
        columnHelper.accessor('UNIT_PRICE'),
        columnHelper.accessor('EXTENDED_AMT')
    ],[])
    
    return (<>
        <Paginated title={'CR Details'} columns={columns} route={'/v2/cr-upload/details/'+id}
            customFilters={{
                fk_header_id: id
            }}
        />
    </>)
}

export default CRDetailTable