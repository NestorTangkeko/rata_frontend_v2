import { Box,Flex, Text } from '@chakra-ui/react';
import React from 'react';
import {useDropzone} from 'react-dropzone';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const focusedStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };
  

const DropZone = ({accept,onUpload,onClear,isDisabled}) => {
    const { 
        acceptedFiles,
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject} = useDropzone({
            accept,
            maxFiles: 1,
            disabled: isDisabled,
            onDropAccepted:onUpload,
            onFileDialogOpen:onClear,
        })

        const style = React.useMemo(()=>({
            ...baseStyle,
            ...(isFocused ? focusedStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {})
        }),[
            isFocused,
            isDragAccept,
            isDragReject
        ])

    return (
        <Box borderWidth={1} p={2} display='flex' flexDirection={'column'} gap={2}>
            <Flex gap={3}>
                <Text fontSize={'sm'} as='b'>File: </Text>
                <Text fontSize={'sm'}>
                    {acceptedFiles.map(file => `${file.path} - ${file.size} bytes`)}
                </Text>
            </Flex>
           
      
            <div {...getRootProps({style})}>
                <input {...getInputProps()}/>
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
        </Box>
    )
}


export default DropZone