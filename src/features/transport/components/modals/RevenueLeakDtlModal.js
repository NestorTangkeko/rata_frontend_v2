import React from 'react'
import Modal from 'components/Modal';
import Table from '../tables/RevenueLeakDtlTable';

const RevenueLeakDtlModal = ({
    isOpen,
    onClose,
    isLoading = false,
    data
}) => {
  return (
    <Modal title='Revenue Leak Details' size='50%' isOpen={isOpen} onClose={onClose}>
        {
          !isLoading ? <Table data={data}/> : 'Loading'  
        }
        
    </Modal> 
  )
}

export default RevenueLeakDtlModal