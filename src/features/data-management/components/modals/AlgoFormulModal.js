import React from 'react'
import Modal from 'components/Modal';
import {Flex,Box,Text,Button} from '@chakra-ui/react';
import {LocalSelect} from 'components/select';
import { TextField } from 'components/input';
import { toast } from 'react-toastify';

const AlgoFormulaModal = ({isOpen,onClose,onConfirm,type,value}) => {
	const [state,setState] = React.useState({
		type:null,
		parameter: null,
	})

	const [formula,setFormula] = React.useState([])

	const onSelect = (name,selected) => {
		setState({
			...state,
			[name]:selected
		})
	}

	const handleAdd=()=>{
		if(!state.parameter || state.parameter === '' ){
			return toast.error('Invalid')
		}

		if(state.type?.value === 'text'){
			setFormula(formula.concat([state.parameter]))
		}
		else{
			setFormula(formula.concat([state.parameter.value]))
		}

	}

	const handleDelete = (index) => {
        let array = [...formula];
        array.splice(index,1)
        setFormula(array)
    }

	const handleConfirm = ()=>{
		onConfirm(type,formula)
		onClose();
	}

	React.useEffect(()=>{
		setState({
			...state,
			parameter: null
		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[state.type])

	React.useEffect(()=>{
		setState({
			...state,
			parameter: null,
			type:null
		})

		if(isOpen) {
			setFormula(value)
		}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[isOpen])

	const renderTypes = () => {
		switch (type) {
			case 'formula': 
			return <>
					<LocalSelect
						name='type'
						label={'Select Type'}
						type={'formulaBuilder'}
						onChange={(selected) => onSelect('type',selected)}
						value={state.type}
					/>
					{
						state.type?.value === 'text' ? 
						<TextField
							label={'Parameter'}
							name='parameter'
							value={state.parameter || ''}
							onChange={(e)=>{
								setState({
									...state,
									parameter: e.target.value
								})
							}}
						/> :
						<LocalSelect
							label={'Parameters'}
							type={state.type?.value || ''}
							value={state.parameter}
							onChange={(selected)=> {
								onSelect('parameter', selected)
							}}
						/>
					}
			</>
			case 'condition': 
			return <>
				<LocalSelect
					name='type'
					label={'Select Type'}
					type={'conditionBuilder'}
					onChange={(selected) => onSelect('type',selected)}
					value={state.type}
				/>
				{
					state.type?.value === 'text' ? 
					<TextField
						label={'Parameter'}
						name='parameter'
						value={state.parameter || ''}
						onChange={(e)=>{
							setState({
								...state,
								parameter: e.target.value
							})
						}}
					/> :
					<LocalSelect
						label={'Parameters'}
						type={state.type?.value || ''}
						value={state.parameter}
						onChange={(selected)=> {
							onSelect('parameter', selected)
						}}
					/>
				}

			</>
			default : <></>
		}
	}

  	return (
		<Modal title='Formula Builder' isOpen={isOpen} onClose={onClose} size='60%'>
			<Flex gap={2}>
				<Flex direction={'column'} width={'50%'} gap='3'>
					{renderTypes()}
					<Flex gap='2'>
						<Box flexGrow={1}/>
						<Button colorScheme={'orange'} onClick={handleAdd}>Add</Button>
						<Button colorScheme={'telegram'}>Clear</Button>
					</Flex>
					
				</Flex>
				<Flex direction={'column'} width={'50%'} gap='1'>
					<Text flexGrow={1} fontSize={'sm'} as='b'>Formula</Text>
					<Box 
						border='1px' 
						color={'blackAlpha.300'}
						height='sm' 
						p={1}	
						>
							<Flex 
								display='flex' 
								flexWrap={'wrap'}
								gap='1'
							>
								{
									formula.map((item,index)=> (
										<Box key={index} onClick={() => handleDelete(index)} p='2' border={'1px'} color='blackAlpha.300	'>  
											<Text color={'black'}>{item}</Text>
										</Box>
									))	
								}	
							</Flex>
					
					</Box>
					<Button colorScheme={'orange'} onClick={handleConfirm}>Confirm</Button>
				</Flex>
			</Flex>
		</Modal>
	)
}

AlgoFormulaModal.defaultProps = {
	value: []
}

export default AlgoFormulaModal