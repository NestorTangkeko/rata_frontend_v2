import React from 'react'
import {Table} from 'components/table';
import {createColumnHelper} from '@tanstack/react-table';
import { Button } from '@chakra-ui/react';

const AlgoDetailTable = ({data,onDelete}) => {
    const columnHelper = createColumnHelper();
    const columns = [
        columnHelper.display({
            header:'#',
            cell: props => {
                const index = props.row.index + 1
                return index
            }
        }),
        columnHelper.accessor('agg_id'),
        columnHelper.accessor('raw_condition'),
        columnHelper.accessor('raw_formula'),
        columnHelper.display({
            header: 'Action',
            cell: props => <>
                <Button colorScheme={'red'} size='xs' isDisabled={!props.row.original.is_editable} onClick={()=>{
                    onDelete(props.row.index)
                }}>Delete</Button>
            </>
        })
    ]

    return (
        <Table
            title={'Algorithm Details'}
            columns={columns}
            data={data}
        />
    )
}

export default AlgoDetailTable