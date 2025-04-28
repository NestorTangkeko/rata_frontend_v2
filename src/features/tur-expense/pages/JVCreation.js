import React from 'react'

import { Button, useDisclosure,useToast } from '@chakra-ui/react'
import { Container, SubHeader } from 'layouts'
import JVCreationTable from '../components/table/JVCreationTable';

import { useDispatch, useSelector } from 'react-redux';
import { getJVCreationState, setJVCSelectedRows } from 'lib/redux';
import { useGenerateJVMutation } from 'lib/redux/api/jv_creation.api.slice';

const JVCreation = () => {
    const {onClose,isOpen,onOpen} = useDisclosure();
    const exportDisclosure = useDisclosure();
    const dispatch = useDispatch();
    const toast = useToast()
    const tableRef = React.useRef(null);

    const [generateJV,{isLoading}] = useGenerateJVMutation();

    const selectedRows = useSelector(getJVCreationState).selectedRows;

    const handleGenerate = async () => {
        const ids = selectedRows.map(row => row.jvc_db_no);
        console.log("Generating for IDs:", ids);

        try {
            const result = await generateJV({
                ids: selectedRows.map(row => row.jvc_db_no)
            }).unwrap();
            console.log(result);

            if (tableRef.current) {
                tableRef.current.clearSelection();
            }
            
            // Also update Redux state
            dispatch(setJVCSelectedRows([]));
            
            toast({
                title: "Success",
                description: "JV generated successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });

        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to generate JV",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (<>
        <SubHeader title={'JV Creation'}>
            <Button size={'sm'} colorScheme='orange' disabled={selectedRows.length === 0} isLoading={isLoading} onClick={handleGenerate}>
                Generate
            </Button>
        </SubHeader>
        <Container>
            <JVCreationTable ref={tableRef}/>
        </Container>
    </>
  )
}

export default JVCreation