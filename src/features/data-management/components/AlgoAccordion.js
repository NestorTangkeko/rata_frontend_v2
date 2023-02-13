import React from 'react'
import {Accordion, AccordionButton, AccordionItem, Box, AccordionIcon, AccordionPanel} from '@chakra-ui/react';

const AlgoAccordion = ({children}) => {
  return (
    <Accordion allowMultiple>
        <AccordionItem border={0}>
            <h2>
                <AccordionButton borderRadius='md' border={'2px'} color='orange.500' borderColor='orange.500'  _hover={{
                    bg:'orange.600',
                    color:'white'
                }}>
                    <Box as="span" flex='1' textAlign='left'>
                        <strong>New Rule</strong>
                    </Box>
                    <AccordionIcon/>
                </AccordionButton>
            </h2>
            <AccordionPanel>
                {children}
            </AccordionPanel>
        </AccordionItem>
    </Accordion>
    
  )
}

export default AlgoAccordion