import React from 'react';
import {Paginated} from 'components/table';
import {createColumnHelper} from '@tanstack/react-table';
import { Button, Flex, useDisclosure } from '@chakra-ui/react';

import SchedulerManualModal from '../modals/SchedulerManualModal';

const SchedulerTable = () => {
    const manualModal = useDisclosure()
    const columnHelper = createColumnHelper();
    const [data,setData] = React.useState()
    
    const columns = [
        columnHelper.accessor('id',{
            header:'ID'
        }),
        columnHelper.accessor('is_active',{
            header:'Status',
            cell: props => {
                const value = props.getValue()
                return value === 1 ? 'Active' : 'Inactive'
            }
        }),
        columnHelper.accessor('system_type',{
            header:'System Type'
        }),
        columnHelper.accessor('job_description',{
            header:'Job Description'
        }),
        columnHelper.accessor('start_time_label',{
            header:'Start Time'
        }),
        columnHelper.accessor('redis_key',{
            header:'Redis Key'
        }),
        columnHelper.accessor('redis_scheduler_key',{
            header:'Scheduler Key'
        }),
        columnHelper.display({
            header:'Action',
            cell: props => {
                const handleOpenManual = () => {
                    setData({
                        id: props.row.original.id
                    })

                    manualModal.onOpen()
                }

                return <Flex gap='1'>
                    <Button size={'xs'} colorScheme='orange' onClick={handleOpenManual}>Manual</Button>
                    <Button size='xs' colorScheme='orange'>Edit</Button>
                </Flex>
            }
        })
    ]

    return (<>
        <Paginated
            title={'Scheduler Info'}
            route={'/v2/scheduler'}
            columns={columns}
        />

        <SchedulerManualModal isOpen={manualModal.isOpen} onClose={manualModal.onClose} {...data}/>
    </>
    )
}
 
export default SchedulerTable