import React from 'react';
import Modal from 'components/Modal';
import ReplanForm from '../forms/ReplanForm';

const ReplanModal = ({
    isOpen,
    onClose,
}) => {

    return (
        <Modal title='Replan Draft Bill' size='50%' isOpen={isOpen} onClose={onClose}>
            <ReplanForm/>
        </Modal>
    )
}

export default ReplanModal