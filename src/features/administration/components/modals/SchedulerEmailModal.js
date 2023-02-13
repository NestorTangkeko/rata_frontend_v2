import React from 'react'
import Modal from 'components/Modal';
import {Accordion, AccordionButton, AccordionItem, Box, AccordionIcon, AccordionPanel, Flex} from '@chakra-ui/react';
import EmailForm from '../forms/SchedulerEmailForm';
import SchedulerEmailTable from '../tables/SchedulerEmailTable';

const SchedulerEmailModal = ({isOpen,
    onClose,
    schedulerID,
    hasEdit,
    hasCreate
}) => {
    
    return (
        <Modal title='Email Recipients' isOpen={isOpen} onClose={onClose} size='55%'> 
            <Flex direction={'column'} gap='3'>
                <Accordion allowMultiple>
                    <AccordionItem>
                        <h2>
                            <AccordionButton border={'1px'} borderRadius='md' hidden={!hasCreate}>
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
                <SchedulerEmailTable schedulerId={schedulerID} hasEdit={hasEdit}/>
            </Flex>
        </Modal>
    )
}

export default SchedulerEmailModal