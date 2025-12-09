import React from 'react'
import Modal from 'components/Modal';
import { Button, Flex } from '@chakra-ui/react';
import Label from 'components/Label';

function RemoveVendorGroupModal({
    isOpen,
    onClose,
    isLoading,
    data=[],
}) {

    const handleRemoveButton = async () => {

        console.log({data});
        
        const ids = data.map(v => v.vg_vendor_id);
        const payload = {
            vg_vendor_id: ids,
            action: 'remove'
        }
        
        console.log({ payload });
        
        onClose(payload);
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={'Remove vendor'}>
                <Label
                    label={`Are you sure you want to remove vendor${data.length===1 ? '':'s'}?`}
                />
                <Flex direction={'row'} gap={2}>
                    {data.map(v => <Label
                        key={v.vg_vendor_id}
                        label={v.vg_vendor_id}
                    />)}
                </Flex>
                <Flex direction={'column'} gap={2}>
                    <Button type='submit' colorScheme='red' isLoading={isLoading} onClick={() => handleRemoveButton()}>
                        Proceed
                    </Button>
                </Flex>
        </Modal>
    )
}

export default RemoveVendorGroupModal