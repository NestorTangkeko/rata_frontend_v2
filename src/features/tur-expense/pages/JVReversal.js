import React from 'react'

import { Button, useDisclosure,useToast } from '@chakra-ui/react'
import { Container, SubHeader } from 'layouts'
import JVReversalTable from '../components/table/JVReversalTable';

import { useDispatch, useSelector } from 'react-redux';
import { getJVReversalState, setJVRSelectedRows } from 'lib/redux';
import { useReverseJVMutation } from 'lib/redux/api/jv_reversal.api.slice';

const JVReversal = () => {
    const {onClose,isOpen,onOpen} = useDisclosure();
    const exportDisclosure = useDisclosure();
    const dispatch = useDispatch();
    const toast = useToast();

    // Function to reset the table selection
    const [resetTableSelection, setResetTableSelection] = React.useState(null);

    const [reverseJV, {isLoading}] = useReverseJVMutation();
    
    const selectedRows = useSelector(getJVReversalState).selectedRows;

    // Get the reset function from the table component
    const handleClearSelectionCallback = React.useCallback((resetFn) => {
        setResetTableSelection(() => resetFn);
    }, []);

    const handleReverse = async () => {
        const data = selectedRows;
        console.log("selected rows:", data);

        try {
            const result = await reverseJV({
                data: data
            }).unwrap();
            console.log(result);
            
            // Clear Redux state
            dispatch(setJVRSelectedRows([]));

            // Reset the visual selection in the table
            if (resetTableSelection) {
                resetTableSelection();
            }
            
            toast({
                title: "Success",
                description: "JV Reversed successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });

        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to reverse JV",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (<>
        <SubHeader title={'JV Reversal'}>
            <Button size={'sm'} colorScheme='orange' disabled={selectedRows.length === 0} isLoading={isLoading} onClick={handleReverse}>
                Generate
            </Button>
        </SubHeader>
        <Container>
            <JVReversalTable onClearSelectionCallback={handleClearSelectionCallback} />
        </Container>
    </>
  )
}

export default JVReversal