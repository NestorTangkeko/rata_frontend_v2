import React from 'react';
import {Paginated} from 'components/table';
import {createColumnHelper} from '@tanstack/react-table';
import { Button } from '@chakra-ui/react';
import { useUpdateDataMutation } from 'lib/redux/api/data.management.api.slice';
import { toast } from 'react-toastify';


const CostAllocTable = () => {
    const [update, {isLoading}] = useUpdateDataMutation();

    const columnHelper = createColumnHelper();
    const columns = React.useMemo(()=> [
        columnHelper.accessor('draft_bill_type', {
            header:'Draft Bill Type'
        }),
        columnHelper.accessor('service_type', {
            header:'Service Type'
        }),
        columnHelper.accessor('is_active', {
            header:'Is Active',
        }),
        columnHelper.display({
            header:'Action',
            cell: (props) => {
                const handleUpdate = async() => {
                    console.log(props.row.original)
                    await update({
                        route:'cost-allocation',
                        query: {
                            id: props.row.original.id
                        },
                        body:{
                            is_active: !props.row.original.is_active,
                        }
                    })
                    .unwrap()
                    .then(() => {
                        toast.success('Success')
                    })
                }

                return <Button onClick={handleUpdate} isLoading={isLoading} size={'xs'} colorScheme={props.row.original.is_active ? 'red' : 'green'}>{props.row.original.is_active ? 'Deactivate' : 'Activate'}</Button>
            }
        }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ],[isLoading])

    return (
        <Paginated
            title={'Cost Allocation Setup'}
            columns={columns}
            route={'/v2/data-management/cost-allocation'}
        />
    )
}

export default CostAllocTable