import { createColumnHelper } from '@tanstack/react-table'
import { Paginated } from 'components/table';
import React from 'react'

const VehicleTypeTable = () => {
    const columnHelper = createColumnHelper();
    
    const columns = React.useMemo(()=>[
        columnHelper.accessor('vehicle_type',{
            header:'Vehicle Type'
        }),
        columnHelper.accessor('description',{
            header:'Description'
        }),
        columnHelper.accessor('overall_volume',{
            header:'Overall Volume'
        }),
        columnHelper.accessor('volume_uom',{
            header:'Volume UOM'
        })    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ],[])
    return (
       <Paginated
            route={'/v2/data-management/vehicle-type'}
            title={'Vehicle Types'}
            columns={columns}
       />
    )
}

export default VehicleTypeTable