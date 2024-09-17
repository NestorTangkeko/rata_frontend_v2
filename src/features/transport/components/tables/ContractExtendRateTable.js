import React from 'react';
import {Table} from 'components/table'
import { createColumnHelper } from '@tanstack/react-table';

const ContractExtendRateTable = ({
    data=[]
}) => {
    const columnHelper = createColumnHelper();
    const columns = React.useMemo(() => [
        columnHelper.accessor('tariff_id',{
            header:'Tariff ID'
        }),
        columnHelper.accessor('tariff_rate',{
            header:'Tariff Rate'
        }),
        columnHelper.accessor('min_rate',{
            header:'Min Rate'
        }),
        columnHelper.accessor('status',{
            header:'Status'
        }),
        columnHelper.accessor('fk_agg_id',{
            header:'Algorithm'
        }),
        columnHelper.accessor('valid_from',{
            header:'Valid From'
        }),
        columnHelper.accessor('valid_to',{
            header:'Valid Until'
        }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ],[])
    
    return (
        <Table
            data={data}
            columns={columns}
        />
    )
}

export default ContractExtendRateTable