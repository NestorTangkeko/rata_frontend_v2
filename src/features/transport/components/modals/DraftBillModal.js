import React from 'react';
import Modal from 'components/Modal';
import DraftBillInformation from '../DraftBillInformation';
import DraftBillDetailTable from '../tables/DraftBillDetailTable';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import CostAllocationTable from '../tables/CostAllocationTable';

const DraftBillModal = ({isOpen, onClose, data}) => {
	console.log(data)
  return (
        <Modal title={'Draft Bill Details'} size='70%' isOpen={isOpen} onClose={onClose}>
            <DraftBillInformation data={data}/>
			
            <Tabs>
				<TabList>
					<Tab>Draft Bill Details</Tab>
					<Tab>Cost Allocation Details</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<DraftBillDetailTable data={data?.details || []}/>
					</TabPanel>
					<TabPanel>
						<CostAllocationTable draft_bill_no={data?.draft_bill_no}/>
					</TabPanel>
				</TabPanels>
			</Tabs>
        </Modal>
  )
}

export default DraftBillModal