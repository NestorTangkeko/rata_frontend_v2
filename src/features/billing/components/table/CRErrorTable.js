import React from 'react'
import { Paginated } from 'components/table';
import { createColumnHelper } from '@tanstack/react-table'
import {useParams} from 'react-router-dom';


const CRErrorTable = () => {
    
    const {id} = useParams();
    const columnHelper = createColumnHelper();
    const columns = React.useMemo(()=> [
        columnHelper.accessor('ref_code',{
            header:'cr_code'
        }),
        columnHelper.accessor('result_type'),
        columnHelper.accessor('field_name'),
        columnHelper.accessor('field_value'),
        columnHelper.accessor('message'),
        columnHelper.accessor('response_code'),
        columnHelper.accessor('uploaded_by'),
        columnHelper.accessor('createdAt',
            {
                header:'Uploaded Date'
            }
        )
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ],[])

    return (
        <>
            <Paginated
                title = 'Error Logs'
                columns={columns}
                route={'/v2/cr-upload/errors/'+id}
                customFilters={{
                    fk_header_id: id
                }}
            />
        </>
    )
}

export default CRErrorTable