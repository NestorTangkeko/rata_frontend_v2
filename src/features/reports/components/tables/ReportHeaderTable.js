import React from 'react'
import {Paginated} from 'components/table';
import {createColumnHelper} from '@tanstack/react-table';
import { Button, useDisclosure } from '@chakra-ui/react';
import ReportEdit from '../dialogs/ReportEdit';
import { useNavigate } from 'react-router-dom';

const ReportHeaderTable = () => {
    const navigate = useNavigate();
    const columnHelper = createColumnHelper();
    const {isOpen,onClose,onOpen} = useDisclosure();
    const [selected,setSelected] = React.useState({
        id:'',
        report_name:'',
        cron:'',
        redis_key:'',
        is_active:''
    })
    
    const columns = [
        columnHelper.accessor('report_name',{
            cell: props => {
                return <Button variant={'link'} size={'sm'} onClick={() => {
                    navigate('/reports/'+props.getValue())
                }}>{props.getValue()}</Button>
            }
        }),
        columnHelper.accessor('cron'),
        columnHelper.accessor('redis_key'),
        columnHelper.accessor('is_active',{
            cell: props => {
                const value = props.getValue();
                return value === 1  ? 'true' : 'false'
            }
        }),
        columnHelper.display({
            header:'Action',
            cell:props => {
                const handleEdit = () => {
                    console.log(props.row.original)
                    const row = props.row.original
                    setSelected({
                        ...selected,
                        id:row.id,
                        report_name:row.report_name,
                        cron:row.cron ?? '' ,
                        redis_key:row.redis_key,
                        is_active:row.is_active
                    })
                  
                    onOpen();
                }

                return <Button size={'sm'} onClick={handleEdit}>Edit</Button>
            }
        })
    ]

    return (
        <>
            <Paginated
                title={'Reports'}
                route={'/v2/reports'}
                columns={columns}
            />
            <ReportEdit isOpen={isOpen} onClose={onClose} data={selected}/>
        </>
    )
}

export default ReportHeaderTable