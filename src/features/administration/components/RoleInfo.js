import { Flex } from '@chakra-ui/react'
import Label from 'components/Label'
import React from 'react'

const RoleInfo = ({data}) => {
  return (
    <Flex gap={2}>
        <Flex direction={'column'} width='50%'>
            <Label label={'Role Name'} value={data?.role_name}/>
        </Flex>
        
        <Flex direction={'column'}>
            <Label label={'Status'} value={data?.role_status}/>        
        </Flex>
       
    </Flex>
  )
}

export default RoleInfo