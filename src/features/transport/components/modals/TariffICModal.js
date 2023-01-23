import React from 'react'
import Modal from 'components/Modal';
import TariffICForm from '../forms/TariffICForm';

const TariffICModal = ({
    isOpen,
    onClose,
    handleAdd,
    data
}) => {
  return (
    <Modal title='Tariff IC' size='50%' isOpen={isOpen} onClose={onClose}>
        <TariffICForm handleAdd={handleAdd} data={data}/>
    </Modal> 
  )
}

export default TariffICModal