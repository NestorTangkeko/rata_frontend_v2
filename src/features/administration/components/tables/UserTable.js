import React from 'react'
import {Paginated} from 'components/table';
import {createColumnHelper} from '@tanstack/react-table';
import { Flex, Button,useDisclosure } from '@chakra-ui/react';
import {useUpdateAdminDataMutation} from 'lib/redux/api/administration.api.slice';
import { toast } from 'react-toastify';
import UserRoleModal from '../modals/UserRoleModal';
import {FaLock} from 'react-icons/fa';

const UserTable = ({hasEdit}) => {
    const [updateUser, updateUserProps] = useUpdateAdminDataMutation();
    const roleModal = useDisclosure();
    const columnHelper = createColumnHelper();
    const [role,setRole] = React.useState({
        id:'',
        role:null
    })
    
    const columns = [
        columnHelper.accessor('email',{
            header:'Email'
        }),
        columnHelper.accessor('role_name',{
            header:'Role',
            cell: props => {
                const handleClick = () => {
                   setRole({
                        id:props.row.original.id,
                        role:{
                            label:props.getValue(),
                            value:props.row.original.role_id
                        }
                    }) 

                   roleModal.onOpen();
                }

                return hasEdit ? <Button size={'sm'} isLoading={updateUserProps.isLoading} colorScheme={'telegram'} onClick={handleClick}>
                    {props.getValue()}
                </Button> : props.getValue()
            }
        }),
        columnHelper.accessor('first_name',{
            header:'First Name'
        }),
        columnHelper.accessor('last_name',{
            header:'Last Name'
        }),
        columnHelper.accessor('password_expiry',{
            header:'Password Expiry'
        }),
        columnHelper.accessor('status',{
            header:'Status'
        }),
        columnHelper.accessor('is_lock', {
            header: 'Lock Status',
            cell: props => {
                const value = props.getValue();
                return value === 1 ? <FaLock color='red'/> : ''
            }
        }),
        columnHelper.display({
            header:'Action',
            cell: props => {
                const data = props.row.original;

                const updateStatus = async(status)=> {
                    await updateUser({
                        route:`user/${data.id}/status`,
                        body:{
                            data:{
                                status
                            }
                        }
                    })
                    .unwrap()
                    .then(()=>{
                        toast.success("Status updated!")
                    })
                }

                const resetPassword = async()=>{
                    await updateUser({
                        route:`user/${data.id}/password`,
                    })
                    .unwrap()
                    .then(()=>{
                        toast.success("Password has been reset")
                    })
                }

                const unlockAccount = async()=> {
                    await updateUser({
                        route:`user/${data.id}/unlock`
                    })
                    .unwrap()
                    .then(() => 
                        toast.success('Account Unlocked!')
                    )
                }

                return (<Flex gap={2}>
                    {
                        data.status === 'ACTIVE' ? 
                        <Button size={'sm'} isLoading={updateUserProps.isLoading} colorScheme={'red'}   onClick={()=>updateStatus('INACTIVE')} isDisabled={!hasEdit}>Deactivate</Button> : 
                        <Button size={'sm'} isLoading={updateUserProps.isLoading} colorScheme={'green'} onClick={()=>updateStatus('ACTIVE')} isDisabled={!hasEdit}>Activate</Button>
                    }
                    
                    <Button size={'sm'} isLoading={updateUserProps.isLoading} colorScheme={'yellow'} onClick={resetPassword} isDisabled={!hasEdit}>Reset Password</Button>
                    <Button size={'sm'} disabled={data.is_lock !== 1} colorScheme='orange' onClick={unlockAccount}>Unlock</Button>
                </Flex>)
            }
        })
    ]
    
    return (
       <>
            <Paginated 
                columns={columns}
                route={'/v2/administration/user'}
                title='User List'
            />
            <UserRoleModal isOpen={roleModal.isOpen} onClose={roleModal.onClose} selected={role.role} user={role.id}/>
       </>
    )
}

export default UserTable