import React from 'react'
import Modal from 'components/Modal';
import UserCreateForm from '../forms/UserCreateForm';

const UserCreateModal = ({
    isOpen,
    onClose
}) => {
  return (
    <Modal title={'New User'} isOpen={isOpen} onClose={onClose}>
        <UserCreateForm/>
    </Modal>
  )
}

export default UserCreateModal