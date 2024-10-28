import React from 'react';
import Modal from 'components/Modal';
import TransmittalForm from '../forms/TransmittalForm';

const TransmittalModal = ({
    isOpen,
    onClose,
    isRetransmit
}) => {
    
    return (
        <Modal title={isRetransmit==='true' ? 'Retransmit to Ascii' :'Transmittal to Ascii'} isOpen={isOpen} onClose={onClose}>
            <TransmittalForm isRetransmit={isRetransmit}/>
        </Modal>
    )
}

export default TransmittalModal