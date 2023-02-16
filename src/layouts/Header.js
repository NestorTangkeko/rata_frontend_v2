import React from 'react';
import {Box,
  Flex,
  HStack,
  Text,
  Avatar,
  IconButton,
  useColorModeValue,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  useDisclosure
} from '@chakra-ui/react';

import {HamburgerIcon} from '@chakra-ui/icons';
import {Sidebar} from 'layouts';

import {setLogOut, selectToken} from 'lib/redux';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import decode from 'jwt-decode';
import { useLogoutMutation } from 'lib/redux/api/auth.api.slice';
import AccountUpdateModal from 'features/authentication/components/modals/AccountUpdateModal';

const Header = () => {
	const {isOpen,onClose,onOpen} = useDisclosure();
	const accountModal = useDisclosure();
	const [logOut] = useLogoutMutation()
	const token = decode(useSelector(selectToken));
	const dispatch = useDispatch();
	const navigate = useNavigate(); 

  	const handleLogout = async() => {
		await logOut() 
		.unwrap()
		.then(()=> {
		dispatch(setLogOut())
		navigate('/login')
		})
  	}

  	return (
      	<>
			<Flex 
				h={16}
				alignItems={'center'} 
				justifyContent={'space-between'} 
				bg={useColorModeValue('white', 'gray.900')} 
				px={4} 
				shadow={'md'} 
				width={'100%'} 
				position='fixed' 
				top={0} 
				left={0}
				zIndex='dropdown'

				>
				<HStack  spacing={8} alignItems='center'>
					<IconButton onClick={onOpen} icon={<HamburgerIcon color={'black'}/>} colorScheme='blackAlpha.100'/>
				</HStack>
				<Menu>
					<MenuButton>
						<Avatar size='sm'/>
					</MenuButton>
					<MenuList>
					<MenuGroup title='Account Information'>
						<Box display={'flex'} pl='6' flexDirection={'column'}>
							<Text>{token.email}</Text>
							<Text fontSize='sm'>{token.role}</Text>
						</Box>
					</MenuGroup>
					<MenuDivider/>
						<MenuItem onClick={accountModal.onOpen}>Update Account</MenuItem>
						<MenuItem onClick={handleLogout}>Sign Out</MenuItem>
					</MenuList>
				</Menu>
			</Flex>      
			<Sidebar isOpen={isOpen} onClose={onClose}/>  
			<AccountUpdateModal isOpen={accountModal.isOpen} onClose={accountModal.onClose}/>
     	</>
  	)
}

export default Header