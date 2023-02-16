import React from 'react'
import Modal from 'components/Modal';
import { Flex,Button } from '@chakra-ui/react';

import {Select} from 'components/select';
import {useUpdateAdminDataMutation} from 'lib/redux/api/administration.api.slice';
import { toast } from 'react-toastify';

const UserRoleModal = ({isOpen,onClose,selected,user}) => {

    const [updateRole,{isLoading}] = useUpdateAdminDataMutation()
    const [role,setRole] = React.useState(null);


    const onChange = (selected) => {
        setRole(selected)
    }

    const handleSubmit=async()=>{
        if(!role){
            return toast.error('Role is required!')
        }

        await updateRole({
            route:`user/${user}/role`,
            body:{
                data:{
                    role_id: role.value
                }
            }   
        })
        .unwrap()
        .then(()=>{
            toast.success('Role Updated!')
            onClose()
        })
    }

    React.useEffect(()=>{
       setRole(selected) 
    },[selected])

    return (
        <Modal title={'Update Role'} isOpen={isOpen} onClose={onClose}>
            <Flex direction={'column'} gap='2'>
                <Select route={'roles'} label='Role' value={role} onChange={onChange}/>
                <Button colorScheme={'orange'} onClick={handleSubmit} isLoading={isLoading}>Confirm</Button> 
            </Flex>                                                    
        </Modal>
    )
}

export default UserRoleModal