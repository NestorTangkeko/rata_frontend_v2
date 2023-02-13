import React from 'react'
import Modal from 'components/Modal';
import { Button, Flex } from '@chakra-ui/react';
import {TextField} from 'components/input';
import {useCreateAdminDataMutation} from 'lib/redux/api/administration.api.slice';
import { toast } from 'react-toastify';
const RoleCreateModal = ({
    isOpen,
    onClose
}) => {
    const [createRole,{isLoading}] = useCreateAdminDataMutation()
    const [state,setState]=React.useState({
        role_name: null
    })

    const onChange=(e)=>{
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
    }

    const handleCreate = async() => {
        await createRole({
            route:`role`,
            body:{
                data:{
                    ...state
                }
            }
        })
        .unwrap()
        .then(result => {
            toast.success('Role Created')
            onClose()
        })
    }

    return (
    <Modal title={'Create Role'} isOpen={isOpen} onClose={onClose}>
        <Flex direction={'column'}  gap={2}> 
            <TextField label={'Role Name'} name='role_name' value={state.role_name || ''} onChange={onChange}/>
            <Button colorScheme={'orange'} isLoading={isLoading} onClick={handleCreate}>Confirm</Button>
        </Flex>
    </Modal>
  )
}

export default RoleCreateModal 