import React from 'react';
import TariffForm from '../forms/TariffForm';
import Modal from 'components/Modal';

const TariffModal = ({
  isOpen,
  onClose,
  data
}) => {
  return ( 
    <Modal title='Update Tariff' size='80%' isOpen={isOpen} onClose={onClose}>
      <TariffForm data={data}/>
    </Modal>
  )
}

export default TariffModal