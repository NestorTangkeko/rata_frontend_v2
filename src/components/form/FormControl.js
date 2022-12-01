import React from 'react';
import {FormControl as CFormControl, FormErrorMessage,FormLabel} from '@chakra-ui/react';

const FormControl = ({
    error,
    touched,
    label,
    children,
    id,
    name,
    placeholder,
    type
}) => {
  return (
    <CFormControl
      isInvalid={!!error && touched}>
        <FormLabel fontSize={'sm'} htmlFor={id}>{label}</FormLabel>
            {children}
        <FormErrorMessage>{error}</FormErrorMessage>
    </CFormControl>
  )
}

export default FormControl