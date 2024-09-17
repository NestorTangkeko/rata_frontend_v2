import { Button, Flex, Text } from '@chakra-ui/react'
import Modal from 'components/Modal'
import React from 'react'
import moment from 'moment'

const ExtendModal = ({
    isOpen,
    onClose,
    newValidTo,
    onExtend=()=>{},
    isLoading=false
}) => {
  return (
        <Modal title='Extend Rate Confirmation' isOpen={isOpen}>
            <Flex gap={3} direction={'column'}>
                <Flex>
                    <Text> Are you sure you want to extend the rates to <Text as='b'>{moment(newValidTo).format('MMMM DD, YYYY')}</Text>?</Text>
                </Flex>
                <Flex justify={'space-between'}>
                    <Button colorScheme='red' onClick={onClose} isDisabled={isLoading}>No</Button>
                    <Button colorScheme='orange' onClick={onExtend} isLoading={isLoading}>Yes</Button>
                </Flex>
            </Flex>
        </Modal>
  )
}

export default ExtendModal