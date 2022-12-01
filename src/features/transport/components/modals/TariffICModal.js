import React from 'react'
import Modal from 'components/Modal';
import TariffICForm from '../forms/TariffICForm';

const TariffICModal = ({
    isOpen,
    onClose,
    data
}) => {
  return (
    <Modal title='Tariff IC' size='50%' isOpen={isOpen} onClose={onClose}>
        <TariffICForm data={data}/>
    </Modal> 
  )
}

export default TariffICModal