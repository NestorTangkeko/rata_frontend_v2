import React from 'react';
import Modal from 'components/Modal';
import CreateCostAllocSetup from '../forms/CreateCostAllocSetupForm';

const CostAllocModal = ({
    isOpen,
    onClose
}) => {
  return (
    <Modal title={'Add Setup'} isOpen={isOpen} onClose={onClose}>
        <CreateCostAllocSetup/>
    </Modal>
  )
}

export default CostAllocModal