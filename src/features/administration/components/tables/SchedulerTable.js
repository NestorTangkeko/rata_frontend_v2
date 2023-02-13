import React from 'react';
import {Paginated} from 'components/table';
import {createColumnHelper} from '@tanstack/react-table';
import { Button, IconButton,Flex, useDisclosure } from '@chakra-ui/react';
import {EmailIcon} from '@chakra-ui/icons';

import SchedulerManualModal from '../modals/SchedulerManualModal';
import UpdateModal from '../modals/SchedulerEditModal';
import EmailModal from '../modals/SchedulerEmailModal';

const SchedulerTable = ({hasEdit,hasCreate}) => {
    const manualModal = useDisclosure();
    const updateModal = useDisclosure();
    const emailModal = useDisclosure();
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

                const handleOpen = () => {
                    setData({
                        ...props.row.original
                    })
                    updateModal.onOpen();
                }

                const handleOpenEmailModal = () =>{
                    setData({
                        ...props.row.original
                    })
                    emailModal.onOpen();
                }   

                return <Flex gap='1'>
                    <Button size={'xs'} colorScheme='orange' onClick={handleOpenManual}>Manual</Button>
                    <Button size='xs' colorScheme='orange' onClick={handleOpen} disabled={!hasEdit}>Edit</Button>
                    <IconButton size={'xs'} colorScheme='orange' onClick={handleOpenEmailModal} icon={<EmailIcon/>}/>
                </Flex>
            }
        })
    ]

    const handleChange = (e) =>{
        setData({
            ...data,
            [e.name]:e.value
        })
    }
    
    return (<>
        <Paginated
            title={'Scheduler Info'}
            route={'/v2/scheduler'}
            columns={columns}
        />

        <SchedulerManualModal isOpen={manualModal.isOpen} onClose={manualModal.onClose} {...data} hasCreate={hasCreate}/>
        <UpdateModal    isOpen={updateModal.isOpen} onClose={updateModal.onClose} data={data} handleChange={handleChange}/>
        <EmailModal     isOpen={emailModal.isOpen}  onClose={emailModal.onClose} schedulerID={data?.id || ''} hasEdit={hasEdit} hasCreate={hasCreate}/>
    </>
    )
}
 
export default SchedulerTable