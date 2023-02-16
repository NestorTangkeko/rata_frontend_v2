import React from 'react';
import Modal from 'components/Modal';
import AccountUpdateForm from 'features/authentication/forms/AccountUpdateForm';

const AccountUpdateModal = ({isOpen,onClose}) => {
  return (
    <Modal title={'Update Account'} isOpen={isOpen} onClose={onClose}>
        <AccountUpdateForm onClose={onClose}/>
    </Modal>
  )
}

export default AccountUpdateModal