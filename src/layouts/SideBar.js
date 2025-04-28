import React from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerOverlay,Box, Accordion, AccordionItem,AccordionButton, AccordionIcon, AccordionPanel} from '@chakra-ui/react';
import SidebarItems from './SidebarItem';
import { useSetAccess } from 'hooks';
// import modules from 'data/modules';

const SideBar = ({
  isOpen,
  onClose
}) => {
	const {modules} = useSetAccess();
	const drawerItems = () => {
		return modules.filter(item => item.view).map(header => {
			const {children} = header
			return( <AccordionItem key={header.id}>
				<h2>
				<AccordionButton _hover={{
					bg:'orange.500',
					color:'white'
				}}>
				<Box flex='1' textAlign='left'>
					{header.label}
				</Box>
				<AccordionIcon/>
				</AccordionButton>
				</h2>
				<AccordionPanel p={0}>
				{
					children.filter(item => item.view).map(item => (
						<SidebarItems key={item.id} data={{label:item.label,path:item.path}} onClose={onClose}/>
					))
				}
				</AccordionPanel>
			</AccordionItem>)
		})
	}

	return (
		<Drawer isOpen={isOpen} onClose={onClose} placement='left'>
			<DrawerOverlay/>
			<DrawerContent>
				<DrawerHeader borderBottomWidth='1px'>Kerry Logistikus</DrawerHeader>
				<Accordion defaultIndex={null} allowMultiple>
					{drawerItems()}
				</Accordion>
			</DrawerContent>
		</Drawer>
	)
}

export default SideBar