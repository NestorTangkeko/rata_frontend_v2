import { Box } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table'
import { Paginated } from 'components/table';
import { getTransmittalState } from 'lib/redux/transmittal.slice';
import React from 'react'
import { useSelector } from 'react-redux';

function TransLogDetailTable() {
    const {header} = useSelector(getTransmittalState);
    const columnHelper = createColumnHelper();
    const columns = [
        columnHelper.accessor('result_type',
        {
            header:'Result Type'
        }),
        columnHelper.accessor('field_name',
        {
            header:'Field Name'
        }),
        columnHelper.accessor('field_value',
        {
            header:'Field Value'
        }),
        columnHelper.accessor('response_code',
        {
            header:'Response Code'
        }),
        columnHelper.accessor('message',
        {
            header:'Message'
        }),
    ];

    React.useEffect(() => {
        
    },[])

    return (
        <Box width={'100%'}>
            <Paginated
            columns={columns}
            title={'Error Log Details'}
            route={`/v2/ascii/log-details/${header.header_id}`}
        />
        </Box>
        
  )
}

export default TransLogDetailTable