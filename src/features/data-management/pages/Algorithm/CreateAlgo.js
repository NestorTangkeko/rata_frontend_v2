import React from 'react';
import {SubHeader, Container} from 'layouts';
import { Button, Flex, Box, useDisclosure} from '@chakra-ui/react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import CreateAlgoForm from 'features/data-management/components/forms/CreateAlgoForm';
import AlgoDetailTable from 'features/data-management/components/tables/AlgoDetailTable';
import AlgoFormulModal from 'features/data-management/components/modals/AlgoFormulModal';
import AlgoAccordion from 'features/data-management/components/AlgoAccordion';
import Label from 'components/Label';
import AlgorithmInfo from 'features/data-management/components/AlgorithmInfo';
import { toast } from 'react-toastify';
import { useGetDataDetailsQuery,useCreateDataMutation,useUpdateDataMutation } from 'lib/redux/api/data.management.api.slice';


const CreateAlgo = () => {
    const params = useParams();
    const navigate = useNavigate();
    const formulaModal = useDisclosure();
    
    const {data = {}, isSuccess,isLoading } = useGetDataDetailsQuery({
        route:`algorithm/details/${params.id}`,
    })
    const [createDetails, createDataProps] = useCreateDataMutation()
    const [updateDetails, updateDataProps] = useUpdateDataMutation()

    const [state,setState]=React.useState({
        formula: [],
        condition: [],
        type: ''
    })

    const [algorithm,setAlgo]= React.useState({
        agg_name: null ,
        algo_description: null,
        with_agg: false,
        parameter: null,
        group_by: null,
        status:'INACTIVE'
    })

    const [details,setDetails] = React.useState([]);

    const setParameters = (name,value) => {
        setState({
            ...state,
            [name]:value
        })
    }

    const onOpen = (type) => {
        setState({
            ...state,
            type
        })
        formulaModal.onOpen()
    }

    const onHeaderSave = async (data) =>{
        setAlgo({
            ...data
        })
    }

    const onDetailSave = async() => {
        if(details.length === 0){
            return toast.error('Formula/Conditions are required')
        }

        await createDetails({
            route: `algorithm/details/${algorithm.agg_name}`,
            body: {
                data: details
            }
        })
        .unwrap()
        .then(()=>{
            setDetails(details.map(item => {
                return {
                    ...item,
                    is_editable: false
                }
            }))

            return toast.success('Saved!')
        })
    }

    const onActivate = async() => {
        await updateDetails({
            route:`algorithm/details/${algorithm.agg_name}`,  
            body: {
                data: {
                    status: 'ACTIVE'
                }
            }
        })
        .unwrap()
        .then(result => {
            setAlgo({
                ...algorithm,
                status:'ACTIVE'
            })
            return toast.success('Activated!')
        })
    }

    const onDetailAdd = () => {
        if(!algorithm.agg_name){
            return toast.error('Create an Algorithm Header First!')
        }

        if(state.condition.length === 0){
            return toast.error('Condition is required!')
        }

        setDetails(details.concat([
            {
                agg_id:         algorithm.agg_name,
                raw_condition:  state.condition.join(','),
                raw_formula:    state.formula.join(','),
                is_editable: true
            }
        ]))

        setState({
            ...state,
            formula: [],
            condition: [],
            type: ''
        })
    }

    const renderDetails = () => {
        if(params.id){
            if(!isLoading) {
                if(isSuccess){
                    return <AlgorithmInfo data={algorithm}/>
                }
                else {
                    return <Navigate to={'/algorithm'} replace/>
                }
            }
            
        }
        else {
            return  algorithm.agg_name ? <AlgorithmInfo data={algorithm}/> : <CreateAlgoForm onSubmit={onHeaderSave}/>
        }
    }

    React.useEffect(() => {
        if(params.id && !isLoading){
            setDetails(data?.details || [])
            setAlgo({
                ...state,
                ...data
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isLoading])

    return (
    <>
        <SubHeader title='Create Algorithm'>
            <Button colorScheme={'orange'} onClick={()=>navigate(-1)}>Back</Button>
        </SubHeader>
        <Container>
            {renderDetails()}
        </Container>
        <Container>
            <Flex direction='column' gap={2}>
                <AlgoAccordion>
                    <Flex gap={3}>
                        <Flex width='50%' gap='2' direction={'column'}>
                            <Box>
                                <Label label={'Condition'} value={state.condition}/>
                            </Box>
                            <Button colorScheme={'telegram'} onClick={()=>onOpen('condition')}>Build</Button>    
                            
                        </Flex>
                        <Flex width='50%' gap='2' direction={'column'}>
                            <Box>
                                <Label label={'Formula'} value={state.formula.join('')}/>
                            </Box>
                            <Button colorScheme={'telegram'} onClick={()=>onOpen('formula')}>Build</Button>
                            <Flex>
                                <Box flexGrow={1}/>
                                <Button colorScheme={'orange'} onClick={onDetailAdd}>Add</Button>
                            </Flex>
                        </Flex>               
                    </Flex>
                </AlgoAccordion>
                <AlgoDetailTable 
                    data={details}
                    onDelete={(line_no)=>{
                        let data = [...details]
                        data.splice(line_no,1)
                        setDetails(data)
                    }}
                />
                <Flex gap={2}>  
                    <Box flexGrow={1}/>
                    <Button colorScheme={'orange'} onClick={onDetailSave} isLoading={createDataProps.isLoading} hidden={algorithm?.status === 'ACTIVE'}>Save Details</Button>
                    <Button colorScheme={'orange'} onClick={onActivate} isLoading={updateDataProps.isLoading} hidden={algorithm?.status === 'ACTIVE'}>Activate</Button>
                    
                </Flex>
            </Flex>
        </Container>
        <AlgoFormulModal
            type    ={state.type}
            isOpen  ={formulaModal.isOpen}
            onClose ={formulaModal.onClose}
            onConfirm={setParameters}
            value={state[state.type] || []}
        />
    </>
  )
}

export default CreateAlgo