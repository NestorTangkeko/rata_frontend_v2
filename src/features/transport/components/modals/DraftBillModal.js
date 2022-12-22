import React from 'react';
import Modal from 'components/Modal';
import DraftBillInformation from '../DraftBillInformation';
import DraftBillDetailTable from '../tables/DraftBillDetailTable';

const DraftBillModal = ({isOpen, onClose, data}) => {
  return (
        <Modal title={'Draft Bill Details'} size='70%' isOpen={isOpen} onClose={onClose}>
            <DraftBillInformation data={data}/>
            <DraftBillDetailTable data={data?.details || []}/>
        </Modal>
  )
}

export default DraftBillModal