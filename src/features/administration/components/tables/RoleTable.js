import React from 'react';
import {Paginated} from 'components/table';
import {createColumnHelper} from '@tanstack/react-table';
import { Flex,Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useUpdateAdminDataMutation } from 'lib/redux/api/administration.api.slice';
import { toast } from 'react-toastify';

const RoleTable = ({hasEdit}) => {
    const navigate = useNavigate();
    const [updateData,{isLoading}]= useUpdateAdminDataMutation()
    
    const columnHelper = createColumnHelper();
    const columns = [
        columnHelper.accessor('role_name',{
            header:'Role Name'
        }),
        columnHelper.accessor('role_status',{
            header:'Status'
        }),
        columnHelper.display({
            header:'Action',
            cell: props => {
                const row = props.row.original;
                const handleUpdate=async(status)=>{
                    await updateData({
                        route:`role/${row.role_id}`,
                        query: {
                            status
                        }
                    })
                    .unwrap()
                    .then(res => {
                        toast.success('Success!')
                    })
                }

                return <Flex gap={2}>
                    <Button colorScheme={'telegram'} size='xs' isLoading={isLoading} 
                    onClick={()=>{
                        navigate(row.role_id)
                    }}>Access</Button>
                    {
                        row.role_status === 'ACTIVE' ? 
                        <Button colorScheme={'red'} size='xs' isLoading={isLoading} onClick={()=>handleUpdate('INACTIVE')} hidden={!hasEdit}> 
                            Deactivate
                        </Button>
                        :
                        <Button colorScheme={'green'} size='xs' isLoading={isLoading} onClick={()=>handleUpdate('ACTIVE')} hidden={!hasEdit}>
                            Activate
                        </Button>
                    }
                </Flex>
            }
        })
    ]

    return (
        <Paginated
            title={'Roles'}
            columns={columns}
            route={'/v2/administration/role'}
        />
    )
}

export default RoleTable