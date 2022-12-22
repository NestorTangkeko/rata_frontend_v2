import React from 'react'
import Modal from 'components/Modal';
import Table from '../tables/RevenueLeakDtlTable';

const RevenueLeakDtlModal = ({
    isOpen,
    onClose,
    data
}) => {
  return (
    <Modal title='Revenue Leak Details' size='50%' isOpen={isOpen} onClose={onClose}>
        <Table data={data}/>
        
    </Modal> 
  )
}

export default RevenueLeakDtlModal