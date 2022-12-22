import React from 'react'
import {Paginated} from 'components/table';
import {createColumnHelper} from '@tanstack/react-table';

const SchedulerDtlTable = ({scheduler_id}) => {
    const columnHelper = createColumnHelper();
    
    const columns = [
        columnHelper.accessor('scheduler_id',{
            header:'Scheduler ID'
        }),
        columnHelper.accessor('job_id',{
            header:'Job ID'
        }),
        columnHelper.accessor('job_status',{
            header:'Job Status'
        }),
        columnHelper.accessor('transaction_date',{
            header:'Transaction Date'
        }),
        columnHelper.accessor('error_info',{
            header:'Error Info'
        }),
        columnHelper.accessor('createdAt',{
            header:'Created Date'
        }),
        columnHelper.accessor('updatedAt',{
            header:'Updated Date'
        })
    ]

    return (
        <Paginated
            title={'Scheduler Logs'}
            route={'/v2/scheduler/details'}
            customFilters={{
                scheduler_id: scheduler_id
            }}
            columns={columns}
        />
    )
}

export default SchedulerDtlTable