import React from 'react';
import {Paginated} from 'components/table';
import { createColumnHelper } from '@tanstack/react-table';
import { Button } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import {setHeader } from 'lib/redux/transmittal.slice';
import { useParams } from 'react-router-dom';

function TransLogHeaderTable() {
    const dispatch = useDispatch();
    const columnHelper = createColumnHelper();
    const {draft_bill} = useParams();
    
    const columns = [
        columnHelper.display({
            header:'Action',
            cell:props => {
                const handleSelect = () => {
                    const {id,user,createdAt} = props.row.original;
                    dispatch(setHeader({
                        header_id: id,
                        transmitted_by: user,
                        transmitted_date: createdAt
                    }))
                }

                return <Button size={'sm'} onClick={handleSelect}>Check error details</Button>
            }
        }),
        columnHelper.accessor('user',{
            header:'Transmitted_by'
        }),
        columnHelper.accessor('createdAt',{
            header:'Transmitted Date'
        })
    ]

    return (
        <Paginated
            title={'Transmittal Logs Header'}
            columns={columns}
            route={`/v2/ascii/log-header/${draft_bill}`}
        />
    )
}

export default TransLogHeaderTable