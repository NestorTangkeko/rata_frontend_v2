import { Flex,Text, Input } from '@chakra-ui/react'
import React from 'react'

const TextField = ({
	label,
	name,
	value,
	isDisabled,
	onChange
}) => {
	return (
		<Flex direction={'column'} gap='1'>
			<Text fontSize={'sm'} as='b'>{label}</Text>
			<Input
				size='sm'
				placeholder={label}
				value={value}
				name={name}
				onChange={onChange}
				isDisabled={isDisabled}
            	/>
		</Flex>	
	)
}

export default TextField