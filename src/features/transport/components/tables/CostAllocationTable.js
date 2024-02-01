import { createColumnHelper } from '@tanstack/react-table'
import { Paginated } from 'components/table';
import React from 'react'

const CostAllocationTable = ({draft_bill_no=''}) => {
    const columnHelper = createColumnHelper();
    const columns = React.useMemo(()=>[
        columnHelper.accessor('draft_bill_no',{
            header:'Draft Bill No.'
        }),
        columnHelper.accessor('trip_no',{
            header:'Trip Number'
        }),
        columnHelper.accessor('service_type',{
            header:'TMS Service Type'
        }),
        columnHelper.accessor('vehicle_type',{
            header:'Vehicle Type'
        }),
        columnHelper.accessor('vendor_id',{
            header:'Trucker ID'
        }),
        columnHelper.accessor('principal_code',{
            header:'Principal Code'
        }),
        columnHelper.accessor('total_cbm',{
            header:'Total CBM'
        }),
        columnHelper.accessor('vehicle_capacity',{
            header:'Vehicle Capacity'
        }),
        columnHelper.accessor('allocation',{
            header:'% of Allocation'
        }),
        columnHelper.accessor('total_cost',{
            header:'Total Cost'
        }),
        columnHelper.accessor('allocated_cost',{
            header:'Allocated Cost'
        }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ],[])
  
    return (
    <Paginated
        route={'/v2/draft-bill/cost-allocation'}
        columns={columns}
        customFilters={{
            draft_bill_no
        }}
        title={'Cost Allocation Details'}
    />
  )
}

export default CostAllocationTable