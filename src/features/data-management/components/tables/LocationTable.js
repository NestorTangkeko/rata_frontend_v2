import React from 'react'
import {Paginated} from 'components/table';
import {createColumnHelper} from '@tanstack/react-table';

const LocationTable = () => {
    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor('loc_code',{
            header:'Location Code',
        }),
        columnHelper.accessor('loc_name',{
            header:'Location Name'
        }),
        columnHelper.accessor('loc_description',{
            header:'Description'
        }),
        columnHelper.accessor('ascii_loc_code',{
            header:'Ascii Code'
        }),
        columnHelper.accessor('loc_status',{
            header:'Status'
        }),
    ]

    return (
        <Paginated
            title={'Location'}
            route={'/v2/data-management/location'}
            columns={columns}
        />
    )
}

export default LocationTable