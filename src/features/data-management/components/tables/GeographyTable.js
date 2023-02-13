import React from 'react'
import {Paginated} from 'components/table';
import {createColumnHelper} from '@tanstack/react-table';

const GeographyTable = () => {
    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor('country_code',{
            header:'Country Code',
        }),
        columnHelper.accessor('region_code',{
            header:'Region Code'
        }),
        columnHelper.accessor('city_code',{
            header:'City Code'
        }),
        columnHelper.accessor('barangay_code',{
            header:'Barangay Code'
        }),
        columnHelper.accessor('barangay_name',{
            header:'Barangay Name'
        }),
        columnHelper.accessor('is_active',{
            header:'Is Active',
            cell: props => props.getValue() ? 'true' : 'false'
        }),
    ]

    return (
        <Paginated
            title={'Geography'}
            route={'/v2/data-management/geography'}
            columns={columns}
        />
    )
}

export default GeographyTable