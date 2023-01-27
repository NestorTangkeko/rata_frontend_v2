import React from 'react'
import Modal from 'components/Modal';
import {Accordion, AccordionButton, AccordionItem, Box, AccordionIcon, AccordionPanel, Flex} from '@chakra-ui/react';
import EmailForm from '../forms/SchedulerEmailForm';
import SchedulerEmailTable from '../tables/SchedulerEmailTable';

const SchedulerEmailModal = ({isOpen,
    onClose,
    schedulerID}) => {
    
    return (
        <Modal title='Email Recipients' isOpen={isOpen} onClose={onClose} size='55%'> 
            <Flex direction={'column'} gap='3'>
                <Accordion allowMultiple>
                    <AccordionItem>
                        <h2>
                            <AccordionButton border={'1px'} borderRadius='md'>
                                <Box as="span" flex='1' textAlign='left'>
                                    Add Email Recipients
                                </Box>
                                <AccordionIcon/>
                            </AccordionButton>
                        </h2>
                        <AccordionPanel>
                            <EmailForm schedulerId={schedulerID}/>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
                <SchedulerEmailTable schedulerId={schedulerID}/>
            </Flex>
        </Modal>
    )
}

export default SchedulerEmailModal