import React from 'react'
import {Paginated} from 'components/table';
import {createColumnHelper} from '@tanstack/react-table';
import { Button,Flex } from '@chakra-ui/react';
import { useUpdateEmailMutation } from 'lib/redux/api/scheduler.slice';

const SchedulerEmailTable = ({schedulerId,hasEdit}) => {
    const columnHelper = createColumnHelper();
    const [updateEmail, {isLoading}] = useUpdateEmailMutation();

    const columns = [
        columnHelper.accessor('scheduler_id',{
            header:'Scheduler ID'
        }),
        columnHelper.accessor('email',{
            header:'Email'
        }),
        columnHelper.accessor('status',{
            header:'Status'
        }),
        columnHelper.display({
            header:'Action',
            cell: props => {
                const handleUpdate = async (status) => {
                    await updateEmail({
                        query: {
                            email: props.row.original.email,
                            scheduler_id: schedulerId
                        },
                        data:{
                            status
                        }
                    })
                }

                if(props.row.original.status === 'ACTIVE') {
                    return <Flex direction={'column'}>
                    <Button size={'xs'} colorScheme='red' isLoading={isLoading} onClick={() => handleUpdate('INACTIVE')} isDisabled={!hasEdit}>Deactivate</Button>
                </Flex>
                }
                else {
                    return <Flex direction={'column'}>
                    <Button size={'xs'} colorScheme='green' isLoading={isLoading} onClick={() => handleUpdate('ACTIVE')} isDisabled={!hasEdit}>Activate</Button>
                </Flex>
                }
            }
                
        })
    ];
    
    return (
        <Paginated
            title={schedulerId}
            route={'/v2/scheduler/email'}
            customFilters={{
                scheduler_id: schedulerId  
            }}
            columns={columns}
        />
    )
}

export default SchedulerEmailTable